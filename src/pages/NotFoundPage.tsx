import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex cols-2 gap-4">
      404 not found
      <Link to="/">Home</Link>
    </div>
  );
}
