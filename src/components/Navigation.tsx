// Navbar.tsx
import { useState, memo } from "react";
import SearchBar from "./SearchBar";
import { useLocation, Link } from "react-router-dom";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string>("");

  const location = useLocation();
  const showSearchBar = location.pathname !== "/";

  const handleLinkClick = () => {
    setIsOpen(false); // κλείνει το mobile menu
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">
        <Link to="/" title="Go to home page" onClick={handleLinkClick}>
          My Movies
        </Link>
      </div>

      {/* Search bar */}
      {showSearchBar && <SearchBar query={query} onQueryChange={setQuery} />}

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400" onClick={handleLinkClick}>
          Home
        </Link>
        <Link
          to="/favorites"
          className="hover:text-red-400"
          onClick={handleLinkClick}
        >
          Favorites
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col space-y-2 px-6 py-4 z-50">
          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:text-red-400"
            onClick={handleLinkClick}
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}

// React.memo για αποφυγή περιττών re-renders
export default memo(NavbarComponent);
