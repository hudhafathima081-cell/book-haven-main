import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "./hooks/useAuth";
import { useIsAdmin } from "./hooks/useIsAdmin";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { isAdmin, checkingAdmin } = useIsAdmin();

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center text-white">
        Checking access...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>

        <Route path="/" element={<Index />} />

        <Route path="/library" element={<Library />} />

        <Route path="/book/:id" element={<BookDetail />} />

        <Route path="/reader/:id" element={<Reader />} />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

        <Route
  path="/admin/books/new"
  element={
    <AdminRoute>
      <AdminBookForm />
    </AdminRoute>
  }
/>

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