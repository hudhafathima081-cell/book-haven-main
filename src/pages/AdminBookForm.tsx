import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Chapter {
  title: string;
  body: string;
}

const AdminBookForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      title: "",
      body: "",
    },
  ]);

  const [saving, setSaving] = useState(false);

  const updateChapter = (
    index: number,
    field: "title" | "body",
    value: string
  ) => {
    setChapters((prev) =>
      prev.map((chapter, i) =>
        i === index
          ? {
              ...chapter,
              [field]: value,
            }
          : chapter
      )
    );
  };

  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: "",
        body: "",
      },
    ]);
  };

  const removeChapter = (index: number) => {
    setChapters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      alert("Please enter the book title and author.");
      return;
    }

    setSaving(true);

    const validChapters = chapters.filter(
      (chapter) => chapter.title.trim() && chapter.body.trim()
    );

    const { error } = await supabase.from("books").insert([
      {
        title,
        author,
        cover_url: coverUrl,
        price,
        description,
        format: "pdf",
        content: validChapters,
      },
    ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Book added successfully!");

    navigate("/library");
  };

  return (
    <div className="min-h-screen p-10 bg-black text-white">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Add Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BOOK DETAILS */}

          <div>
            <label className="block mb-2">
              Book Title
            </label>

            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded bg-zinc-900"
            />
          </div>

          <div>
            <label className="block mb-2">
              Author
            </label>

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 rounded bg-zinc-900"
            />
          </div>

          <div>
            <label className="block mb-2">
              Cover Image URL
            </label>

            <input
              type="text"
              placeholder="Cover Image URL"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full p-3 rounded bg-zinc-900"
            />
          </div>

          <div>
            <label className="block mb-2">
              Description
            </label>

            <textarea
              placeholder="Short description about the book"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 rounded bg-zinc-900"
            />
          </div>

          <div>
            <label className="block mb-2">
              Price
            </label>

            <input
              type="number"
              min="0"
              placeholder="Price (0 = Free)"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3 rounded bg-zinc-900"
            />

            <p className="text-sm text-gray-400 mt-2">
              Enter 0 for a free book.
            </p>
          </div>


          {/* BOOK CONTENT */}

          <div className="border-t border-white/10 pt-8">

            <h2 className="text-2xl font-bold mb-2">
              Book Content
            </h2>

            <p className="text-gray-400 mb-6">
              Add the chapters and story of the book.
            </p>

            <div className="space-y-8">

              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
                >

                  <div className="flex items-center justify-between mb-5">

                    <h3 className="text-xl font-semibold">
                      Chapter {index + 1}
                    </h3>

                    {chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChapter(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}

                  </div>

                  <input
                    type="text"
                    placeholder="Chapter title"
                    value={chapter.title}
                    onChange={(e) =>
                      updateChapter(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded bg-zinc-900 mb-4"
                  />

                  <textarea
                    placeholder="Write the story of this chapter..."
                    value={chapter.body}
                    onChange={(e) =>
                      updateChapter(
                        index,
                        "body",
                        e.target.value
                      )
                    }
                    rows={12}
                    className="w-full p-4 rounded bg-zinc-900 leading-relaxed"
                  />

                </div>
              ))}

            </div>

            {/* ADD CHAPTER */}

            <button
              type="button"
              onClick={addChapter}
              className="mt-6 border border-yellow-500 text-yellow-400 px-5 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
            >
              + Add Chapter
            </button>

          </div>


          {/* SAVE */}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-yellow-500 text-black px-6 py-4 rounded-xl font-bold hover:bg-yellow-400 disabled:opacity-50"
          >
            {saving ? "Saving Book..." : "Save Book"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminBookForm;