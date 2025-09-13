import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import namasteIcon from "@/assets/namaste-icon.png";

const SplashScreen = ({ onFinish }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the start button after animation completes
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-splash flex flex-col items-center justify-center p-6 text-center">
      {/* Animated Namaste Icon */}
      <div className="animate-namaste-bounce mb-8">
        <img 
          src={namasteIcon} 
          alt="Namaste gesture" 
          className="w-32 h-32 mx-auto filter brightness-0 invert"
        />
      </div>

      {/* App Title */}
      <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">
        Namaste Transit
      </h1>
      <p className="text-xl text-white/80 mb-12 animate-slide-up">
        Your journey, our commitment
      </p>

      {/* Start Button */}
      {showButton && (
        <Button
          onClick={onFinish}
          size="lg"
          className="animate-scale-in bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
        >
          Start Tracking
        </Button>
      )}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/5 rounded-full animate-pulse-soft" />
    </div>
  );
};

export default SplashScreen;