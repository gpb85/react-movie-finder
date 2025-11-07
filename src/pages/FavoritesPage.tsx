// pages/FavoritesPage.tsx
import { FavoritesContextProvider } from "../context/FavoritesContext";
import Navbar from "../components/Navigation";
import Favorites from "../components/Favorites";

interface FavoritesPageProps {
  onShowDetails: (imdbID: string) => void;
}

export default function FavoritesPage({ onShowDetails }: FavoritesPageProps) {
  return (
    <FavoritesContextProvider>
      <Navbar />
      <Favorites onShowDetails={onShowDetails} />
    </FavoritesContextProvider>
  );
}
