import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Join() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleJoin = async () => {
  setError("");
  setMessage("");

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  setLoading(true);

  // First try to create the account
  const { data: signUpData, error: signUpError } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

  // Account already exists
  if (signUpError) {
    if (
      signUpError.message.toLowerCase().includes("already") ||
      signUpError.message.toLowerCase().includes("registered")
    ) {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      setLoading(false);

      if (signInError || !signInData.session) {
        setError("This account already exists. Please check your password.");
        return;
      }

      navigate(redirect, { replace: true });
      return;
    }

    setLoading(false);
    setError(signUpError.message);
    return;
  }

  setLoading(false);

  // New account successfully signed in
  if (signUpData.session) {
    navigate(redirect, { replace: true });
    return;
  }

  setMessage("Account created. Please sign in to continue.");
};
  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-6 text-white">

      <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">

        <h1 className="text-4xl font-bold mb-2">
          Join Lumen
        </h1>

        <p className="text-gray-400 mb-8">
          Create your free reading account.
        </p>

        <div className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-400">
              {message}
            </p>
          )}

          <button
            onClick={handleJoin}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 py-4 text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Free Account"}
          </button>

        </div>

      </div>

    </div>
  );
}