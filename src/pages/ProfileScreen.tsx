import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Phone, MapPin, Clock, Star, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProfileScreen = ({ onLogout }) => {
  const navigate = useNavigate();

  const userStats = [
    { label: 'Total Trips', value: '24', icon: '🚌' },
    { label: 'Distance Traveled', value: '5.2k km', icon: '📍' },
    { label: 'Money Saved', value: '₹2,400', icon: '💰' },
    { label: 'Rating Given', value: '4.8', icon: '⭐' }
  ];

  const recentTrips = [
    {
      id: 1,
      from: 'Brigade Road',
      to: 'Electronic City',
      date: '2024-01-15',
      busNumber: 'KA-05-2847',
      fare: '₹35',
      rating: 5
    },
    {
      id: 2,
      from: 'MG Road',
      to: 'Whitefield',
      date: '2024-01-14',
      busNumber: 'KA-05-3156',
      fare: '₹45',
      rating: 4
    },
    {
      id: 3,
      from: 'Koramangala',
      to: 'Hebbal',
      date: '2024-01-13',
      busNumber: 'KA-05-1847',
      fare: '₹30',
      rating: 5
    }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-success text-white p-4 shadow-soft">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">My Profile</h1>
            <p className="text-sm opacity-90">Manage your account</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 p-2"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="shadow-card animate-fade-in">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">Traveler User</h2>
              <p className="text-muted-foreground text-sm mb-3">Premium Member</p>
              <Badge className="bg-success text-white">
                Active Since Jan 2024
              </Badge>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-foreground">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone Number</div>
                  <div className="font-medium text-foreground">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Home Location</div>
                  <div className="font-medium text-foreground">Koramangala, Bangalore</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Travel Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {userStats.map((stat, index) => (
                  <div key={stat.label} className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Trips */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Recent Trips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{trip.from}</span>
                      <span className="text-xs text-muted-foreground">→</span>
                      <span className="text-sm font-medium text-foreground">{trip.to}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{trip.busNumber}</span>
                      <span>{trip.date}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{trip.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">{trip.fare}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Trip History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Rate Your Experience
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;