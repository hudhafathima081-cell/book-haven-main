import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function MyBooks() {

  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {

    const { data, error } = await supabase
      .from("books")
      .select("*");

    if (!error && data) {
      setBooks(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-10">

      <h1 className="text-4xl font-bold mb-3">
        My Books
      </h1>

      <p className="text-gray-400 mb-10">
        Your saved and purchased books.
      </p>

      {books.length === 0 ? (

        <div className="text-center text-gray-500 mt-32">
          No books added yet.
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {books.map((book) => (

            <div
              key={book.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 transition"
            >

              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-4">

                <h2 className="font-semibold text-lg">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {book.author}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}   