import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-3">
        {book.title}
      </h1>

      <p className="text-gray-400 mb-10">
        by {book.author}
      </p>

      {book.content?.map((chapter: any, index: number) => (
        <div key={index} className="mb-16">
          <h2 className="text-3xl font-semibold mb-5">
            {chapter.title}
          </h2>

          <p className="text-lg leading-9 whitespace-pre-line">
            {chapter.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reader;