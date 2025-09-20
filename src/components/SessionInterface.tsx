import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Video, 
  Phone, 
  MessageCircle,
  Mic,
  MicOff,
  VideoOff,
  Camera,
  Settings,
  AlertTriangle,
  Clock,
  FileText,
  Send,
  PauseCircle,
  PlayCircle,
  StopCircle,
  Edit3,
  Save,
  Download,
  Volume2,
  VolumeX,
  User,
  Brain,
  Heart,
  Target,
  Activity,
  Zap,
  CheckCircle2,
  XCircle,
  Shield,
  Search,
  Plus,
  MoreVertical,
  ChevronRight,
  Eye,
  Lightbulb,
  Timer,
  Users,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface SessionInterfaceProps {
  onBack: () => void;
  currentLanguage: string;
  showClientContext?: boolean;
}

interface ClientInfo {
  anonymousId: string;
  riskScore: number;
  consentStatus: 'anonymous' | 'identified';
  preferredLanguage: string;
  sessionHistory: number;
  lastCheckIns: string[];
  flaggedKeywords: string[];
}

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface Intervention {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'grounding' | 'breathing' | 'cognitive' | 'safety';
  icon: React.ComponentType<any>;
}

const clientInfo: ClientInfo = {
  anonymousId: 'Student_A318',
  riskScore: 78,
  consentStatus: 'anonymous',
  preferredLanguage: 'English',
  sessionHistory: 3,
  lastCheckIns: ['😰', '😔', '😐', '😊', '😔'],
  flaggedKeywords: ['panic', 'exam stress', 'sleepless', 'overwhelmed']
};

const quickInterventions: Intervention[] = [
  {
    id: '1',
    title: '5-4-3-2-1 Grounding',
    description: 'Sensory grounding exercise for anxiety',
    duration: '5 min',
    type: 'grounding',
    icon: Brain
  },
  {
    id: '2',
    title: 'Box Breathing',
    description: 'Structured breathing for immediate calm',
    duration: '3 min',
    type: 'breathing',
    icon: Heart
  },
  {
    id: '3',
    title: 'Thought Record',
    description: 'CBT worksheet for negative thoughts',
    duration: '10 min',
    type: 'cognitive',
    icon: Edit3
  },
  {
    id: '4',
    title: 'Safety Planning',
    description: 'Crisis management and coping strategies',
    duration: '15 min',
    type: 'safety',
    icon: Shield
  }
];

const aiSuggestions = [
  "You might say: 'I hear you — could you tell me more about when these feelings started?'",
  "Consider exploring: 'What specific thoughts go through your mind during panic episodes?'",
  "Suggested follow-up: 'Have you tried any coping strategies that helped before?'",
  "Safety check: 'On a scale of 1-10, how safe do you feel right now?'"
];

const sessionMetrics = {
  duration: '00:23:45',
  riskLevel: 'Medium',
  interventionsUsed: 2,
  progressNotes: 5
};

export function SessionInterface({ onBack, currentLanguage, showClientContext = true }: SessionInterfaceProps) {
  const [sessionMode, setSessionMode] = useState<'pre-session' | 'active' | 'ended'>('pre-session');
  const [selectedSessionType, setSelectedSessionType] = useState<'chat' | 'voice' | 'video'>('chat');
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [chatMessage, setChatMessage] = useState('');
  const [soapNotes, setSOAPNotes] = useState<SOAPNote>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [showEscalation, setShowEscalation] = useState(false);

  const chatMessages = [
    { sender: 'student', message: 'Hi Dr. Priya, I\'ve been having trouble sleeping before exams.', time: '10:05 AM' },
    { sender: 'professional', message: 'Thank you for sharing that with me. Can you tell me more about what happens when you try to sleep?', time: '10:06 AM' },
    { sender: 'student', message: 'My mind keeps racing with thoughts about failing and disappointing my parents.', time: '10:07 AM' },
    { sender: 'professional', message: 'That sounds really overwhelming. These racing thoughts before exams are quite common. Let\'s explore some ways to manage them.', time: '10:08 AM' }
  ];

  useEffect(() => {
    if (sessionStarted && !isPaused) {
      const timer = setInterval(() => {
        const now = new Date();
        const elapsed = new Date(now.getTime() - new Date().setHours(10, 5, 0, 0));
        setCurrentTime(elapsed.toISOString().substr(11, 8));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted, isPaused]);

  const startSession = () => {
    setSessionMode('active');
    setSessionStarted(true);
    if (recordingEnabled) {
      setIsRecording(true);
    }
  };

  const endSession = () => {
    setSessionMode('ended');
    setSessionStarted(false);
    setIsRecording(false);
  };

  const sendIntervention = (intervention: Intervention) => {
    // Send intervention to student
    setSelectedIntervention(intervention);
    // Add to chat or assign as homework
  };

  const updateSOAPNote = (section: keyof SOAPNote, value: string) => {
    setSOAPNotes(prev => ({ ...prev, [section]: value }));
  };

  if (sessionMode === 'pre-session') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#657FA4] border-b border-[#8BAAC6]/20">
          <div className="flex items-center justify-between p-4 h-14">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
            
            <div className="text-center">
              <h2 className="font-semibold text-white">Start Session</h2>
              <p className="text-xs text-white/80">{clientInfo.anonymousId}</p>
            </div>
            
            <div className="w-10"></div>
          </div>
        </div>

        <div className="p-6 max-w-md mx-auto space-y-6">
          {/* Pre-Session Consent & Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-[#657FA4] border-2">
              <CardHeader className="bg-[#657FA4] text-white">
                <CardTitle>Pre-Session Setup</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Session Mode Selection */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Session Mode</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['chat', 'voice', 'video'] as const).map((type) => (
                      <Button
                        key={type}
                        variant={selectedSessionType === type ? "default" : "outline"}
                        className={`h-auto p-4 flex flex-col gap-2 ${
                          selectedSessionType === type 
                            ? "bg-[#657FA4] hover:bg-[#657FA4]/90" 
                            : "hover:bg-[#F4F7FA]"
                        }`}
                        onClick={() => setSelectedSessionType(type)}
                      >
                        {type === 'chat' && <MessageCircle className="w-6 h-6" />}
                        {type === 'voice' && <Phone className="w-6 h-6" />}
                        {type === 'video' && <Video className="w-6 h-6" />}
                        <span className="text-sm capitalize">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Consent Information */}
                <div className="bg-[#F4F7FA] p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-[#2E2E2E] mb-2">Consent Summary</h4>
                  <div className="space-y-2 text-sm text-[#5C5C5C]">
                    <div className="flex items-center justify-between">
                      <span>Recording consent:</span>
                      <Badge className={recordingEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {recordingEnabled ? "Granted" : "Not granted"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Anonymity status:</span>
                      <Badge variant="outline">{clientInfo.consentStatus}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Session type:</span>
                      <span className="capitalize">{selectedSessionType}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Check */}
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-orange-800 mb-1">Risk Assessment</h4>
                      <p className="text-sm text-orange-700 mb-2">
                        Risk Index: {clientInfo.riskScore}/100 — High risk detected
                      </p>
                      <p className="text-xs text-orange-600">
                        Consider safety check at session start. Have emergency options ready.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recording Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold">Session Recording</Label>
                    <p className="text-xs text-[#5C5C5C]">Only if student has given consent</p>
                  </div>
                  <Switch
                    checked={recordingEnabled}
                    onCheckedChange={setRecordingEnabled}
                    disabled={clientInfo.consentStatus === 'anonymous'}
                  />
                </div>

                <div className="text-xs text-[#5C5C5C] space-y-1">
                  <p>• This session will be recorded only if the student has given consent.</p>
                  <p>• You can pause recording anytime during the session.</p>
                  <p>• All data is encrypted and stored securely.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={startSession}
                    className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                  >
                    Start Session
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (sessionMode === 'active') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Session Header */}
        <div className="sticky top-0 z-50 bg-[#657FA4] border-b border-[#8BAAC6]/20">
          <div className="flex items-center justify-between p-4 h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEscalation(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <AlertTriangle className="w-4 h-4" />
              </Button>
              
              <div className="text-white">
                <div className="font-semibold">{clientInfo.anonymousId}</div>
                <div className="text-xs text-white/80">
                  {selectedSessionType} • Risk: {clientInfo.riskScore}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-white text-center">
                <div className="font-mono text-sm">{currentTime}</div>
                <div className="text-xs text-white/80">
                  {isRecording && <span className="text-red-300">● REC</span>}
                </div>
              </div>
              
              <div className="flex gap-2">
                {selectedSessionType !== 'chat' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMicEnabled(!micEnabled)}
                      className={`text-white ${!micEnabled ? 'bg-red-600' : ''}`}
                    >
                      {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    
                    {selectedSessionType === 'video' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVideoEnabled(!videoEnabled)}
                        className={`text-white ${!videoEnabled ? 'bg-red-600' : ''}`}
                      >
                        {videoEnabled ? <Camera className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      </Button>
                    )}
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-white"
                >
                  {isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={endSession}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <StopCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Session Interface - Two Column Layout */}
        <div className="flex-1 flex flex-col">
          {/* Video/Voice Area */}
          {selectedSessionType !== 'chat' && (
            <div className="h-64 bg-gray-900 flex items-center justify-center relative">
              {selectedSessionType === 'video' ? (
                <div className="text-white text-center">
                  <Video className="w-12 h-12 mx-auto mb-2" />
                  <p>Video call active with {clientInfo.anonymousId}</p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <Phone className="w-12 h-12 mx-auto mb-2" />
                  <p>Voice call active with {clientInfo.anonymousId}</p>
                </div>
              )}
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                  {currentTime}
                </div>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="flex-1 flex">
            {/* Left Column - Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'professional' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'professional' 
                          ? 'bg-[#657FA4] text-white' 
                          : 'bg-[#F4F7FA] text-[#2E2E2E]'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'professional' ? 'text-white/70' : 'text-[#5C5C5C]'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Interventions Bar */}
              <div className="p-3 bg-[#F4F7FA] border-t border-[#E5E7EB]">
                <div className="flex gap-2 overflow-x-auto">
                  {quickInterventions.map((intervention) => (
                    <Button
                      key={intervention.id}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => sendIntervention(intervention)}
                    >
                      <intervention.icon className="w-3 h-3 mr-1" />
                      {intervention.title}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-[#E5E7EB]">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Send message
                        setChatMessage('');
                      }
                    }}
                  />
                  <Button 
                    className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                    onClick={() => setChatMessage('')}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Clinical Notes & Tools */}
            <div className="w-80 bg-[#F4F7FA] border-l border-[#E5E7EB] flex flex-col">
              {/* SOAP Notes Section */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div>
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-3">Clinical Notes (SOAP)</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-semibold">Subjective</Label>
                      <Textarea
                        value={soapNotes.subjective}
                        onChange={(e) => updateSOAPNote('subjective', e.target.value)}
                        placeholder="Patient's description of symptoms..."
                        className="text-xs min-h-16 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Objective</Label>
                      <Textarea
                        value={soapNotes.objective}
                        onChange={(e) => updateSOAPNote('objective', e.target.value)}
                        placeholder="Observable behaviors and findings..."
                        className="text-xs min-h-16 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Assessment</Label>
                      <Textarea
                        value={soapNotes.assessment}
                        onChange={(e) => updateSOAPNote('assessment', e.target.value)}
                        placeholder="Clinical impression and diagnosis..."
                        className="text-xs min-h-16 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Plan</Label>
                      <Textarea
                        value={soapNotes.plan}
                        onChange={(e) => updateSOAPNote('plan', e.target.value)}
                        placeholder="Treatment plan and next steps..."
                        className="text-xs min-h-16 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div>
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    AI Suggestions
                  </h3>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-2 bg-white rounded text-xs border">
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Session Metadata */}
                <div>
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-3">Session Info</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <div className="text-[#5C5C5C]">Duration</div>
                      <div className="font-semibold">{sessionMetrics.duration}</div>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <div className="text-[#5C5C5C]">Risk Level</div>
                      <div className="font-semibold">{sessionMetrics.riskLevel}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-[#E5E7EB] space-y-2">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Save className="w-3 h-3 mr-1" />
                    Draft
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Finalize
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-3 h-3 mr-1" />
                  Export Session Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Escalation Modal */}
        <Dialog open={showEscalation} onOpenChange={setShowEscalation}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Emergency Escalation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-[#5C5C5C]">
                Choose appropriate escalation action for this high-risk situation:
              </p>
              
              <div className="space-y-2">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Alert Campus Security
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Emergency Health
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Connect Crisis Counselor
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Notify Guardian (If Consented)
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEscalation(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                  Confirm Action
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Session ended state would go here
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#2E2E2E] mb-2">Session Completed</h2>
        <p className="text-[#5C5C5C] mb-4">Session notes have been saved securely.</p>
        <Button onClick={onBack} className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}