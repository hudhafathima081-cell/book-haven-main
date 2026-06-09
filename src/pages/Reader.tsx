import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center text-2xl">
        Loading story...
      </div>
    );
  }

  const chapters = book.content || [];
  const chapter = chapters[page];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-black text-white flex flex-col">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-sm text-gray-400">
            by {book.author}
          </p>
        </div>

        <div className="text-sm text-gray-400">
          Chapter {page + 1} / {chapters.length}
        </div>
      </div>

      {/* Reading Area */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-4xl rounded-3xl bg-white/10 border border-white/10 shadow-2xl backdrop-blur-xl p-10 md:p-16 animate-fade-in">

          <h2 className="text-4xl font-bold mb-10 text-yellow-300 leading-tight">
            {chapter.title}
          </h2>

          <div className="text-xl leading-[2.3] text-gray-100 whitespace-pre-line">
            {chapter.body}
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-lg px-8 py-5 flex items-center justify-between">

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition disabled:opacity-30"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {chapters.map((_: any, i: number) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === page
                  ? "w-10 bg-yellow-400"
                  : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(p + 1, chapters.length - 1)
            )
          }
          disabled={page === chapters.length - 1}
          className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Reader;