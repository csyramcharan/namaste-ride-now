import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Navigation, Clock, Star, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FindBusScreen = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const mockBuses = [
    {
      id: 1,
      number: 'KA-05-2847',
      route: 'City Center - Tech Park',
      departureTime: '9:30 AM',
      arrivalTime: '10:15 AM',
      duration: '45 mins',
      fare: '₹25',
      occupancy: 'Low',
      rating: 4.8,
      driver: {
        name: 'Rajesh Kumar',
        id: 'DR001',
        photo: '👨‍💼',
        rating: 4.9
      },
      conductor: {
        name: 'Suresh Reddy',
        id: 'CD001',
        photo: '👨‍🔧',
        rating: 4.7
      }
    },
    {
      id: 2,
      number: 'KA-05-3156',
      route: 'City Center - Tech Park',
      departureTime: '10:00 AM',
      arrivalTime: '10:50 AM',
      duration: '50 mins',
      fare: '₹25',
      occupancy: 'Moderate',
      rating: 4.6,
      driver: {
        name: 'Venkat Rao',
        id: 'DR002',
        photo: '👨‍💼',
        rating: 4.8
      },
      conductor: {
        name: 'Lakshmi Devi',
        id: 'CD002',
        photo: '👩‍🔧',
        rating: 4.9
      }
    }
  ];

  const handleSearch = () => {
    if (!fromLocation || !toLocation) return;
    setSearchResults(mockBuses);
  };

  const getOccupancyColor = (occupancy) => {
    switch (occupancy) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent text-white p-4 shadow-soft">
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
            <h1 className="text-xl font-bold">Find Bus</h1>
            <p className="text-sm opacity-90">Search available buses</p>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Search Form */}
          <Card className="shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                Search Buses
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
                onClick={handleSearch}
                disabled={!fromLocation || !toLocation}
                className="w-full py-6 text-lg font-semibold bg-gradient-button hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
              >
                Search Buses
              </Button>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults && (
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-lg font-semibold text-foreground">
                Available Buses ({searchResults.length})
              </h3>
              
              {searchResults.map((bus) => (
                <Card key={bus.id} className="shadow-card hover:shadow-floating transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    {/* Bus Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">🚌 {bus.number}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">{bus.rating}</span>
                        </div>
                      </div>
                      <Badge className={getOccupancyColor(bus.occupancy)}>
                        {bus.occupancy}
                      </Badge>
                    </div>

                    {/* Route and Time */}
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">{bus.route}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{bus.departureTime} - {bus.arrivalTime}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{bus.duration}</div>
                          <div className="text-lg font-bold text-primary">{bus.fare}</div>
                        </div>
                      </div>
                    </div>

                    {/* Driver & Conductor Info */}
                    <div className="border-t border-border pt-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{bus.driver.photo}</span>
                          <div>
                            <div className="text-sm font-medium text-foreground">Driver</div>
                            <div className="text-xs text-muted-foreground">{bus.driver.name}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{bus.driver.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{bus.conductor.photo}</span>
                          <div>
                            <div className="text-sm font-medium text-foreground">Conductor</div>
                            <div className="text-xs text-muted-foreground">{bus.conductor.name}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{bus.conductor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      onClick={() => navigate('/track')}
                      className="w-full mt-4 bg-primary hover:bg-primary/90"
                    >
                      Track This Bus
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindBusScreen;