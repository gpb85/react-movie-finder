import type { MovieProps } from "../types/movies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: MovieProps[];
  onShowDetails: (imdbID: string) => void;
  currentPage?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: () => void;
  previousPage?: () => void;
  totalResults: number;
}

export default function MovieGrid({
  movies,
  onShowDetails,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,

  totalResults,
}: MovieGridProps) {
  const totalPages = Math.ceil(totalResults / 10);
  console.log("totalpages", totalPages);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} onShowDetails={onShowDetails} />
        ))}
      </div>
      {/**pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={previousPage}
          disabled={!hasPreviousPage}
          className={`px-4 py-2 rounded ${
            hasPreviousPage
              ? "bg-blue-500 hover:big-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          previous
        </button>
        <span className="flex items-center text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded ${
            hasNextPage
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
}
