import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Book } from "@/lib/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    document.title = "My Books — Lumen";
    if (!user) return;
    (async () => {
      const { data: purchases } = await supabase.from("purchases").select("book_id").eq("user_id", user.id);
      const ids = (purchases ?? []).map((p) => p.book_id);
      const { data: free } = await supabase.from("books").select("*").eq("price", 0);
      let owned: Book[] = [];
      if (ids.length) {
        const { data } = await supabase.from("books").select("*").in("id", ids);
        owned = (data as any) ?? [];
      }
      // Merge: free books + owned, dedupe
      const map = new Map<string, Book>();
      [...((free as any) ?? []), ...owned].forEach((b: Book) => map.set(b.id, b));
      setBooks([...map.values()]);
    })();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <section className="container py-12">
        <h1 className="font-display text-4xl sm:text-5xl">My Books</h1>
        <p className="mt-2 text-muted-foreground">Everything you own and every classic you can read for free.</p>

        {books.length === 0 ? (
          <div className="mt-16 glass rounded-2xl p-10 text-center">
            <p className="text-muted-foreground">Your shelf is empty. Start exploring the library.</p>
            <Button asChild className="mt-4 bg-gradient-amber text-primary-foreground"><Link to="/library">Open library</Link></Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {books.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBooks;
