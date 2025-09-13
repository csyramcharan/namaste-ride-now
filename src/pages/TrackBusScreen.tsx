import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation, Clock, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const TrackBusScreen = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [tracking, setTracking] = useState(false);

  const handleStartTracking = () => {
    if (!fromLocation || !toLocation) {
      return;
    }
    setTracking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-soft">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Track My Bus</h1>
            <p className="text-sm opacity-90">Real-time bus location</p>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24">
        {!tracking ? (
          /* Route Selection */
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-center text-foreground">
                  Where are you traveling?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter pickup location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="pl-10 py-6 bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">To</label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter destination"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="pl-10 py-6 bg-input border-border"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleStartTracking}
                  disabled={!fromLocation || !toLocation}
                  className="w-full py-6 text-lg font-semibold bg-gradient-button hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                >
                  Start Tracking
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Tracking Interface */
          <div className="space-y-6 animate-fade-in">
            {/* Map Placeholder */}
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-light-green to-fresh-green rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 animate-pulse-soft" />
                    <p className="text-lg font-semibold">Live Bus Tracking</p>
                    <p className="text-sm opacity-80">Bus is 2.5 km away</p>
                  </div>
                  
                  {/* Animated bus indicator */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse-soft">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bus Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  🚌 Bus #KA-05-2847
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">ETA</div>
                      <div className="text-lg font-bold text-primary">8 mins</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Occupancy</div>
                      <div className="text-lg font-bold text-accent">Moderate</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Route Progress</span>
                    <span className="text-sm font-medium">4/7 stops</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '57%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Stops */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Upcoming Stops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Brigade Road', 'MG Road', 'Trinity Circle'].map((stop, index) => (
                    <div key={stop} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-muted-foreground'}`} />
                      <span className={`${index === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {stop}
                      </span>
                      {index === 0 && (
                        <span className="ml-auto text-sm text-primary font-medium">Next</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackBusScreen;