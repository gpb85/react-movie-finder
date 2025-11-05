import type { MovieProps } from "../types/movies";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

interface CarouselProps {
  movies: MovieProps[];
  onShowDetails: (imdbID: string) => void;
}

export default function FavoritesCarousel({
  movies,
  onShowDetails,
}: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(4);
      else setItemsPerPage(6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const visibleItems = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-4/5 relative">
        {startIndex > 0 && (
          <button
            onClick={() => setStartIndex(Math.max(startIndex - 1, 0))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="flex justify-center gap-4 overflow-hidden">
          {visibleItems.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex-none"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <MovieCard movie={movie} onShowDetails={onShowDetails} />
            </div>
          ))}
        </div>

        {startIndex + itemsPerPage < movies.length && (
          <button
            onClick={() =>
              setStartIndex(
                Math.min(startIndex + 1, movies.length - itemsPerPage)
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
          >
            <ArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
