import { useState } from "react";
//import { ChevronDownIcon } from "@heroicons/react/24/solid"; // προαιρετικά για το dropdown arrow

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">MyMovies</div>

      {/* Links */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="hover:text-blue-400">
          Home
        </a>
        <a href="#" className="hover:text-blue-400">
          Search
        </a>
        <a href="#" className="hover:text-blue-400">
          About
        </a>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 hover:text-blue-400 focus:outline-none"
          >
            Categories
            {/*<ChevronDownIcon className="w-4 h-4" />*/}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Movies
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Series
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Episodes
              </a>
            </div>
          )}
        </div>
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
          <a href="#" className="hover:text-blue-400">
            Home
          </a>
          <a href="#" className="hover:text-blue-400">
            Search
          </a>
          <a href="#" className="hover:text-blue-400">
            About
          </a>
          <a href="#" className="hover:text-blue-400">
            Movies
          </a>
          <a href="#" className="hover:text-blue-400">
            Series
          </a>
          <a href="#" className="hover:text-blue-400">
            Episodes
          </a>
        </div>
      )}
    </nav>
  );
}
