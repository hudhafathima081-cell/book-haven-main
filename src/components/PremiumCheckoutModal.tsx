import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookTitle: string;
  price: number;
};

export default function PremiumCheckoutModal({
  open,
  onClose,
  onSuccess,
  bookTitle,
  price,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePayment = async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 2500));

    setLoading(false);

    onSuccess();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white">
          Premium Access
        </h2>

        <p className="mt-2 text-gray-400">
          Unlock <span className="text-white">{bookTitle}</span>
        </p>

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

          <input
            type="date"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

          <select className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none">

            <option>Google Pay</option>
            <option>PhonePe</option>
            <option>Paytm</option>
            <option>Credit Card</option>

          </select>

          <input
            type="text"
            placeholder="UPI ID"
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none"
          />

        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-4 font-semibold text-black transition hover:scale-[1.02]"
        >
          {loading
            ? "Processing Payment..."
            : `Pay ₹${price} & Unlock`}
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}