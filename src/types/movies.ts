export interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Awards: string;
  imdbRating: string;
  Director: string;
  Plot: string;
  Genre: string;
  Actors: string;
  Language: string;
  Writer: string;
}

export interface OmdbIDApiResponse {
  Search?: MovieProps[];
  Response: "True" | "False";
  Error?: string;
  totalResults?: string;
}

export interface UseMoviesResult {
  movies: MovieProps[];
  sortedMovies: MovieProps[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  refetch: () => Promise<void>;
}
