import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Send, Phone, Mail } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const ComplainScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    busNumber: '',
    route: '',
    subject: '',
    description: '',
    contact: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitComplaint = () => {
    if (!formData.subject || !formData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate complaint submission
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been registered. We'll contact you soon.",
      variant: "default"
    });

    // Reset form
    setFormData({
      busNumber: '',
      route: '',
      subject: '',
      description: '',
      contact: ''
    });
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
            <h1 className="text-xl font-bold">Register Complaint</h1>
            <p className="text-sm opacity-90">We value your feedback</p>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Complaint Form */}
          <Card className="shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-5 h-5" />
                Submit Your Complaint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Bus Number (Optional)</label>
                <Input
                  placeholder="e.g., KA-05-2847"
                  value={formData.busNumber}
                  onChange={(e) => handleInputChange('busNumber', e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Route (Optional)</label>
                <Input
                  placeholder="e.g., Vijayawada - Guntur"
                  value={formData.route}
                  onChange={(e) => handleInputChange('route', e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject *</label>
                <Input
                  placeholder="Brief description of issue"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Textarea
                  placeholder="Describe your complaint in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-input border-border min-h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Contact Number</label>
                <Input
                  placeholder="Enter your mobile number"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <Button 
                onClick={handleSubmitComplaint}
                className="w-full bg-gradient-button hover:opacity-90 transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Complaint
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-foreground">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Helpline</div>
                  <div className="text-sm text-muted-foreground">+91-866-1234567</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Email Support</div>
                  <div className="text-sm text-muted-foreground">support@namastetransit.com</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ComplainScreen;