import * as Dialog from "@radix-ui/react-dialog";
import { X, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  bookTitle: string;
  price: number;
}

export const PaymentModal = ({
  open,
  onOpenChange,
  onSuccess,
  bookTitle,
  price,
}: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 2500));

    setLoading(false);
    setPaid(true);

    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
      setPaid(false);
    }, 1500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#0f0f14] p-6 shadow-2xl">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Complete Purchase
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Unlock "{bookTitle}"
              </p>
            </div>

            <Dialog.Close asChild>
              <button className="rounded-full p-2 hover:bg-white/10">
                <X className="h-5 w-5 text-white" />
              </button>
            </Dialog.Close>
          </div>

          {paid ? (
            <div className="py-14 flex flex-col items-center justify-center">
              <CheckCircle2 className="h-20 w-20 text-green-400" />
              <h3 className="mt-5 text-2xl font-bold text-white">
                Payment Successful
              </h3>
              <p className="text-gray-400 mt-2">
                Book unlocked successfully
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-4">

                <button className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-white" />
                    <div className="text-left">
                      <p className="text-white font-medium">Google Pay</p>
                      <p className="text-xs text-gray-400">
                        UPI Payment
                      </p>
                    </div>
                  </div>

                  <span className="text-white font-semibold">
                    ₹{price}
                  </span>
                </button>

                <button className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-white" />
                    <div className="text-left">
                      <p className="text-white font-medium">Credit Card</p>
                      <p className="text-xs text-gray-400">
                        Visa / Mastercard
                      </p>
                    </div>
                  </div>

                  <span className="text-white font-semibold">
                    ₹{price}
                  </span>
                </button>
              </div>

              <div className="mt-8">
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:opacity-90"
                >
                  {loading ? "Processing Payment..." : `Pay ₹${price}`}
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500">
                Demo payment system • No real transaction
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};