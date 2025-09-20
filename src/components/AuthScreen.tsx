import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Eye, EyeOff, ArrowLeft, Mail, Phone, Shield, Lock } from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

type UserRole = 'student' | 'official' | 'professional' | 'parent';
type AuthStep = 'credentials' | 'otp' | 'twofa';

interface AuthScreenProps {
  userRole: UserRole;
  onAuthComplete: () => void;
  onBack: () => void;
}

export function AuthScreen({ userRole, onAuthComplete, onBack }: AuthScreenProps) {
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayAnonymous, setStayAnonymous] = useState(true);
  
  // Form data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  const isOTPFlow = userRole === 'student' || userRole === 'parent';
  const requiresTwoFA = userRole === 'professional' || userRole === 'official';

  const handleCredentialSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isOTPFlow) {
        setAuthStep('otp');
      } else if (requiresTwoFA) {
        setAuthStep('twofa');
      } else {
        onAuthComplete();
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setIsLoading(true);
    setError("");

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any 6-digit OTP for demo purposes
    if (otp.length === 6) {
      onAuthComplete();
    } else {
      setError("Please enter a 6-digit OTP.");
    }
    
    setIsLoading(false);
  };

  const handleTwoFASubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAuthComplete();
    } catch (err) {
      setError("Invalid 2FA code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    const names = {
      student: 'Student',
      parent: 'Parent/Guardian',
      professional: 'Certified Professional',
      official: 'Official'
    };
    return names[role];
  };

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      student: '🎓',
      parent: '👨‍👩‍👧',
      professional: '👨‍⚕️',
      official: '🏛️'
    };
    return icons[role];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 h-14 border-b border-[#F4F7FA]">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
            <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-[#0F1722]">MindMitra</span>
        </div>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Role Badge */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#657FA4] to-[#8BAAC6] rounded-full flex items-center justify-center text-3xl">
            {getRoleIcon(userRole)}
          </div>
          <Badge variant="secondary" className="mb-2">
            {getRoleDisplayName(userRole)}
          </Badge>
          <h1 className="text-[#0F1722] mb-2">Welcome Back</h1>
          <p className="text-[#55707F] text-sm">
            {authStep === 'credentials' && 'Please sign in to continue'}
            {authStep === 'otp' && 'Enter the verification code sent to your device'}
            {authStep === 'twofa' && 'Enter your 2FA authentication code'}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="bg-[#F4F7FA] border-0">
          <CardContent className="p-6">
            {/* Credentials Step */}
            {authStep === 'credentials' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {isOTPFlow ? (
                  <>
                    {/* Mobile/Email input for Student/Parent */}
                    <div className="space-y-2">
                      <Label htmlFor="contact">Mobile Number or Email</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#55707F]" />
                        <Input
                          id="contact"
                          type="text"
                          placeholder="Enter mobile or email"
                          value={phone || email}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.includes('@')) {
                              setEmail(value);
                              setPhone('');
                            } else {
                              setPhone(value);
                              setEmail('');
                            }
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Anonymous toggle */}
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#657FA4]" />
                        <div>
                          <p className="text-sm text-[#0F1722]">Stay anonymous within app</p>
                          <p className="text-xs text-[#55707F]">Recommended for privacy</p>
                        </div>
                      </div>
                      <Switch checked={stayAnonymous} onCheckedChange={setStayAnonymous} />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Email/Password for Professional/Official */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#55707F]" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#55707F]" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleCredentialSubmit}
                  disabled={isLoading || (!email && !phone) || (!isOTPFlow && !password)}
                  className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  {isLoading ? "Verifying..." : isOTPFlow ? "Send OTP" : "Sign In"}
                </Button>
              </motion.div>
            )}

            {/* OTP Step */}
            {authStep === 'otp' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleOTPSubmit}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setAuthStep('credentials')}
                  className="w-full text-[#55707F]"
                >
                  Resend Code
                </Button>
              </motion.div>
            )}

            {/* 2FA Step */}
            {authStep === 'twofa' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="twofa">2FA Authentication Code</Label>
                  <Input
                    id="twofa"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleTwoFASubmit}
                  disabled={isLoading || twoFACode.length !== 6}
                  className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-[#55707F] text-xs leading-relaxed">
            Your data is anonymized unless you choose to reveal it for professional help.
            <br />
            <span className="underline cursor-pointer">Learn more about our privacy policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}