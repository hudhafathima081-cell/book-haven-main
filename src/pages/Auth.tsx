import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isSignup
            ? "Join Lumen premium reading experience."
            : "Sign in to continue reading premium books."}
        </p>

        <div className="space-y-5">

          {isSignup && (
            <>
              <div>
                <label className="text-sm text-gray-300">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full mt-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Date of Birth</label>
                <input
                  type="date"
                  className="w-full mt-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full mt-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="w-full mt-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          {isSignup && (
            <div>
              <label className="text-sm text-gray-300">
                Preferred Payment
              </label>

             <div className="grid grid-cols-2 gap-3 mt-3">

  <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
      alt="Google Pay"
      className="h-6 w-6 object-contain"
    />

    <span>Google Pay</span>

  </button>

  <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/512px-Paytm_logo.png"
      alt="Paytm"
      className="h-6 w-6 object-contain"
    />

    <span>Paytm</span>

  </button>

  <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">

    <img
      src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png"
      alt="PhonePe"
      className="h-6 w-6 object-contain"
    />

    <span>PhonePe</span>

  </button>

  <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">

    <span className="text-2xl">💳</span>

    <span>Credit Card</span>

  </button>

</div>
            </div>
          )}

          <button
            onClick={() => navigate("/library")}
            className="w-full rounded-xl bg-gradient-to-r from-orange-400 to-yellow-300 py-3 text-black font-semibold hover:opacity-90 transition"
          >
            {isSignup ? "Create Premium Account" : "Sign In"}
          </button>

        </div>

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