// pages/Home.tsx
import { FavoritesContextProvider } from "../context/FavoritesContext";
import Navbar from "../components/Navigation";
import MovieSearch from "../components/MovieSearch";

interface HomeProps {
  onShowDetails: (imdbID: string) => void;
}

export default function Home({ onShowDetails }: HomeProps) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie Finder</h1>
        <MovieSearch onShowDetails={onShowDetails} />
      </main>
    </div>
  );
}
