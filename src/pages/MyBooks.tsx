export default function MyBooks() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Books
      </h1>

      <p className="text-gray-400 mb-10">
        Your purchased and saved books.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <img
            src="https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg"
            className="rounded-xl mb-4"
          />

          <h2 className="font-semibold">
            Harry Potter
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <img
            src="https://m.media-amazon.com/images/I/71g2ednj0JL.jpg"
            className="rounded-xl mb-4"
          />

          <h2 className="font-semibold">
            Psychology of Money
          </h2>
        </div>

      </div>

    </div>
  );
}