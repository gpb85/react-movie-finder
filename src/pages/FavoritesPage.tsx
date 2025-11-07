import Favorites from "../components/Favorites";
import Navbar from "../components/Navigation";
import { FavoritesContextProvider } from "../context/FavoritesContext";

interface FavoritesPageProps {
  onShowDetails: (imdbID: string) => void;
}

export default function FavoritesPage({ onShowDetails }: FavoritesPageProps) {
  return (
    <div>
      <FavoritesContextProvider>
        <Navbar />
        <Favorites onShowDetails={onShowDetails} />;
      </FavoritesContextProvider>
    </div>
  );
}
