import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminBookForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("books").insert([
      {
        title,
        author,
        cover_url: coverUrl,
        pdf_url: pdfUrl,
        price,
        description,
        format: "pdf",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Book added successfully!");

    navigate("/library");
  };

  return (
    <div className="min-h-screen p-10 bg-black text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add Book</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <input
            type="text"
            placeholder="Cover Image URL"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <input
            type="text"
            placeholder="PDF URL"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <input
            type="number"
            placeholder="Price (0 = Free)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-3 rounded bg-zinc-900"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-3 rounded font-bold"
          >
            Save Book
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminBookForm;