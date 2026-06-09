import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { Book } from "@/lib/types";

type Filter = "all" | "free" | "paid";

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

 useEffect(() => {
  document.title = "Library — Lumen";

  supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
      } else {
        setBooks(data as Book[]);
      }
    });

}, []);


  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (filter === "free" && b.price > 0) return false;
      if (filter === "paid" && b.price === 0) return false;
      if (q && !`${b.title} ${b.author}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [books, q, filter]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <section className="container py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl">The Library</h1>
            <p className="mt-2 text-muted-foreground">Browse every title. Free classics open instantly.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or author" className="pl-9 w-72 bg-input/60 border-border/60" />
            </div>
            <div className="flex rounded-full bg-secondary p-1">
              {(["all", "free", "paid"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm rounded-full capitalize transition-colors ${
                    filter === f ? "bg-gradient-amber text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
        {filtered.length === 0 && (
          <p className="mt-20 text-center text-muted-foreground">No books match your search.</p>
        )}
      </section>
    </div>
  );
};

export default Library;
