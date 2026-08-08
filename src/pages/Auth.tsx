import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password.");
      return;
    }

    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-8">
          Sign in to continue reading
        </p>

        <div className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-orange-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-orange-300"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 py-4 text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          New here?{" "}

          <button
            onClick={() =>
              navigate(`/join?redirect=${encodeURIComponent(redirect)}`)
            }
            className="text-orange-300 hover:underline"
          >
            Create free account
          </button>
        </div>

      </div>

    </div>
  );
}