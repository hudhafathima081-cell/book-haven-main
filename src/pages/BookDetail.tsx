import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PaymentModal } from "@/components/PaymentModel.tsx";

import {
  Star,
  BookOpen,
  Lock,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { toast } from "sonner";

import type { Book } from "@/lib/types";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [book, setBook] = useState<Book | null>(null);

  const [owned, setOwned] = useState(false);

  const [buying, setBuying] = useState(false);

  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setBook(data as Book);

        if (data) {
          document.title = `${data.title} — Lumen`;
        }
      });

  }, [id]);

  useEffect(() => {
    if (!id || !user) {
      setOwned(false);
      return;
    }

    supabase
      .from("purchases")
      .select("id")
      .eq("book_id", id)
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setOwned(!!data);
      });

  }, [id, user]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />

        <div className="container py-20 text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  const isFree = book.price === 0;

  const canRead = isFree || owned;

  const handleBuy = async () => {
    if (!user) {
      navigate(`/auth?redirect=/book/${book.id}`);
      return;
    }

    setBuying(true);

    await new Promise((r) => setTimeout(r, 1000));

    const { error } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        book_id: book.id,
        amount: book.price,
      });

    setBuying(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setOwned(true);

    toast.success(`${book.title} unlocked successfully`);
  };

  const handleRead = () => {
    navigate(`/reader/${book.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">

      <Navbar />

      <div className="container py-10">

        <Link
          to="/library"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to library
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[320px_1fr]">

          {/* Cover */}
          <div className="mx-auto w-full max-w-xs">

            <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">

              {book.cover_url && (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              )}

            </div>

          </div>

          {/* Details */}
          <div>

            <p className="text-sm uppercase tracking-wider text-primary">

              {isFree ? "Free to read" : `$${book.price}`}

            </p>

            <h1 className="mt-2 text-5xl font-bold">
              {book.title}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              by {book.author}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm">

              <Star className="h-4 w-4 fill-primary text-primary" />

              <span>
                {book.rating || 4.5}
              </span>

              <span className="text-muted-foreground">
                · {book.format}
              </span>

            </div>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {book.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              {canRead ? (

                <Button
                  size="lg"
                  onClick={handleRead}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black"
                >
                  <BookOpen className="mr-2 h-4 w-4" />

                  Start Reading
                </Button>

              ) : (

               <Button
  size="lg"
  onClick={() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setPaymentOpen(true);
  }}
  className="bg-gradient-amber text-primary-foreground shadow-glow hover:opacity-95"
>
  <Lock className="mr-1 h-4 w-4" />
  Unlock for ₹{book.price}
</Button>

              )}

              {owned && (

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">

                  <CheckCircle2 className="h-4 w-4" />

                  In your library

                </span>

              )}

            </div>

          </div>

        </div>

      </div>
<PaymentModal
  open={paymentOpen}
  onOpenChange={setPaymentOpen}
  bookTitle={book.title}
  price={book.price}
  onSuccess={handleBuy}
/>
    </div>
  );
};

export default BookDetail;