import { useRef, useEffect } from "react";

interface SearchBarProps {
  query: string;
  type: "movie" | "series" | "all";
  onQueryChange: (value: string) => void;
  onTypeChange: (value: "movie" | "series" | "all") => void;
}

export default function SearchBar({
  query,
  type,
  onQueryChange,
  onTypeChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <label htmlFor="search">
        <input
          id="search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search here"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <div className="flex space-x-2">
        {["all", "movie", "series"].map((t) => (
          <label
            key={t}
            className={`cursor-pointer px-3 py-1 rounded border ${
              type === t
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border rounded"
            }`}
          >
            <input
              type="radio"
              className=" hidden"
              value={t}
              checked={type === t}
              onChange={() => onTypeChange(t as any)}
            />
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}
