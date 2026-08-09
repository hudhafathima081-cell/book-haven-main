import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/library", label: "Library" },
  { to: "/my-books", label: "My Books" },
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isAdmin }= useIsAdmin();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-semibold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-amber text-primary-foreground shadow-glow">
            <BookOpen className="h-5 w-5" />
          </span>

          <span>
            Lumen<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {user ? (
            <>
              {/* ADMIN - ONLY VISIBLE TO ADMIN */}
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin")}
                >
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              )}

              {/* LOGOUT */}
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
             

             {/* JOIN FREE */}
<Button
  size="sm"
  className="bg-gradient-amber text-primary-foreground hover:opacity-90"
  onClick={() => navigate("/join")}
>
  Join free
</Button>
            </>
          )}

        </div>
      </div>
    </header>
  );
};