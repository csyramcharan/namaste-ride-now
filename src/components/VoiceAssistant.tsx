import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice Assistant",
          description: "Listening... Speak your command",
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognitionInstance.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Voice Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive"
        });
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    console.log('Voice command:', command);
    
    if (command.includes('track') || command.includes('track my bus')) {
      toast({
        title: "Voice Command",
        description: "Navigating to Track Bus...",
      });
      navigate('/track');
    } else if (command.includes('find') || command.includes('find bus')) {
      toast({
        title: "Voice Command", 
        description: "Navigating to Find Bus...",
      });
      navigate('/find');
    } else if (command.includes('profile') || command.includes('my profile')) {
      toast({
        title: "Voice Command",
        description: "Navigating to Profile...",
      });
      navigate('/profile');
    } else if (command.includes('home') || command.includes('go home')) {
      toast({
        title: "Voice Command",
        description: "Navigating to Home...",
      });
      navigate('/');
    } else {
      toast({
        title: "Voice Command Not Recognized",
        description: `Try saying "Track my bus", "Find bus", "Profile", or "Go home"`,
        variant: "destructive"
      });
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <Button
      onClick={toggleListening}
      className={`fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-floating z-50 transition-all duration-300 ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse-soft' 
          : 'bg-gradient-button hover:opacity-90 hover:scale-110'
      }`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </Button>
  );
};

export default VoiceAssistant;