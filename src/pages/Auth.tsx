import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const isAuthPage = window.location.pathname === "/auth";

  // auth = sign in
  // join = premium signup
  const [isSignup, setIsSignup] = useState(isAuthPage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    // Name validation for signup
    if (isSignup && fullName.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    // Success
    const message = isSignup
  ? "Premium account created successfully!"
  : "Signed in successfully!";

const toast = document.createElement("div");

toast.innerText = message;

toast.className =
  "fixed top-6 right-6 bg-black/80 text-white px-6 py-4 rounded-2xl border border-orange-400 shadow-2xl z-50 backdrop-blur-xl";

document.body.appendChild(toast);

setTimeout(() => {
  toast.remove();
}, 2500);

    navigate("/library");
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex items-center justify-center p-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)]">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#ff9966] to-[#ff5e62] flex items-center justify-center shadow-[0_0_30px_rgba(255,120,80,0.45)]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m0-12c-1.5-2-4-3-7-3v15c3 0 5.5 1 7 3m0-15c1.5-2 4-3 7-3v15c-3 0-5.5 1-7 3"
              />
            </svg>

          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Lumen<span className="text-orange-300">.</span>
            </h2>

            <p className="text-xs text-gray-400">
              Premium Digital Library
            </p>
          </div>

        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-2">
          {isSignup ? "Premium Access" : "Welcome Back"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isSignup
            ? "Unlock premium books and luxury reading experience."
            : "Sign in to continue reading premium books."}
        </p>

        <div className="space-y-5">

          {/* SIGNUP ONLY */}
          {isSignup && (
            <>
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-orange-300"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-sm text-gray-300">
                  Date of Birth
                </label>

                <input
                  type="date"
                  className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-orange-300"
                />
              </div>
            </>
          )}

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-orange-300"
            />
          </div>

          {/* Premium Payment UI */}
          {isSignup && (
            <div>

              <label className="text-sm text-gray-300 block mb-3">
                Preferred Payment
              </label>

              <div className="grid grid-cols-2 gap-4">

                {/* Google Pay */}
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-orange-300 transition text-left"
                >
                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-black font-bold text-xs">
                      GPay
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Google Pay
                      </h3>

                      <p className="text-xs text-gray-400">
                        Fast secure payment
                      </p>
                    </div>

                  </div>
                </button>

                {/* Paytm */}
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300 transition text-left"
                >
                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                      Paytm
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Paytm
                      </h3>

                      <p className="text-xs text-gray-400">
                        UPI payments
                      </p>
                    </div>

                  </div>
                </button>

                {/* PhonePe */}
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-violet-300 transition text-left"
                >
                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">
                      ₹
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        PhonePe
                      </h3>

                      <p className="text-xs text-gray-400">
                        Instant transfer
                      </p>
                    </div>

                  </div>
                </button>

                {/* Credit Card */}
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-yellow-300 transition text-left"
                >
                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-black font-bold">
                      💳
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Credit Card
                      </h3>

                      <p className="text-xs text-gray-400">
                        Visa / Mastercard
                      </p>
                    </div>

                  </div>
                </button>

              </div>

            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 py-4 text-black font-semibold hover:opacity-90 transition mt-4 shadow-lg"
          >
            {isSignup
              ? "Create Premium Account"
              : "Sign In"}
          </button>

        </div>

        {/* Bottom Switch */}
        <div className="mt-8 text-center text-sm text-gray-400">

          {isSignup ? (
            <>
              Already have an account?{" "}

              <button
                onClick={() => setIsSignup(false)}
                className="text-orange-300 hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New here?{" "}

              <button
                onClick={() => setIsSignup(true)}
                className="text-orange-300 hover:underline"
              >
                Create premium account
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}