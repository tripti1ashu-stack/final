import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  HelpCircle,
  Settings,
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  Award,
  Mic,
  MicOff,
  Volume2,
  VolumeOff,
  Clock,
  Target,
  Zap,
  Users,
  Brain,
  Heart,
  TrendingUp,
  Plus,
  Calendar,
  Save,
  Edit3,
  Star,
  AlertTriangle,
  Phone,
  MessageSquare,
  BookOpen,
  Timer,
  Badge as BadgeIcon,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";

interface MentalGymProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Scenario {
  id: string;
  title: string;
  category: 'academic' | 'social' | 'professional' | 'health' | 'institutional';
  severity: 'low' | 'medium' | 'high';
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completions: number;
}

interface ResponseAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  refinedResponse: string;
  microSkills: MicroSkill[];
}

interface MicroSkill {
  id: string;
  title: string;
  description: string;
  duration: number;
}

interface SessionRecord {
  id: string;
  scenarioId: string;
  response: string;
  score: number;
  timestamp: Date;
  improvements: string[];
}

const scenarios: Scenario[] = [
  {
    id: 'exam-failure',
    title: 'Failed Important Exam',
    category: 'academic',
    severity: 'high',
    description: 'You fail an important exam and are blamed by peers for bringing down the group average. How do you cope?',
    estimatedTime: 5,
    difficulty: 'intermediate',
    completions: 127
  },
  {
    id: 'privacy-breach',
    title: 'Friend Shares Private Info',
    category: 'social',
    severity: 'medium',
    description: 'A friend shares private information from your chat publicly at college. How do you respond?',
    estimatedTime: 4,
    difficulty: 'beginner',
    completions: 89
  },
  {
    id: 'last-minute-presentation',
    title: 'Unprepared Presentation',
    category: 'professional',
    severity: 'high',
    description: 'You\'re asked to present at the last minute despite being completely unprepared. What do you do?',
    estimatedTime: 6,
    difficulty: 'advanced',
    completions: 156
  },
  {
    id: 'suicidal-expression',
    title: 'Friend Expresses Suicidal Thoughts',
    category: 'health',
    severity: 'high',
    description: 'You see someone expressing suicidal thoughts in a group chat. How do you help while protecting yourself?',
    estimatedTime: 8,
    difficulty: 'advanced',
    completions: 43
  },
  {
    id: 'campus-harassment',
    title: 'Senior Harassment',
    category: 'institutional',
    severity: 'high',
    description: 'You face harassment by a senior on campus but reporting feels risky for your future. How do you handle this?',
    estimatedTime: 7,
    difficulty: 'advanced',
    completions: 71
  }
];

const programs = [
  { id: 'adaptive', name: 'Adaptive Plan', description: 'Personalized training path' },
  { id: 'quick', name: 'Quick Drills', description: '3-5 min exercises' },
  { id: 'roleplay', name: 'Roleplay Sessions', description: 'Interactive scenarios' },
  { id: 'timed', name: 'Timed Challenges', description: 'Pressure training' },
  { id: 'reflection', name: 'Reflection Journal', description: 'Process experiences' }
];

const microSkills: MicroSkill[] = [
  { id: 'breath', title: '2-second breath', description: 'Take a pause before responding', duration: 1 },
  { id: 'i-statement', title: 'I-statement script', description: 'Express feelings without blame', duration: 2 },
  { id: 'boundary', title: 'Boundary-setting phrases', description: 'Learn to say no effectively', duration: 3 },
  { id: 'active-listening', title: 'Active listening', description: 'Show understanding before responding', duration: 2 }
];

export function MentalGym({ onBack, currentLanguage }: MentalGymProps) {
  const [currentView, setCurrentView] = useState<'home' | 'session' | 'feedback' | 'roleplay'>('home');
  const [selectedProgram, setSelectedProgram] = useState('adaptive');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [responseMode, setResponseMode] = useState<'type' | 'speak' | 'choose'>('type');
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<ResponseAnalysis | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>([]);
  const [resilienceIndex, setResilienceIndex] = useState(72);
  const [streak, setStreak] = useState(7);
  const [xpPoints, setXpPoints] = useState(1250);
  const [badges, setBadges] = useState(8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const processingRef = useRef<NodeJS.Timeout | null>(null);

  // Mock AI analysis function
  const analyzeResponse = async (response: string, scenario: Scenario): Promise<ResponseAnalysis> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAnalysis: ResponseAnalysis = {
          score: Math.floor(Math.random() * 40) + 60, // 60-100 range
          summary: "Thoughtful approach with good emotional regulation, but could benefit from more assertive communication.",
          strengths: [
            "Showed empathy and understanding",
            "Remained calm under pressure", 
            "Considered multiple perspectives"
          ],
          improvements: [
            "Could be more assertive in communication",
            "Missing specific action steps",
            "Consider potential escalation scenarios"
          ],
          refinedResponse: "I understand this is frustrating. I'd like to discuss this privately first to understand your perspective, then we can work together on a solution that works for everyone.",
          microSkills: [
            microSkills[Math.floor(Math.random() * microSkills.length)],
            microSkills[Math.floor(Math.random() * microSkills.length)]
          ]
        };
        resolve(mockAnalysis);
      }, 2000);
    });
  };

  const handleSubmitResponse = async () => {
    if (!userResponse.trim() || !selectedScenario) return;
    
    // Check for crisis indicators
    const crisisKeywords = ['hurt myself', 'end it all', 'no point', 'kill myself'];
    if (crisisKeywords.some(keyword => userResponse.toLowerCase().includes(keyword))) {
      setShowEscalation(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      const analysisResult = await analyzeResponse(userResponse, selectedScenario);
      setAnalysis(analysisResult);
      
      // Add to session history
      const newRecord: SessionRecord = {
        id: Date.now().toString(),
        scenarioId: selectedScenario.id,
        response: userResponse,
        score: analysisResult.score,
        timestamp: new Date(),
        improvements: analysisResult.improvements
      };
      setSessionHistory(prev => [newRecord, ...prev.slice(0, 9)]);
      
      // Update resilience index
      setResilienceIndex(prev => Math.min(100, prev + Math.floor(analysisResult.score / 20)));
      setXpPoints(prev => prev + 25);
      
      setCurrentView('feedback');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTryAgain = () => {
    setUserResponse('');
    setAnalysis(null);
    setCurrentView('session');
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setUserResponse('');
    setAnalysis(null);
    setCurrentView('session');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'social': return '👥';
      case 'professional': return '💼';
      case 'health': return '🏥';
      case 'institutional': return '🏛️';
      default: return '🎯';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showEscalation) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Alert className="border-red-200 bg-red-50 mb-6">
            <Heart className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              We're concerned about your wellbeing. You're not alone, and support is available.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call Helpline (24/7)
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with Counselor
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setShowEscalation(false)}
            >
              I'm okay, continue training
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentView === 'feedback' && analysis && selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F7FA] to-white">
        {/* Header */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('session')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">AI Feedback</h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <HelpCircle className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(101, 127, 164, 0.2)" strokeWidth="6" fill="none" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  stroke="#AED6D2" 
                  strokeWidth="6" 
                  fill="none"
                  strokeDasharray={`${analysis.score * 2.83} 283`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#657FA4]">{analysis.score}</span>
                <span className="text-xs text-[#5C5C5C]">Resilience Score</span>
              </div>
            </div>
            <p className="text-[#2E2E2E] mb-6">{analysis.summary}</p>
          </motion.div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800 text-sm flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-green-700 text-sm flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-800 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                      <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Refined Response */}
          <Card className="bg-[#AED6D2]/10 border-[#AED6D2]/30">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] text-sm">Refined Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#2E2E2E] leading-relaxed">{analysis.refinedResponse}</p>
            </CardContent>
          </Card>

          {/* Micro Skills */}
          <div>
            <h3 className="text-[#2E2E2E] mb-3">Practice These Micro-Skills</h3>
            <div className="space-y-3">
              {analysis.microSkills.map((skill) => (
                <Card key={skill.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[#2E2E2E] font-semibold">{skill.title}</h4>
                        <p className="text-[#5C5C5C] text-sm">{skill.description}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-[#5C5C5C]" />
                          <span className="text-xs text-[#5C5C5C]">{skill.duration} min</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                        Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
              onClick={handleTryAgain}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save to Journal
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Routine
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'session' && selectedScenario) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('home')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Training Session</h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <HelpCircle className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Scenario Header */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{getCategoryIcon(selectedScenario.category)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSeverityColor(selectedScenario.severity)} variant="secondary">
                      {selectedScenario.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedScenario.category}
                    </Badge>
                  </div>
                  <h3 className="text-[#2E2E2E] font-semibold mb-2">{selectedScenario.title}</h3>
                  <p className="text-[#5C5C5C] leading-relaxed">{selectedScenario.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{selectedScenario.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{selectedScenario.completions} completed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Input */}
          <Card className="border-[#AED6D2]/30">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">How would you cope with this situation?</CardTitle>
              <p className="text-[#5C5C5C] text-sm">Be specific — mention what you would say and do.</p>
            </CardHeader>
            <CardContent>
              <Tabs value={responseMode} onValueChange={(value) => setResponseMode(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="type">Type</TabsTrigger>
                  <TabsTrigger value="speak">Speak</TabsTrigger>
                  <TabsTrigger value="choose">Choose</TabsTrigger>
                </TabsList>
                
                <TabsContent value="type" className="mt-4">
                  <Textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="Describe how you would handle this situation..."
                    className="min-h-32"
                  />
                </TabsContent>
                
                <TabsContent value="speak" className="mt-4">
                  <div className="text-center py-8">
                    <Button
                      size="lg"
                      className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#AED6D2] hover:bg-[#8BAAC6]'} text-white`}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </Button>
                    <p className="text-[#5C5C5C] text-sm mt-4">
                      {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="choose" className="mt-4">
                  <div className="space-y-3">
                    <p className="text-[#5C5C5C] text-sm">Choose your initial response:</p>
                    {[
                      "I would stay calm and think before reacting",
                      "I would immediately address the situation head-on", 
                      "I would seek advice from someone I trust first"
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-3"
                        onClick={() => setUserResponse(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 space-y-3">
                <Button 
                  className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                  onClick={handleSubmitResponse}
                  disabled={!userResponse.trim() || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      AI Coach is analyzing...
                    </>
                  ) : (
                    'Submit Response'
                  )}
                </Button>
                
                <Button variant="ghost" size="sm" className="w-full text-[#657FA4]">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Need a hint?
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Processing Animation */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#AED6D2] rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-[#657FA4] animate-pulse" />
              </div>
              <p className="text-[#5C5C5C]">AI Coach is analyzing your response...</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -56 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        
        <h2 className="flex-1 text-white text-center font-semibold">Mental Gym</h2>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Settings className="w-4 h-4 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Accessibility Settings</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Voice Guidance</p>
                  <p className="text-sm text-[#5C5C5C]">Spoken feedback and instructions</p>
                </div>
                <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">High Contrast</p>
                  <p className="text-sm text-[#5C5C5C]">Enhanced visual contrast</p>
                </div>
                <Switch checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Hero Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#657FA4] to-[#8BAAC6] rounded-2xl flex items-center justify-center text-2xl">
                  🎭
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[#2E2E2E] mb-1">Start 3-min Roleplay</h3>
                  <p className="text-[#5C5C5C] text-sm mb-3">Practice real-life scenarios</p>
                  <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>{streak} day streak</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Quick Assess</Badge>
                  </div>
                </div>
                
                <Button 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] h-11 px-6"
                  onClick={() => startScenario(scenarios[0])}
                >
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Program Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {programs.map((program) => (
              <Button
                key={program.id}
                variant={selectedProgram === program.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedProgram === program.id 
                    ? 'bg-[#657FA4] hover:bg-[#8BAAC6] text-white' 
                    : 'hover:bg-[#F4F7FA]'
                }`}
                onClick={() => setSelectedProgram(program.id)}
              >
                {program.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Progress Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#657FA4]">{resilienceIndex}</div>
                  <div className="text-[#5C5C5C] text-sm">Resilience Index</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-[#657FA4]">{streak}</span>
                    <span className="text-xl">🔥</span>
                  </div>
                  <div className="text-[#5C5C5C] text-sm">day streak</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Award className="w-6 h-6 text-[#5BB97E]" />
                    <span className="text-2xl font-bold text-[#657FA4]">{badges}</span>
                  </div>
                  <div className="text-[#5C5C5C] text-sm">badges</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scenario Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Practice Scenarios</h3>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getCategoryIcon(scenario.category)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(scenario.severity)} variant="secondary">
                          {scenario.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {scenario.category}
                        </Badge>
                      </div>
                      <h4 className="text-[#2E2E2E] font-semibold mb-1">{scenario.title}</h4>
                      <p className="text-[#5C5C5C] text-sm mb-3 line-clamp-2">{scenario.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{scenario.estimatedTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{scenario.completions} completed</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {scenario.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                      onClick={() => startScenario(scenario)}
                    >
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Session History Preview */}
        {sessionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-[#2E2E2E] mb-3">Recent Sessions</h3>
            <div className="space-y-2">
              {sessionHistory.slice(0, 3).map((record) => {
                const scenario = scenarios.find(s => s.id === record.scenarioId);
                return (
                  <Card key={record.id} className="bg-[#F4F7FA] border-0">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold">{scenario?.title}</p>
                          <p className="text-[#5C5C5C] text-xs">{record.timestamp.toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#657FA4]">{record.score}</div>
                          <div className="text-xs text-[#5C5C5C]">score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Footer Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 pb-20"
        >
          <Button variant="outline" className="w-full">
            <Calendar className="w-4 h-4 mr-2" />
            Add to Routine
          </Button>
          <div className="text-xs text-[#5C5C5C] space-x-4">
            <button className="hover:text-[#657FA4]">How it works</button>
            <span>•</span>
            <button className="hover:text-[#657FA4]">Safety & Support</button>
            <span>•</span>
            <button className="hover:text-[#657FA4]">Feedback</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}