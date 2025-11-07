// App.tsx
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";
import MovieDetailsCard from "./components/MovieDetailsCard";

export default function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const handleShowDetails = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home onShowDetails={handleShowDetails} />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage onShowDetails={handleShowDetails} />,
      },
    ],
    { basename: "/react-movie-finder" }
  );

  return (
    <div>
      <RouterProvider router={router} />
      {selectedMovieId && (
        <MovieDetailsCard
          imdbID={selectedMovieId}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
