import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

import type { Book } from "@/lib/types";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setBook(data as Book);
      });

  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800">

        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="font-bold text-lg">
            {book.title}
          </h1>

          <p className="text-sm text-zinc-400">
            {book.author}
          </p>
        </div>

      </div>

      {/* PDF Reader */}
      <div className="p-4">

        {book.pdf_url ? (

          <iframe
            src={book.pdf_url}
            className="w-full h-[90vh] rounded-xl bg-white"
            title={book.title}
          />

        ) : (

          <div className="text-center text-zinc-400 mt-20">
            No PDF found.
          </div>

        )}

      </div>

    </div>
  );
};

export default Reader;