import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, User, Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import namasteIcon from "@/assets/namaste-icon.png";

const HomeScreen = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const handleTrackBus = () => {
    navigate('/track');
  };

  const handleFindBus = () => {
    navigate('/find');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-button text-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={namasteIcon} 
              alt="Namaste Transit" 
              className="w-8 h-8 filter brightness-0 invert"
            />
            <div>
              <h1 className="text-xl font-bold">Namaste Transit</h1>
              <p className="text-sm opacity-90">Your trusted travel companion</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome aboard! 🚌
            </h2>
            <p className="text-muted-foreground">
              What would you like to do today?
            </p>
          </div>

          {/* Main Action Cards */}
          <div className="space-y-4">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-card animate-slide-up"
              onClick={handleTrackBus}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">Track My Bus</h3>
                    <p className="text-muted-foreground text-sm">
                      Real-time location tracking of your bus
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-card animate-slide-up"
              onClick={handleFindBus}
              style={{ animationDelay: '0.1s' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">Find Bus</h3>
                    <p className="text-muted-foreground text-sm">
                      Search for buses on your route
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Trips Taken</div>
              </CardContent>
            </Card>
            <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">5.2k</div>
                <div className="text-sm text-muted-foreground">KM Traveled</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-floating">
        <div className="flex justify-around py-3">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2 px-4"
            onClick={() => setActiveTab('home')}
          >
            <div className={`w-6 h-6 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}>
              🏠
            </div>
            <span className={`text-xs ${activeTab === 'home' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Home
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2 px-4"
            onClick={handleTrackBus}
          >
            <MapPin className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Track</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2 px-4"
            onClick={handleFindBus}
          >
            <Search className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Find</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2 px-4"
            onClick={handleProfile}
          >
            <User className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default HomeScreen;