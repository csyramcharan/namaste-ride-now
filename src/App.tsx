import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import TrackBusScreen from "./pages/TrackBusScreen";
import FindBusScreen from "./pages/FindBusScreen";
import ProfileScreen from "./pages/ProfileScreen";
import VoiceAssistant from "./components/VoiceAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('namasteTransitLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('namasteTransitLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('namasteTransitLoggedIn');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route 
                path="/" 
                element={
                  isLoggedIn ? (
                    <HomeScreen onLogout={handleLogout} />
                  ) : (
                    <LoginScreen onLogin={handleLogin} />
                  )
                } 
              />
              <Route 
                path="/track" 
                element={
                  isLoggedIn ? (
                    <TrackBusScreen />
                  ) : (
                    <LoginScreen onLogin={handleLogin} />
                  )
                } 
              />
              <Route 
                path="/find" 
                element={
                  isLoggedIn ? (
                    <FindBusScreen />
                  ) : (
                    <LoginScreen onLogin={handleLogin} />
                  )
                } 
              />
              <Route 
                path="/profile" 
                element={
                  isLoggedIn ? (
                    <ProfileScreen onLogout={handleLogout} />
                  ) : (
                    <LoginScreen onLogin={handleLogin} />
                  )
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {isLoggedIn && <VoiceAssistant />}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;