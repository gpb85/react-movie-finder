import { useState } from "react";
import SearchBar from "./SearchBar";
import MovieGrid from "./MovieGrid";
import UseMovies from "../hooks/useMedia";

interface MovieSearchProps {
  onShowDetails: (imdbID: string) => void;
}

export default function MovieSearch({ onShowDetails }: MovieSearchProps) {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error, refetch } = UseMovies(query, "movie");

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SearchBar query={query} onQueryChange={setQuery} />

      {isLoading && <div className="text-white mt-4">Loading movies...</div>}

      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && movies.length === 0 && query && (
        <p className="text-gray-400 mt-4">No movies found for "{query}"</p>
      )}

      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onShowDetails={onShowDetails} />
      )}
    </div>
  );
}
