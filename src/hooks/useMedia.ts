import {
  useCallback,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  type MovieProps,
  type UseMoviesResult,
  type OmdbIDApiResponse,
} from "../types/movies";

const baseUrl = "https://www.omdbapi.com";
const apikey = "6194636e";

interface State {
  items: MovieProps[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
}

type Action =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { items: MovieProps[]; totalResults: number };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "CLEAR" }
  | { type: "SET_PAGE"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        items: action.payload.items,
        totalResults: action.payload.totalResults,
        isLoading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "CLEAR":
      return {
        items: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        totalResults: 0,
      };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

export default function useMovies(
  query: string,
  type: "movie" | "series" | "episode" | "all" = "movie"
): UseMoviesResult {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isLoading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  });
  const deferredQuery = useDeferredValue(query);
  const abortedControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<
    Record<string, { items: MovieProps[]; totalResults: number }>
  >({});
  const lastFetchKeyRef = useRef<string | null>(null);

  const fetchMovies = useCallback(async () => {
    const searchQuery = deferredQuery.trim();
    const key = `${type}-${searchQuery}-page${state.currentPage}`;

    // Αν το query είναι μικρό, καθαρίζουμε και ακυρώνουμε προηγούμενο fetch
    if (!searchQuery || searchQuery.length < 3) {
      abortedControllerRef.current?.abort();
      dispatch({ type: "CLEAR" });
      return;
    }

    // Επιστροφή από cache
    if (cacheRef.current[key]) {
      abortedControllerRef.current?.abort(); // Ακυρώνουμε προηγούμενο fetch
      dispatch({ type: "FETCH_SUCCESS", payload: cacheRef.current[key] });
      return;
    }

    // Ακύρωση προηγούμενου fetch
    abortedControllerRef.current?.abort();
    abortedControllerRef.current = new AbortController();
    lastFetchKeyRef.current = key;

    dispatch({ type: "FETCH_START" });

    try {
      const typeParam = type !== "all" ? `&type=${type}` : "";
      //console.log("type: ", type);

      const response = await fetch(
        `${baseUrl}/?apikey=${apikey}&s=${encodeURIComponent(
          searchQuery
        )}${typeParam}&page=${state.currentPage}`,
        { signal: abortedControllerRef.current.signal }
      );

      if (!response.ok)
        throw new Error(`HTTP ERROR! Status: ${response.status}`);
      const data: OmdbIDApiResponse = await response.json();

      // Ελέγχουμε ότι αυτό είναι το τελευταίο fetch που ξεκίνησε
      if (lastFetchKeyRef.current !== key) return;

      if (data.Response === "True" && data.Search) {
        const result = {
          items: data.Search,
          totalResults:
            parseInt(data.totalResults || "0", 10) || data.Search.length,
        };
        cacheRef.current[key] = result;
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } else {
        dispatch({
          type: "FETCH_ERROR",
          payload: data.Error || "No movies found",
        });
      }
    } catch (err: any) {
      if (err.name !== "AbortError" && lastFetchKeyRef.current === key) {
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message || "Something went wrong",
        });
      }
    }
  }, [deferredQuery, state.currentPage, type]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const sortedMovies = useMemo(
    () => [...state.items].sort((a, b) => a.Title.localeCompare(b.Title)),
    [state.items]
  );

  const nextPage = useCallback(() => {
    const maxPages = Math.ceil(state.totalResults / 10);
    if (state.currentPage < maxPages)
      dispatch({ type: "SET_PAGE", payload: state.currentPage + 1 });
  }, [state.currentPage, state.totalResults]);

  const previousPage = useCallback(() => {
    if (state.currentPage > 1)
      dispatch({ type: "SET_PAGE", payload: state.currentPage - 1 });
  }, [state.currentPage]);

  useDebugValue(
    state.isLoading
      ? `Loading ${type}s (page ${state.currentPage})`
      : state.error
      ? `Error: ${state.error}`
      : `Fetched ${state.items.length} ${type}s of ${state.totalResults}`
  );

  return {
    movies: state.items,
    sortedMovies,
    isLoading: state.isLoading,
    error: state.error,
    totalResults: state.totalResults,
    currentPage: state.currentPage,
    hasNextPage: state.currentPage * 10 < state.totalResults,
    hasPreviousPage: state.currentPage > 1,
    nextPage,
    previousPage,
    refetch: fetchMovies,
  };
}
