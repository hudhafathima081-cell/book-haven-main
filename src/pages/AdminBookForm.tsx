import { useState } from "react";

const AdminBookForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Book title:", title);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminBookForm;