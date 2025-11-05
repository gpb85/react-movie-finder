import React from "react";
import type { MovieProps } from "../types/movies";
import { useFavoritesContext } from "../context/FavoritesContext";
import { Heart } from "lucide-react";

interface MovieCardProps {
  movie: MovieProps;
  onShowDetails: (imdbID: string) => void;
}

export default React.memo(function MovieCard({
  movie,
  onShowDetails,
}: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  return (
    <div
      className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform active:scale-95 cursor-pointer"
      onClick={() => onShowDetails(movie.imdbID)}
    >
      {/* Poster */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay info */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
        <h3 className="text-white font-semibold text-lg truncate">
          {movie.Title}
        </h3>
        <p className="text-gray-300 text-sm">Year: {movie.Year}</p>
        <p className="text-gray-300 text-sm">Rating: {movie.imdbRating}</p>
        <p className="text-gray-300 text-sm">Genre: {movie.Genre}</p>
      </div>

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Αποφυγή triggering του onClick του card
          isFavorite ? removeFavorite(movie.imdbID) : addFavorite(movie);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition z-10"
      >
        <Heart
          size={20}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-300"}
        />
      </button>
    </div>
  );
});
