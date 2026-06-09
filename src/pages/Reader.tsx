import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Sun, Moon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Book } from "@/lib/types";

<<<<<<< HEAD
const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [allowed, setAllowed] = useState<boolean | null>(null);
=======
type AccessState = "loading" | "ok" | "needs-login" | "needs-purchase" | "not-found";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [access, setAccess] = useState<AccessState>("loading");
>>>>>>> 70d0ff8555b4a4916a51ee2b07b642bc0026ee12
  const [page, setPage] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [light, setLight] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<number>(1);

  // Apply reader light theme to root
  useEffect(() => {
    document.documentElement.classList.toggle("reader-light", light);
    return () => document.documentElement.classList.remove("reader-light");
  }, [light]);

  // Load book + access check
  useEffect(() => {
<<<<<<< HEAD
    if (!id || !user) return;
    (async () => {
      const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
      const b = data as any as Book | null;
      setBook(b);
      if (!b) { setAllowed(false); return; }
      document.title = `${b.title} — Reading`;
      if (b.price === 0) { setAllowed(true); }
      else {
        const { data: p } = await supabase.from("purchases").select("id").eq("book_id", b.id).eq("user_id", user.id).maybeSingle();
        setAllowed(!!p);
      }
      // Bookmark / position
      const { data: bm } = await supabase.from("bookmarks").select("position,bookmarked").eq("book_id", b.id).eq("user_id", user.id).maybeSingle();
      if (bm) { setPage(bm.position ?? 0); setBookmarked(!!bm.bookmarked); }
    })();
  }, [id, user]);

  // For PDF: get signed URL
  useEffect(() => {
    (async () => {
      if (!book || book.format !== "pdf" || !book.pdf_path) return;
      const { data } = await supabase.storage.from("books").createSignedUrl(book.pdf_path, 3600);
      if (data?.signedUrl) setPdfUrl(data.signedUrl);
    })();
  }, [book]);
=======
    if (!id || authLoading) return;
    if (!user) {
      navigate(`/auth?redirect=/reader/${id}`, { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
      if (cancelled) return;
      if (error) { toast.error(error.message); setAccess("not-found"); return; }
      const b = data as any as Book | null;
      if (!b) { setAccess("not-found"); return; }
      setBook(b);
      document.title = `${b.title} — Reading`;

      if (b.price === 0) {
        setAccess("ok");
      } else {
        const { data: p } = await supabase
          .from("purchases").select("id")
          .eq("book_id", b.id).eq("user_id", user.id).maybeSingle();
        if (cancelled) return;
        setAccess(p ? "ok" : "needs-purchase");
      }

      // Bookmark / position
      const { data: bm } = await supabase.from("bookmarks").select("position,bookmarked").eq("book_id", b.id).eq("user_id", user.id).maybeSingle();
      if (!cancelled && bm) { setPage(bm.position ?? 0); setBookmarked(!!bm.bookmarked); }
    })();
    return () => { cancelled = true; };
  }, [id, user, authLoading, navigate]);

  // For PDF: get signed URL (and refresh before expiry so long reads don't break)
  useEffect(() => {
    if (access !== "ok" || !book || book.format !== "pdf" || !book.pdf_path) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const refresh = async () => {
      const { data, error } = await supabase.storage
        .from("books")
        .createSignedUrl(book.pdf_path!, 3600);
      if (cancelled) return;
      if (error || !data?.signedUrl) {
        toast.error("Couldn't load the PDF. Please try again.");
        return;
      }
      setPdfUrl(data.signedUrl);
      // Refresh ~5 min before expiry
      timer = setTimeout(refresh, (3600 - 300) * 1000);
    };
    refresh();

    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [access, book]);
>>>>>>> 70d0ff8555b4a4916a51ee2b07b642bc0026ee12

  const chapters = useMemo(() => (book?.format === "text" ? (book.content ?? []) : []), [book]);
  const totalPages = book?.format === "text" ? Math.max(chapters.length, 1) : pdfPages;

  const persist = async (next: { position?: number; bookmarked?: boolean }) => {
    if (!book || !user) return;
    await supabase.from("bookmarks").upsert(
      { user_id: user.id, book_id: book.id, position: next.position ?? page, bookmarked: next.bookmarked ?? bookmarked },
      { onConflict: "user_id,book_id" }
    );
  };

  const go = (delta: number) => {
    const np = Math.max(0, Math.min(totalPages - 1, page + delta));
    setPage(np); persist({ position: np });
  };

  const toggleBookmark = () => {
    const v = !bookmarked; setBookmarked(v); persist({ bookmarked: v });
    toast.success(v ? "Bookmarked." : "Bookmark removed.");
  };

<<<<<<< HEAD
  if (allowed === false) {
    return (
      <div className="min-h-screen grid place-items-center text-center px-6">
        <div>
          <p className="text-muted-foreground">You don't have access to this book.</p>
          <Button className="mt-4" onClick={() => navigate(-1)}>Go back</Button>
=======
  if (access === "not-found") {
    return (
      <div className="min-h-screen grid place-items-center text-center px-6">
        <div>
          <h1 className="font-display text-3xl">Book not found</h1>
          <p className="mt-2 text-muted-foreground">This book doesn't exist or was removed.</p>
          <Button className="mt-4" onClick={() => navigate("/library")}>Browse library</Button>
>>>>>>> 70d0ff8555b4a4916a51ee2b07b642bc0026ee12
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  if (!book || allowed === null) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
=======
  if (access === "needs-purchase") {
    return (
      <div className="min-h-screen grid place-items-center text-center px-6">
        <div>
          <h1 className="font-display text-3xl">Purchase required</h1>
          <p className="mt-2 text-muted-foreground">
            {book ? `Buy "${book.title}" to start reading.` : "You need to purchase this book to read it."}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>Go back</Button>
            {book && (
              <Button onClick={() => navigate(`/book/${book.id}`)} className="bg-gradient-amber text-primary-foreground">
                View book
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!book || access === "loading") return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
>>>>>>> 70d0ff8555b4a4916a51ee2b07b642bc0026ee12

  const chapter = chapters[page];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reader top bar */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/book/${book.id}`)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="text-center min-w-0">
            <p className="truncate text-sm font-medium">{book.title}</p>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </div>
          <div className="flex items-center gap-1">
            {book.format === "text" && (
              <Button variant="ghost" size="icon" onClick={() => setShowToc((s) => !s)} aria-label="Chapters"><List className="h-4 w-4" /></Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setLight((l) => !l)} aria-label="Theme">
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleBookmark} aria-label="Bookmark">
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Reader content */}
      <main className="flex-1 relative">
        {showToc && book.format === "text" && (
          <aside className="absolute left-0 top-0 z-10 h-full w-72 border-r border-border/40 bg-background/95 backdrop-blur p-4 overflow-auto">
            <h3 className="font-display text-lg mb-3">Chapters</h3>
            <ul className="space-y-1">
              {chapters.map((c, i) => (
                <li key={i}>
                  <button
                    onClick={() => { setPage(i); persist({ position: i }); setShowToc(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      i === page ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <span className="text-primary mr-2">{i + 1}.</span>{c.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mx-auto max-w-2xl px-6 py-12">
          {book.format === "text" && chapter ? (
            <article className="font-display animate-fade-up">
              <h2 className="text-3xl mb-8 text-center">{chapter.title}</h2>
              <div className="text-lg leading-[1.85] whitespace-pre-wrap" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                {chapter.body}
              </div>
            </article>
          ) : book.format === "pdf" ? (
            <PdfReader url={pdfUrl} page={page + 1} onTotal={(n) => setPdfPages(n)} />
          ) : (
            <p className="text-muted-foreground">No content available.</p>
          )}
        </div>
      </main>

      {/* Reader nav */}
      <footer className="sticky bottom-0 border-t border-border/40 bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Button variant="ghost" onClick={() => go(-1)} disabled={page === 0}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
          <Button variant="ghost" onClick={() => go(1)} disabled={page >= totalPages - 1}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

// Lazy-loaded PDF reader using react-pdf
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfReader = ({ url, page, onTotal }: { url: string | null; page: number; onTotal: (n: number) => void }) => {
  if (!url) return <p className="text-center text-muted-foreground">Loading PDF…</p>;
  return (
    <Document file={url} onLoadSuccess={(d) => onTotal(d.numPages)} loading={<p className="text-center text-muted-foreground">Loading PDF…</p>}>
      <Page pageNumber={page} width={640} renderAnnotationLayer={false} renderTextLayer={false} />
    </Document>
  );
};

export default Reader;
