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
  const [method, setMethod] = useState("UPI");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upi, setUpi] = useState("");

  const handlePayment = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in your name, email and phone number.");
      return;
    }

    if (method === "UPI" && !upi) {
      alert("Please enter your UPI ID.");
      return;
    }

    setLoading(true);

    // Demo payment simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);

    alert("Payment successful! Your book has been unlocked.");

    onSuccess();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">

      <div className="w-full max-w-2xl rounded-3xl bg-[#111827] border border-white/10 shadow-2xl my-8">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Premium Checkout
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Securely unlock your premium book
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          {/* Order Summary */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <p className="text-xs uppercase tracking-wider text-orange-300">
              Order Summary
            </p>

            <div className="flex items-center justify-between gap-4 mt-3">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {bookTitle}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Premium digital book
                </p>
              </div>

              <p className="text-xl font-bold text-orange-300">
                ₹{price}
              </p>

            </div>

          </div>

          {/* Customer Details */}
          <div className="mt-6">

            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Details
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sm:col-span-2 rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
              />

            </div>

          </div>

          {/* Payment Method */}
          <div className="mt-6">

            <h3 className="text-lg font-semibold text-white mb-4">
              Payment Method
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setMethod("UPI")}
                className={`rounded-xl border p-4 text-left transition ${
                  method === "UPI"
                    ? "border-orange-400 bg-orange-400/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <p className="font-semibold text-white">
                  UPI
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Google Pay / PhonePe / Paytm
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMethod("CARD")}
                className={`rounded-xl border p-4 text-left transition ${
                  method === "CARD"
                    ? "border-orange-400 bg-orange-400/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <p className="font-semibold text-white">
                  Card
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Credit / Debit Card
                </p>
              </button>

            </div>

          </div>

          {/* UPI */}
          {method === "UPI" && (
            <div className="mt-4">

              <input
                type="text"
                placeholder="Enter UPI ID  (example: name@upi)"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
              />

            </div>
          )}

          {/* Card */}
          {method === "CARD" && (
            <div className="mt-4 space-y-4">

              <input
                type="text"
                placeholder="Card Number"
                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="MM / YY"
                  className="rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
                />

                <input
                  type="text"
                  placeholder="CVV"
                  className="rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 outline-none focus:border-orange-400"
                />

              </div>

            </div>
          )}

          {/* Total */}
          <div className="mt-6 border-t border-white/10 pt-5">

            <div className="flex items-center justify-between">

              <span className="text-gray-400">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-white">
                ₹{price}
              </span>

            </div>

          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-4 font-bold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Processing Payment..."
              : `Pay ₹${price}`}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            🔒 Demo checkout — no real payment is processed.
          </p>

        </div>

      </div>

    </div>
  );
}