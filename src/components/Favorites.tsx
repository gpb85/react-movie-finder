import { useFavoritesContext } from "../context/FavoritesContext";
import Carousel from "./Carousel";

interface FavoritesProps {
  onShowDetails: (imdbID: string) => void;
}

export default function Favorites({ onShowDetails }: FavoritesProps) {
  const { favorites } = useFavoritesContext();

  if (!favorites || favorites.length === 0)
    return (
      <p className="text-center text-gray-400">Δεν υπάρχουν αγαπημένα ακόμα.</p>
    );

  return <Carousel movies={favorites} onShowDetails={onShowDetails} />;
}
