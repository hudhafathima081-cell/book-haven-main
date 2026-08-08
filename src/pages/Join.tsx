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

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await 
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
   console.log("SIGNUP RESULT:", data);
   console.log("SIGNUP ERROR:", error);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      navigate(redirect);
      return;
    }

    setMessage(
      "Account created successfully. Please check your email to confirm your account."
    );
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