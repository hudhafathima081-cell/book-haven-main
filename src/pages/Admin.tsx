import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, FileText, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Book } from "@/lib/types";

const Admin = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 Load books
  const load = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setBooks(data as unknown as Book[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = "Admin — Lumen";
    load();
  }, []);

  // ❌ Delete book
  const remove = async (b: Book) => {
    const confirmDelete = confirm(
      `Delete "${b.title}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      if (b.pdf_path) {
        await supabase.storage.from("books").remove([b.pdf_path]);
      }

      const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", b.id);

      if (error) throw error;

      toast.success("Book deleted.");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <section className="container py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl">Admin</h1>
            <p className="mt-2 text-muted-foreground">
              Manage the catalog. Add, edit and remove books.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/books/new")}
            className="bg-gradient-amber text-primary-foreground shadow-glow"
          >
            <Plus className="mr-1 h-4 w-4" /> Add book
          </Button>
        </div>

        <div className="mt-8 glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_auto_auto_auto] gap-4 px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/40">
            <div>Cover</div>
            <div>Title</div>
            <div>Format</div>
            <div>Price</div>
            <div className="text-right">Actions</div>
          </div>

          {loading && (
            <div className="p-8 text-center text-muted-foreground">
              Loading…
            </div>
          )}

          {!loading && books.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No books yet.
            </div>
          )}

          {!loading &&
            books.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-[80px_1fr_auto_auto_auto] items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0"
              >
                <div className="h-16 w-12 overflow-hidden rounded bg-secondary">
                  {b.cover_url && (
                    <img
                      src={b.cover_url}
                      alt={b.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-medium truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {b.author}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
                  {b.format === "pdf" ? (
                    <FileText className="h-3 w-3" />
                  ) : (
                    <BookOpen className="h-3 w-3" />
                  )}
                  {b.format.toUpperCase()}
                </span>

                <span className="text-sm">
                  {b.price === 0 ? "Free" : `$${b.price}`}
                </span>

                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/admin/books/${b.id}`} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(b)}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;