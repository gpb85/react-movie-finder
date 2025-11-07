import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

interface AppProps {
  onShowDetails: (imdbID: string) => void;
}

export default function App({ onShowDetails }: AppProps) {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage onShowDetails={onShowDetails} />,
      },
    ],
    { basename: "/react-movie-finder" }
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
