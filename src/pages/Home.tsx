import { useState } from "react";
import { FavoritesContextProvider } from "../context/FavoritesContext";
import MovieSearch from "../components/MovieSearch";
import MovieDetailsCard from "../components/MovieDetailsCard";
import Favorites from "../components/Favorites";
import Navbar from "../components/Navigation";

export default function Home() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const handleShowDetails = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <FavoritesContextProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie Finder</h1>

        {/* Movie Search */}
        <MovieSearch onShowDetails={handleShowDetails} />

        {/* Movie Details Modal */}
        {selectedMovieId && (
          <MovieDetailsCard
            imdbID={selectedMovieId}
            onClose={handleCloseDetails}
          />
        )}

        {/* Favorites List */}
        <Favorites onShowDetails={handleShowDetails} />
      </main>
    </FavoritesContextProvider>
  );
}
