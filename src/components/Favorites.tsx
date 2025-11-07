import { useFavoritesContext } from "../context/FavoritesContext";

import MovieGrid from "./MovieGrid";

interface FavoritesProps {
  onShowDetails: (imdbID: string) => void;
}

export default function Favorites({ onShowDetails }: FavoritesProps) {
  const { favorites } = useFavoritesContext();

  if (!favorites || favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div className="favorites-container">
      <MovieGrid
        movies={favorites}
        onShowDetails={onShowDetails}
        totalResults={favorites.length}
      />
    </div>
  );
}
