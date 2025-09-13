// Namaste Transit - Welcome page with navigation to main app
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import namasteIcon from "@/assets/namaste-icon.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-splash flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-full animate-pulse-soft" />
      
      {/* Main content */}
      <div className="z-10 max-w-md mx-auto">
        {/* App Icon */}
        <div className="w-24 h-24 mx-auto mb-8 animate-namaste-bounce">
          <img 
            src={namasteIcon} 
            alt="Namaste Transit Logo" 
            className="w-full h-full filter brightness-0 invert"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
          Namaste Transit
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-white/90 mb-8 animate-slide-up">
          Your trusted companion for bus journeys across the city
        </p>

        {/* Features */}
        <div className="space-y-3 mb-12 text-white/80 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-center gap-2">
            <span>🚌</span>
            <span>Real-time bus tracking</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🎤</span>
            <span>Voice assistant support</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>📱</span>
            <span>Easy mobile verification</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/')}
          size="lg"
          className="animate-scale-in bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
          style={{animationDelay: '0.4s'}}
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default Index;
