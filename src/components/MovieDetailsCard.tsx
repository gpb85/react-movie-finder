import { useEffect, useRef, useState } from "react";
import type { MovieProps } from "../types/movies";
import { X } from "lucide-react";

interface MovieDetailsCardProps {
  imdbID: string;
  onClose: () => void;
}

export default function MovieDetailsCard({
  imdbID,
  onClose,
}: MovieDetailsCardProps) {
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch movie details
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6194636e&i=${imdbID}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Failed to fetch movie details");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [imdbID]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-6 rounded-xl">
          <p>{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-5xl relative shadow-lg overflow-y-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Poster */}
          {loading ? (
            <div className="w-full lg:w-[56%] h-64 bg-gray-700 animate-pulse rounded" />
          ) : (
            <img
              src={movie?.Poster !== "N/A" ? movie?.Poster : "/placeholder.jpg"}
              alt={movie?.Title}
              className="w-full lg:w-[56%] object-cover rounded"
            />
          )}

          {/* Details */}
          <div className="w-full lg:w-[44%] flex flex-col">
            <h2 className="text-2xl font-bold">
              {loading ? (
                <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse mb-2" />
              ) : (
                `${movie?.Title} (${movie?.Year})`
              )}
            </h2>
            <p className="mt-2 text-gray-300">
              {loading ? (
                <div className="h-4 bg-gray-600 rounded w-full animate-pulse mb-1" />
              ) : (
                movie?.Plot
              )}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-2/3 animate-pulse mb-1" />
              ) : (
                `Director: ${movie?.Director}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-2/3 animate-pulse mb-1" />
              ) : (
                `Writer: ${movie?.Writer}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-2/3 animate-pulse mb-1" />
              ) : (
                `Actors: ${movie?.Actors}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-2/3 animate-pulse mb-1" />
              ) : (
                `Genre: ${movie?.Genre}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-2/3 animate-pulse mb-1" />
              ) : (
                `Language: ${movie?.Language}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-1/3 animate-pulse mb-1" />
              ) : (
                `IMDB Rating: ${movie?.imdbRating}`
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {loading ? (
                <div className="h-3 bg-gray-600 rounded w-1/2 animate-pulse mb-1" />
              ) : (
                `Awards: ${movie?.Awards}`
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
