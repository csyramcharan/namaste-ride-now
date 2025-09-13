import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Users, Building } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ContactScreen = () => {
  const navigate = useNavigate();

  const contactMethods = [
    {
      icon: Phone,
      title: "Customer Care",
      primary: "+91-866-1234567",
      secondary: "Available 24/7",
      action: "tel:+918661234567"
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "support@namastetransit.com",
      secondary: "Response within 24 hours",
      action: "mailto:support@namastetransit.com"
    },
    {
      icon: Phone,
      title: "Emergency Helpline",
      primary: "+91-866-EMERGENCY",
      secondary: "For urgent assistance",
      action: "tel:+918663637436"
    }
  ];

  const officeLocations = [
    {
      name: "Head Office - Vijayawada",
      address: "Transport Bhavan, MG Road, Vijayawada - 520010",
      timing: "Mon-Fri: 9:00 AM - 6:00 PM",
      contact: "+91-866-2574001"
    },
    {
      name: "Regional Office - Guntur",
      address: "Bus Station Complex, Guntur - 522001", 
      timing: "Mon-Fri: 9:00 AM - 5:00 PM",
      contact: "+91-863-2234567"
    },
    {
      name: "Branch Office - Machilipatnam",
      address: "Central Bus Stand, Machilipatnam - 521001",
      timing: "Mon-Sat: 8:00 AM - 7:00 PM", 
      contact: "+91-8672-234567"
    }
  ];

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
            <h1 className="text-xl font-bold">Contact Us</h1>
            <p className="text-sm opacity-90">We're here to help you</p>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Contact Methods */}
          <div className="space-y-4 animate-fade-in">
            {contactMethods.map((method, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{method.title}</h3>
                      <p className="text-primary font-medium">{method.primary}</p>
                      <p className="text-sm text-muted-foreground">{method.secondary}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(method.action, '_self')}
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Office Locations */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building className="w-5 h-5" />
                Our Offices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {officeLocations.map((office, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-medium text-foreground">{office.name}</h4>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{office.timing}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-primary font-medium">{office.contact}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Department Contacts */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5" />
                Department Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Lost & Found</span>
                <span className="text-sm text-primary">+91-866-2574010</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Operations</span>
                <span className="text-sm text-primary">+91-866-2574020</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Administration</span>
                <span className="text-sm text-primary">+91-866-2574030</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Public Relations</span>
                <span className="text-sm text-primary">+91-866-2574040</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ContactScreen;