import type { MovieProps } from "../types/movies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: MovieProps[];
  onShowDetails: (imdbID: string) => void;
}

export default function MovieGrid({ movies, onShowDetails }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} onShowDetails={onShowDetails} />
      ))}
    </div>
  );
}
