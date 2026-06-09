import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import BookPage from "./pages/BookPage";
import Auth from "./pages/Auth";
import AdminBookForm from "./pages/AdminBookForm";
import Reader from "./pages/Reader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/library" element={<Library />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/signin" element={<Auth />} />
<Route path="/join" element={<Auth />} />
<Route path="/admin/books/new" element={<AdminBookForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reader/:id" element={<Reader />} />
        
      </Routes>
    </Router>
  );
}

export default App;