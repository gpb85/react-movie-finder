// pages/FavoritesPage.tsx

import Navbar from "../components/Navigation";
import Favorites from "../components/Favorites";

interface FavoritesPageProps {
  onShowDetails: (imdbID: string) => void;
}

export default function FavoritesPage({ onShowDetails }: FavoritesPageProps) {
  return (
    <div>
      <Navbar />
      <Favorites onShowDetails={onShowDetails} />
    </div>
  );
}
