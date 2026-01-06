import { Link } from "react-router-dom";
import { Button } from "@/core/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Home Page</h1>
        <Link to="/properties">
          <Button size="lg" className="text-lg px-8">
            Découvrir les biens
          </Button>
        </Link>
      </div>
    </div>
  );
}
