import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import namasteIcon from "@/assets/namaste-icon.png";

const LoginScreen = ({ onLogin }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to +91 ${phoneNumber}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome to Namaste Transit!",
        description: "Login successful",
      });
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src={namasteIcon} 
              alt="Namaste Transit" 
              className="w-full h-full filter opacity-80"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {step === 'phone' ? 'Welcome Back' : 'Verify Mobile'}
          </CardTitle>
          <p className="text-muted-foreground">
            {step === 'phone' 
              ? 'Enter your mobile number to continue' 
              : `Enter the 6-digit code sent to +91 ${phoneNumber}`
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10 text-lg py-6 bg-input border-border"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOtp}
                disabled={loading || !phoneNumber}
                className="w-full py-6 text-lg font-semibold bg-gradient-button hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </div>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send OTP
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-foreground">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl font-mono py-6 bg-input border-border tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button 
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="w-full py-6 text-lg font-semibold bg-gradient-button hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setStep('phone')}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                ← Change Phone Number
              </Button>
            </>
          )}

          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms & Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;