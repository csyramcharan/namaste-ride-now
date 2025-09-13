import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🚌</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This bus route doesn't exist
        </p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-gradient-button hover:opacity-90 text-white px-6 py-3"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
