import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import Auth from "./pages/Auth";
import AdminBookForm from "./pages/AdminBookForm";
import Reader from "./pages/Reader";

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Index />} />

        {/* Library */}
        <Route path="/library" element={<Library />} />

        {/* Book Detail */}
        <Route path="/book/:id" element={<BookDetail />} />

        {/* Reader */}
        <Route path="/reader/:id" element={<Reader />} />

        {/* Auth Pages */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/join" element={<Auth />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/books/new" element={<AdminBookForm />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;