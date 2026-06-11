import { useNavigate } from "react-router-dom";

export default function Join() {

  const navigate = useNavigate();

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
              className="w-full mt-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={() => navigate("/library")}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 py-4 text-black font-semibold"
          >
            Create Free Account
          </button>

        </div>

      </div>

    </div>
  );
}