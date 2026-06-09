import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BookOpen, Loader2 } from "lucide-react";

const signupSchema = z.object({
  display_name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  birth_date: z.string().min(1, "Required"),
  password: z.string().min(8, "At least 8 characters").max(72),
});
const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(72),
});

const yearsBetween = (d: string) => {
  const b = new Date(d);
  const n = new Date();
  let a = n.getFullYear() - b.getFullYear();
  const m = n.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--;
  return a;
};

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [loading, setLoading] = useState(false);
  const redirect = params.get("redirect") || "/library";

  useEffect(() => { document.title = mode === "signup" ? "Create account — Lumen" : "Sign in — Lumen"; }, [mode]);
  useEffect(() => { if (user) navigate(redirect, { replace: true }); }, [user, navigate, redirect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = Object.fromEntries(f.entries()) as Record<string, string>;

    if (mode === "signup") {
      const parsed = signupSchema.safeParse(data);
      if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
      if (yearsBetween(parsed.data.birth_date) < 18) {
        toast.error("You must be at least 18 years old to register.");
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/library`,
          data: { display_name: parsed.data.display_name, birth_date: parsed.data.birth_date },
        },
      });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Welcome to Lumen.");
    } else {
      const parsed = loginSchema.safeParse(data);
      if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Welcome back.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-hero">
      <div className="hidden lg:flex flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2 font-display text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-amber text-primary-foreground"><BookOpen className="h-5 w-5" /></span>
          Lumen<span className="text-primary">.</span>
        </Link>
        <div>
          <h2 className="font-display text-5xl leading-tight">A library that <span className="text-gradient-amber">remembers</span> the way you read.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Bookmarks sync, progress persists, and your shelf travels with you.</p>
        </div>
        <p className="text-xs text-muted-foreground">By continuing you agree to our terms. You must be 18+ to register.</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md glass rounded-3xl p-8 shadow-card">
          <h1 className="font-display text-3xl">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signup" ? "Free, instant access to the classics." : "Sign in to continue reading."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <Field label="Full name" name="display_name" placeholder="Jane Reader" required />
                <Field label="Date of birth" name="birth_date" type="date" required />
              </>
            )}
            <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
            <Field label="Password" name="password" type="password" placeholder="At least 8 characters" required />

            <Button type="submit" disabled={loading} className="w-full bg-gradient-amber text-primary-foreground shadow-glow hover:opacity-95">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signup" ? "Create account" : "Sign in")}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signup" ? "Already have an account? Sign in" : "New here? Create a free account"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <Label htmlFor={rest.name}>{label}</Label>
    <Input id={rest.name} {...rest} className="bg-input/60 border-border/60" />
  </div>
);

export default Auth;
