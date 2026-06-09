import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Profile — Lumen";
    if (!user) return;
    supabase.from("profiles").select("display_name,birth_date").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => { setName(data?.display_name ?? ""); setBirth(data?.birth_date ?? ""); });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ display_name: name }).eq("user_id", user.id);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Profile saved.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <section className="container py-12 max-w-2xl">
        <h1 className="font-display text-4xl">Profile</h1>
        <div className="mt-8 glass rounded-2xl p-6 space-y-4">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} disabled className="bg-input/40" />
          </div>
          <div className="space-y-1.5">
            <Label>Display name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-input/60 border-border/60" />
          </div>
          <div className="space-y-1.5">
            <Label>Date of birth</Label>
            <Input value={birth} disabled className="bg-input/40" />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={signOut}>Sign out</Button>
            <Button onClick={save} disabled={saving} className="bg-gradient-amber text-primary-foreground">Save changes</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
