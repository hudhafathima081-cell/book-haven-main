import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { supabase } from "@/integrations/supabase/client";
import type { Book } from "@/lib/types";
import hero from "@/assets/hero.jpg";
import Footer from "@/components/Footer";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    document.title = "Lumen — A premium library for modern readers";

    supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setBooks((data as any) ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center animate-fade-up">
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> A new chapter in reading
            </span>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Worlds without <span className="text-gradient-amber">limits</span>, bound in light.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A premium digital library with timeless classics free to read, and curated stories worth owning.
              Designed for the way you actually read — beautiful, focused, yours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-amber text-primary-foreground shadow-glow hover:opacity-95"
              >
                <Link to="/library">
                  Explore the library <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-border/60 bg-transparent">
                <Link to="/auth?mode=signup">Create free account</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat n="1.2k+" l="Titles" />
              <Stat n="24" l="Genres" />
              <Stat n="4.8★" l="Avg rating" />
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-amber opacity-20 blur-3xl" />
            <img
              src={hero}
              alt="Glowing book"
              className="rounded-[2rem] border border-border/40 shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Just added to the shelf</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked classics and brand-new stories.</p>
          </div>

          <Button asChild variant="ghost">
            <Link to="/library">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            icon={<BookOpen className="h-5 w-5" />}
            title="A reader built for focus"
            desc="Quiet typography, paper or night mode, and bookmarks that travel with you across devices."
          />

          <Feature
            icon={<Sparkles className="h-5 w-5" />}
            title="Free classics, always"
            desc="Hundreds of public-domain masterpieces, instantly readable the moment you sign up."
          />

          <Feature
            icon={<Lock className="h-5 w-5" />}
            title="Own what you love"
            desc="One-time purchase unlocks lifetime reading. No subscriptions, no surprises."
          />
        </div>
      </section>

      {/* ✅ NEW FOOTER */}
      <Footer />
    </div>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <div className="font-display text-2xl text-foreground">{n}</div>
    <div className="text-xs text-muted-foreground">{l}</div>
  </div>
);

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="glass rounded-2xl p-6">
    <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="font-display text-xl">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
  </div>
);

export default Index;