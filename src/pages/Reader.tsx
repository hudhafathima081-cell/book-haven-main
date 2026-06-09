import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  const chapters = book.content || [];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#0b0f19] text-white scroll-smooth">

      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-5 backdrop-blur-2xl bg-black/20 border-b border-white/10">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              {book.title}
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              by {book.author}
            </p>
          </div>

          <div className="text-sm text-gray-400">
            Lumen Reader
          </div>

        </div>
      </div>

      {/* Chapters */}
      <div ref={containerRef}>
        {chapters.map((chapter: any, index: number) => (
          <section
            key={index}
            className="min-h-screen snap-start flex items-center justify-center px-6 py-32"
          >
            <div className="w-full max-w-5xl rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] p-10 md:p-20 transition-all duration-700">

              {/* Chapter Number */}
              <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300">
                Chapter {index + 1}
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {chapter.title}
              </h2>

              {/* Story */}
              <div className="space-y-8 text-[20px] leading-[2.2] text-gray-200 whitespace-pre-line font-light">
                {chapter.body}
              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Reader;