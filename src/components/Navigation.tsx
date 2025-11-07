import { useState } from "react";
import SearchBar from "./SearchBar";
import { useLocation, Link } from "react-router-dom";
//import { ChevronDownIcon } from "@heroicons/react/24/solid"; // προαιρετικά για το dropdown arrow

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string | "">("");

  const location = useLocation();
  const showSearchBar = location.pathname !== "/";

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">MyMovies</div>
      {showSearchBar && <SearchBar query={query} onQueryChange={setQuery} />}

      {/* Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <br />
        <Link to="/favorites" className="hover:text-red-400">
          Favorites
        </Link>

        {/* Dropdown! */}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col space-y-2 px-6 py-4">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-red-400">
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}
