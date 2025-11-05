import { useRef, useEffect } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
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
    </div>
  );
}
