import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { 
  ArrowLeft, 
  MessageCircle,
  Video,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  Star,
  Shield,
  AlertTriangle,
  Send,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  User,
  Globe,
  Accessibility,
  CheckCircle2,
  Users,
  Heart,
  Brain,
  Target,
  Award,
  FileText,
  Download,
  Share,
  Bookmark,
  Eye,
  EyeOff
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface ConnectToExpertProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Expert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  sessions: number;
  languages: string[];
  nextAvailable: string;
  bio: string;
  verified: boolean;
  online: boolean;
  price?: string;
}

const expertProfile: Expert = {
  id: '1',
  name: 'Dr. Priya Sharma',
  title: 'Licensed Clinical Psychologist',
  specialties: ['Anxiety', 'Academic Stress', 'Teen Mental Health', 'Crisis Support'],
  rating: 4.9,
  sessions: 342,
  languages: ['English', 'Hindi', 'Tamil'],
  nextAvailable: 'Available now',
  bio: 'Specializing in student mental health with 12+ years experience. Expert in cognitive-behavioral therapy and mindfulness techniques.',
  verified: true,
  online: true,
  price: 'Free for students'
};

const connectionModes = [
  { id: 'chat', label: 'Chat', icon: MessageCircle, description: 'Text-based conversation' },
  { id: 'voice', label: 'Voice', icon: Phone, description: 'Audio call' },
  { id: 'video', label: 'Video', icon: Video, description: 'Video call with screen sharing' }
];

const reasonSuggestions = [
  'Exam stress and anxiety',
  'Sleep and concentration issues', 
  'Social anxiety and loneliness',
  'Family relationship concerns',
  'Academic pressure and burnout',
  'Identity and self-esteem questions',
  'Crisis support needed'
];

const sessionLengths = ['15 min', '30 min', '45 min'];

export function ConnectToExpert({ onBack, currentLanguage }: ConnectToExpertProps) {
  const [connectionType, setConnectionType] = useState<'now' | 'schedule' | null>(null);
  const [selectedMode, setSelectedMode] = useState('chat');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [reason, setReason] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [allowRecording, setAllowRecording] = useState(false);
  const [emergencyCheck, setEmergencyCheck] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'searching' | 'found' | 'connecting' | 'connected'>('searching');
  const [queuePosition, setQueuePosition] = useState(2);
  const [estimatedWait, setEstimatedWait] = useState(45);
  const [showSession, setShowSession] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionLength, setSessionLength] = useState('30 min');
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false);

  // Session state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'expert', message: 'Hello! I\'m Dr. Priya Sharma. I\'m here to support you. How are you feeling today?', time: '10:30 AM' },
    { sender: 'system', message: 'This is a safe, confidential space. You can share what\'s on your mind.', time: '10:30 AM' }
  ]);
  const [chatMessage, setChatMessage] = useState('');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [volume, setVolume] = useState(80);

  // Connection simulation
  useEffect(() => {
    if (!isConnecting) return;

    const stages = [
      { status: 'searching', duration: 2000 },
      { status: 'found', duration: 1500 },
      { status: 'connecting', duration: 1000 },
      { status: 'connected', duration: 0 }
    ];

    let currentStage = 0;
    const nextStage = () => {
      if (currentStage < stages.length - 1) {
        setConnectionStatus(stages[currentStage].status as any);
        currentStage++;
        setTimeout(nextStage, stages[currentStage - 1].duration);
      } else {
        setConnectionStatus('connected');
        setShowSession(true);
        setIsConnecting(false);
      }
    };

    nextStage();
  }, [isConnecting]);

  // Session timer
  useEffect(() => {
    if (!showSession) return;

    const interval = setInterval(() => {
      setSessionTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showSession]);

  const handleConnectNow = () => {
    if (emergencyCheck) {
      setShowEmergencyModal(true);
      return;
    }
    
    setConnectionType('now');
    setIsConnecting(true);
  };

  const handleSchedule = () => {
    setConnectionType('schedule');
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      sender: 'student',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate expert response
    setTimeout(() => {
      const responses = [
        "I understand that you're going through a difficult time. Can you tell me more about what's been happening?",
        "Thank you for sharing that with me. It takes courage to reach out. What would be most helpful for you right now?",
        "I can hear that this is really affecting you. Let's work together to find some strategies that might help.",
        "That sounds very challenging. You're not alone in feeling this way. Let's explore some coping techniques."
      ];
      
      const response = {
        sender: 'expert',
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleScheduleSubmit = () => {
    setShowScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleSuccess(false);
      onBack();
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  if (showSession) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Session Header */}
        <div className="bg-[#657FA4] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-white text-[#657FA4]">PS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Dr. Priya Sharma</h3>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>In session • {formatTime(sessionTimer)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAnonymous && (
              <Badge className="bg-white/20 text-white border-white/30">
                Anonymous
              </Badge>
            )}
            {allowRecording && (
              <Badge className="bg-red-500 text-white">
                Recording
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => setShowSession(false)}>
              End Session
            </Button>
          </div>
        </div>

        {/* Video Area (if video mode) */}
        {selectedMode === 'video' && (
          <div className="h-64 bg-gray-900 flex items-center justify-center relative">
            <div className="text-white text-center">
              <div className="w-24 h-24 bg-[#AED6D2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#2E2E2E]">PS</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Dr. Priya Sharma</h4>
              <p className="text-white/80">Licensed Clinical Psychologist</p>
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className={isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-white/20 hover:bg-white/30'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={!isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-white/20 hover:bg-white/30'}
              >
                {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4 max-w-2xl mx-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${
                  msg.sender === 'student' ? 'justify-end' : 
                  msg.sender === 'system' ? 'justify-center' : 'justify-start'
                }`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'student' 
                      ? 'bg-[#657FA4] text-white' 
                      : msg.sender === 'system'
                      ? 'bg-gray-100 text-gray-600 text-sm'
                      : 'bg-[#F4F7FA] text-[#2E2E2E]'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'student' ? 'text-white/70' : 'text-[#5C5C5C]'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                  onClick={handleSendMessage}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#657FA4] border-b border-[#8BAAC6]/20 z-10">
        <div className="flex items-center justify-between p-4 h-14">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-white">
                <h2 className="font-semibold">Connect — Expert</h2>
                {isAnonymous && (
                  <p className="text-xs text-white/80">Anonymous Mode: ON</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Globe className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Expert Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-[#657FA4] border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E] text-xl">PS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#2E2E2E]">{expertProfile.name}</h3>
                    {expertProfile.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {expertProfile.online && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-[#5C5C5C] mb-2">{expertProfile.title}</p>
                  <p className="text-sm text-[#5C5C5C] mb-3">{expertProfile.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold">{expertProfile.rating}</span>
                      <span className="text-xs text-[#5C5C5C]">({expertProfile.sessions} sessions)</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-[#5C5C5C]">Languages: </span>
                      <span className="font-semibold">{expertProfile.languages.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {expertProfile.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#657FA4]" />
                    <span className="text-sm font-semibold text-green-600">{expertProfile.nextAvailable}</span>
                    {expertProfile.price && (
                      <Badge className="bg-blue-100 text-blue-800 ml-2">
                        {expertProfile.price}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="h-16 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] flex flex-col gap-1"
              onClick={handleConnectNow}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Connect Now</span>
              <span className="text-xs opacity-80">Fastest</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-1"
              onClick={handleSchedule}
            >
              <CalendarIcon className="w-5 h-5" />
              <span className="font-semibold">Schedule Session</span>
              <span className="text-xs opacity-80">Plan ahead</span>
            </Button>
          </div>
        </motion.div>

        {connectionType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-[#F4F7FA] border-0">
              <CardHeader>
                <CardTitle>
                  {connectionType === 'now' ? 'Connect Now' : 'Schedule Session'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mode Selection */}
                <div>
                  <Label className="text-sm font-semibold text-[#2E2E2E] mb-3 block">
                    Choose Communication Mode
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    {connectionModes.map((mode) => (
                      <Button
                        key={mode.id}
                        variant={selectedMode === mode.id ? 'default' : 'outline'}
                        className={`justify-start h-auto p-3 ${
                          selectedMode === mode.id ? 'bg-[#657FA4]' : ''
                        }`}
                        onClick={() => setSelectedMode(mode.id)}
                      >
                        <mode.icon className="w-4 h-4 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">{mode.label}</div>
                          <div className="text-xs opacity-80">{mode.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                    Preferred Language
                  </Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {expertProfile.languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reason (Optional) */}
                <div>
                  <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                    Brief reason (optional)
                  </Label>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="I'm feeling anxious about exams"
                    className="text-sm"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {reasonSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1"
                        onClick={() => setReason(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                {connectionType === 'schedule' && (
                  <>
                    {/* Date Selection */}
                    <div>
                      <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                        Select Date
                      </Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                        Select Time
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Session Length */}
                    <div>
                      <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                        Session Length
                      </Label>
                      <Select value={sessionLength} onValueChange={setSessionLength}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sessionLengths.map((length) => (
                            <SelectItem key={length} value={length}>
                              {length}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Privacy Settings */}
                <div className="space-y-3 p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Stay anonymous (recommended)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="recording" 
                      checked={allowRecording}
                      onCheckedChange={setAllowRecording}
                    />
                    <Label htmlFor="recording" className="text-sm">
                      Allow recording for clinical notes
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="emergency" 
                      checked={emergencyCheck}
                      onCheckedChange={setEmergencyCheck}
                    />
                    <Label htmlFor="emergency" className="text-sm text-red-600">
                      I feel I am at immediate risk
                    </Label>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white h-12"
                  onClick={connectionType === 'now' ? handleConnectNow : handleScheduleSubmit}
                  disabled={connectionType === 'schedule' && (!selectedDate || !selectedTime)}
                >
                  {connectionType === 'now' ? 'Connect Now' : 'Schedule Session'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Context Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-3">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Privacy First</h4>
                </div>
                <p className="text-sm text-green-700">
                  All sessions are encrypted and confidential. You remain anonymous unless you choose to share your identity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Expected Wait</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Current wait time: ~{estimatedWait} seconds. Peak hours: 2-6 PM weekdays.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Alternative Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 bg-[#F4F7FA]">
            <CardHeader>
              <CardTitle className="text-sm">Other Support Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Connect to Volunteer
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Peer Support Room
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Brain className="w-4 h-4 mr-2" />
                AI Chatbot (Immediate)
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <div className="text-center space-y-2 pt-4">
          <div className="flex justify-center gap-4 text-xs text-[#5C5C5C]">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              Consent Details
            </Button>
            <Button variant="link" size="sm" className="text-xs p-0 h-auto text-red-600">
              Emergency Help
            </Button>
          </div>
        </div>
      </div>

      {/* Connecting Modal */}
      <Dialog open={isConnecting} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Connecting to Expert</DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-6">
            <div className="w-16 h-16 border-4 border-[#AED6D2] border-t-[#657FA4] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="space-y-2">
              <p className="font-semibold text-[#2E2E2E]">
                {connectionStatus === 'searching' && 'Finding the best expert for you...'}
                {connectionStatus === 'found' && 'Expert found! Dr. Priya Sharma'}
                {connectionStatus === 'connecting' && 'Connecting to session...'}
              </p>
              <p className="text-sm text-[#5C5C5C]">
                {connectionStatus === 'searching' && `You are #${queuePosition} in queue • ~${estimatedWait}s`}
                {connectionStatus === 'found' && 'Preparing secure session...'}
                {connectionStatus === 'connecting' && 'Almost ready...'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsConnecting(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
            >
              Send Message & Leave
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Immediate Support Needed
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-[#2E2E2E]">
              We detected that you might need immediate support. Your safety is our priority.
            </p>
            
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Services
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect to Crisis Volunteer
              </Button>
              <Button variant="outline" className="w-full">
                I'm OK - Continue to Expert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Success Modal */}
      <Dialog open={showScheduleSuccess} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Session Scheduled!</h3>
            <p className="text-sm text-[#5C5C5C]">
              Your session with Dr. Priya Sharma has been scheduled for {selectedDate?.toDateString()} at {selectedTime}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}