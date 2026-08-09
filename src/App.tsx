import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import Auth from "./pages/Auth";
import AdminBookForm from "./pages/AdminBookForm";
import Reader from "./pages/Reader";
import Join from "./pages/Join";
import MyBooks from "./pages/MyBooks";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>

        <Route path="/" element={<Index />} />

        <Route path="/library" element={<Library />} />

        <Route path="/book/:id" element={<BookDetail />} />

        <Route path="/reader/:id" element={<Reader />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/books/new" element={<AdminBookForm />} />

        {/* AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* OLD LINKS REDIRECT */}
        <Route path="/signin" element={<Auth />} />
        <Route path="/join" element={<Join />} />
        <Route path="/my-books" element={<MyBooks />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;