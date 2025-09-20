import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { 
  ArrowLeft, 
  PlayCircle,
  PauseCircle,
  Calendar,
  Clock,
  Users,
  Star,
  Heart,
  Brain,
  Volume2,
  VolumeX,
  MessageCircle,
  Video,
  Phone,
  Download,
  Share,
  Bookmark,
  Settings,
  Globe,
  Eye,
  Accessibility,
  Award,
  Target,
  TrendingUp,
  HelpCircle,
  Send,
  Mic,
  ThumbsUp,
  CheckCircle2,
  Timer,
  Headphones,
  BookOpen,
  Lightbulb
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface MindfulnessWorkshopProps {
  onBack: () => void;
  currentLanguage: string;
}

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mode: 'video' | 'audio' | 'hybrid';
  description: string;
  status: 'upcoming' | 'live' | 'completed';
}

interface OnDemandLesson {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technique: string;
  completed: boolean;
  description: string;
  audioUrl?: string;
}

const instructorProfile = {
  name: "Anita Rao",
  title: "Certified Mindfulness Facilitator",
  credentials: "MBSR Certified • 8+ years experience",
  languages: ["English", "Hindi", "Tamil"],
  rating: 4.9,
  sessions: 127,
  bio: "Specializing in stress reduction and emotional regulation for students and families.",
  verified: true
};

const liveSessions: LiveSession[] = [
  {
    id: '1',
    title: 'Morning Mindfulness for Students',
    instructor: 'Anita Rao',
    date: 'Today',
    time: '08:00 AM',
    duration: '30 min',
    capacity: 50,
    enrolled: 42,
    difficulty: 'Beginner',
    mode: 'video',
    description: 'Start your day with calm and focus through guided meditation',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Exam Stress Relief Session',
    instructor: 'Anita Rao',
    date: 'Tomorrow',
    time: '06:00 PM',
    duration: '45 min',
    capacity: 75,
    enrolled: 63,
    difficulty: 'Beginner',
    mode: 'hybrid',
    description: 'Techniques to manage exam anxiety and improve concentration',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Deep Relaxation Workshop',
    instructor: 'Anita Rao',
    date: 'Dec 24',
    time: '02:00 PM',
    duration: '60 min',
    capacity: 40,
    enrolled: 28,
    difficulty: 'Intermediate',
    mode: 'video',
    description: 'Advanced body scan and progressive muscle relaxation',
    status: 'upcoming'
  }
];

const onDemandLessons: OnDemandLesson[] = [
  {
    id: '1',
    title: '2-Min Breath Reset',
    duration: '2 min',
    difficulty: 'Beginner',
    technique: 'Box Breathing',
    completed: true,
    description: 'Quick breathing exercise for instant calm'
  },
  {
    id: '2',
    title: 'Body Scan Basics',
    duration: '8 min',
    difficulty: 'Beginner',
    technique: 'Body Awareness',
    completed: true,
    description: 'Learn to connect with your physical sensations'
  },
  {
    id: '3',
    title: 'Mindful Study Break',
    duration: '5 min',
    difficulty: 'Beginner',
    technique: 'Mindful Movement',
    completed: false,
    description: 'Reset your mind between study sessions'
  },
  {
    id: '4',
    title: 'Sleep Preparation',
    duration: '12 min',
    difficulty: 'Intermediate',
    technique: 'Progressive Relaxation',
    completed: false,
    description: 'Wind down for better sleep quality'
  },
  {
    id: '5',
    title: 'Anxiety Relief Practice',
    duration: '10 min',
    difficulty: 'Intermediate',
    technique: 'Grounding',
    completed: false,
    description: 'Calm anxious thoughts and feelings'
  },
  {
    id: '6',
    title: 'Advanced Concentration',
    duration: '15 min',
    difficulty: 'Advanced',
    technique: 'Single-Point Focus',
    completed: false,
    description: 'Develop sustained attention and focus'
  }
];

const workshopResources = [
  { title: "Mindfulness Quick Guide", type: "PDF", size: "2.1 MB" },
  { title: "Daily Practice Tracker", type: "PDF", size: "856 KB" },
  { title: "Breathing Techniques Audio", type: "MP3", size: "4.3 MB" },
  { title: "Meditation Timer Sounds", type: "ZIP", size: "12.7 MB" }
];

export function MindfulnessWorkshop({ onBack, currentLanguage }: MindfulnessWorkshopProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLiveSession, setShowLiveSession] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<OnDemandLesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([0.8]);
  const [showBreathingTimer, setShowBreathingTimer] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [preAssessment, setPreAssessment] = useState({ mood: '', stress: 5, focus: 5 });
  const [postAssessment, setPostAssessment] = useState({ mood: '', stress: 5, focus: 5 });
  const [showAssessment, setShowAssessment] = useState<'pre' | 'post' | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [liveChatMessages, setLiveChatMessages] = useState([
    { user: "Student_A", message: "This is really helping with my exam stress!", time: "10:32 AM", anonymous: true },
    { user: "Student_B", message: "Can you repeat the breathing pattern?", time: "10:34 AM", anonymous: true },
    { user: "Anita Rao", message: "Of course! It's 4 counts in, 4 counts hold, 4 counts out", time: "10:35 AM", anonymous: false, instructor: true }
  ]);

  const [sessionData, setSessionData] = useState({
    currentParticipants: 38,
    handsRaised: 3,
    pollActive: false,
    pollQuestion: "How calm do you feel right now?",
    pollOptions: ["Very calm", "Somewhat calm", "Neutral", "A bit stressed", "Very stressed"]
  });

  // Breathing timer effect
  useEffect(() => {
    if (!showBreathingTimer) return;

    const phases = [
      { name: 'inhale', duration: 4000 },
      { name: 'hold', duration: 4000 },
      { name: 'exhale', duration: 4000 },
      { name: 'pause', duration: 2000 }
    ];

    let currentPhaseIndex = 0;
    let startTime = Date.now();

    const updateBreathing = () => {
      const elapsed = Date.now() - startTime;
      const currentPhaseDuration = phases[currentPhaseIndex].duration;
      const progress = Math.min(elapsed / currentPhaseDuration, 1);

      setBreathingProgress(progress * 100);
      setBreathingPhase(phases[currentPhaseIndex].name as any);

      if (progress >= 1) {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        startTime = Date.now();
      }
    };

    const interval = setInterval(updateBreathing, 50);
    return () => clearInterval(interval);
  }, [showBreathingTimer]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-orange-100 text-orange-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'hybrid': return <Globe className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const joinLiveSession = (session: LiveSession) => {
    setShowLiveSession(true);
    setShowAssessment('pre');
  };

  const startBreathingPractice = () => {
    setShowBreathingTimer(true);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      user: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      anonymous: true
    };
    
    setLiveChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

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
                <h2 className="font-semibold">Mindfulness Workshop</h2>
                <p className="text-xs text-white/80">Calm in Minutes</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Globe className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Accessibility className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[#657FA4] to-[#8BAAC6] relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-xl font-bold mb-1">Speak. Listen. Connect.</h1>
                <p className="text-sm text-white/90">Practical, research-backed guidance to support your teen.</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex gap-3 mb-4">
                <Button 
                  className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                  onClick={startBreathingPractice}
                >
                  Start Practice
                </Button>
                <Button variant="outline" className="flex-1">
                  Take Quick Course
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="text-xs">
                  <div className="font-semibold text-[#2E2E2E]">8–15 min</div>
                  <div className="text-[#5C5C5C]">modules</div>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[#2E2E2E]">Live & Practice</div>
                  <div className="text-[#5C5C5C]">format</div>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[#2E2E2E]">Certificate</div>
                  <div className="text-[#5C5C5C]">on completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Module Filter Chips */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {['Overview', 'Live Sessions', 'On-demand', 'Resources', 'Reviews'].map((filter) => (
            <Button
              key={filter}
              variant={activeTab === filter.toLowerCase().replace('-', '') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(filter.toLowerCase().replace('-', ''))}
              className={`whitespace-nowrap ${
                activeTab === filter.toLowerCase().replace('-', '') ? 'bg-[#657FA4]' : ''
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="overview" className="space-y-6">
            {/* Workshop Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 bg-[#F4F7FA]">
                <CardHeader>
                  <CardTitle>Why Mindfulness?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[#5C5C5C]">
                    Learn practical exercises to reduce stress, improve focus, and build a daily calm routine. 
                    Suitable for students, parents, and staff dealing with academic pressure.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#657FA4]" />
                      <span className="text-sm">Better Focus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#657FA4]" />
                      <span className="text-sm">Stress Reduction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#657FA4]" />
                      <span className="text-sm">Emotional Balance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#657FA4]" />
                      <span className="text-sm">Better Sleep</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 bg-[#F4F7FA]">
                <CardHeader>
                  <CardTitle>Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E] text-lg">AR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#2E2E2E]">{instructorProfile.name}</h4>
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      </div>
                      <p className="text-sm text-[#5C5C5C] mb-2">{instructorProfile.title}</p>
                      <p className="text-xs text-[#5C5C5C] mb-2">{instructorProfile.credentials}</p>
                      <p className="text-xs text-[#5C5C5C] mb-3">{instructorProfile.bio}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{instructorProfile.rating}</span>
                        </div>
                        <div>{instructorProfile.sessions} sessions</div>
                        <div>Languages: {instructorProfile.languages.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 bg-[#F4F7FA]">
                <CardHeader>
                  <CardTitle>Quick Practice Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={startBreathingPractice}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    2-Min Breathing Reset
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    5-4-3-2-1 Grounding
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Timer className="w-4 h-4 mr-2" />
                    Meditation Timer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="livesessions" className="space-y-4">
            {liveSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="border-0 bg-[#F4F7FA]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#2E2E2E] mb-1">{session.title}</h4>
                        <p className="text-sm text-[#5C5C5C] mb-2">{session.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{session.date} • {session.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{session.enrolled}/{session.capacity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(session.difficulty)}>
                            {session.difficulty}
                          </Badge>
                          <div className="text-[#657FA4]">
                            {getModeIcon(session.mode)}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                          onClick={() => joinLiveSession(session)}
                        >
                          {session.status === 'live' ? 'Join Now' : 'Register'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Progress value={(session.enrolled / session.capacity) * 100} className="flex-1 mr-3" />
                      <span className="text-xs text-[#5C5C5C]">
                        {Math.round((session.enrolled / session.capacity) * 100)}% full
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="ondemand" className="space-y-4">
            <div className="grid gap-4">
              {onDemandLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card 
                    className="border-0 bg-[#F4F7FA] cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-[#657FA4] text-white'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <PlayCircle className="w-6 h-6" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#2E2E2E]">{lesson.title}</h4>
                            <Badge className={getDifficultyColor(lesson.difficulty)}>
                              {lesson.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#5C5C5C] mb-2">{lesson.description}</p>
                          <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>{lesson.technique}</span>
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card className="border-0 bg-[#F4F7FA]">
              <CardHeader>
                <CardTitle>Downloads & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workshopResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#657FA4] rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#2E2E2E]">{resource.title}</h5>
                        <p className="text-xs text-[#5C5C5C]">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card className="border-0 bg-[#F4F7FA]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Reviews & Ratings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-[#2E2E2E]">4.8</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-[#5C5C5C]">Based on 127 reviews</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Anonymous Student", rating: 5, comment: "The breathing exercises really helped me during exam week. Highly recommend!" },
                    { name: "Parent User", rating: 5, comment: "My daughter learned these techniques and her anxiety has improved significantly." },
                    { name: "Anonymous User", rating: 4, comment: "Great instructor and practical techniques. Would love more advanced sessions." }
                  ].map((review, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#2E2E2E]">{review.name}</span>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#5C5C5C]">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Persistent FAB */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <Button 
          className="w-14 h-14 rounded-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] shadow-lg"
          onClick={startBreathingPractice}
        >
          <Target className="w-6 h-6" />
        </Button>
      </div>

      {/* Breathing Timer Modal */}
      <Dialog open={showBreathingTimer} onOpenChange={setShowBreathingTimer}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>2-Minute Breathing Reset</DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#AED6D2]"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#657FA4] transition-all duration-1000"
                style={{
                  transform: `scale(${0.7 + (breathingProgress / 100) * 0.3})`,
                  opacity: 0.7 + (breathingProgress / 100) * 0.3
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#2E2E2E] capitalize">{breathingPhase}</div>
                  <div className="text-sm text-[#5C5C5C]">{Math.round(breathingProgress)}%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-[#5C5C5C]">
              <p>Follow the circle's rhythm</p>
              <p className="font-semibold">4 counts in • 4 counts hold • 4 counts out</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowBreathingTimer(false)} className="flex-1">
              Stop
            </Button>
            <Button 
              onClick={() => setShowBreathingTimer(false)} 
              className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
            >
              Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Session Modal */}
      <Dialog open={showLiveSession} onOpenChange={setShowLiveSession}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0">
          <div className="flex flex-col h-full">
            {/* Session Header */}
            <div className="bg-[#657FA4] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Morning Mindfulness for Students</h3>
                <p className="text-sm text-white/80">with Anita Rao • {formatTime(currentTime)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">LIVE</Badge>
                <Button variant="ghost" size="sm" onClick={() => setShowLiveSession(false)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Main Video Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-24 h-24 bg-[#AED6D2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-[#2E2E2E]">AR</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Anita Rao</h4>
                    <p className="text-white/80">Follow along with the guided breathing exercise</p>
                  </div>
                </div>

                {/* Session Controls */}
                <div className="p-4 bg-white border-t flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-[#5C5C5C]">
                    {sessionData.currentParticipants} participants
                  </div>
                </div>
              </div>

              {/* Right Panel - Chat & Interactions */}
              <div className="w-80 bg-[#F4F7FA] border-l flex flex-col">
                <div className="p-3 bg-white border-b">
                  <h4 className="font-semibold text-[#2E2E2E]">Live Chat</h4>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {liveChatMessages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg ${
                      msg.instructor ? 'bg-[#657FA4] text-white' : 'bg-white'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{msg.user}</span>
                        <span className="text-xs opacity-70">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-white border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask a question..."
                      className="flex-1 p-2 border rounded-lg text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button size="sm" onClick={sendChatMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assessment Modal */}
      <Dialog open={!!showAssessment} onOpenChange={() => setShowAssessment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {showAssessment === 'pre' ? 'Pre-Session Check-in' : 'Post-Session Reflection'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                How are you feeling?
              </label>
              <div className="flex gap-2">
                {['😔', '😐', '🙂', '😊', '😄'].map((mood, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-12 h-12 text-xl"
                    onClick={() => {
                      if (showAssessment === 'pre') {
                        setPreAssessment(prev => ({ ...prev, mood }));
                      } else {
                        setPostAssessment(prev => ({ ...prev, mood }));
                      }
                    }}
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                Stress Level (1-10)
              </label>
              <Slider
                value={showAssessment === 'pre' ? [preAssessment.stress] : [postAssessment.stress]}
                onValueChange={([value]) => {
                  if (showAssessment === 'pre') {
                    setPreAssessment(prev => ({ ...prev, stress: value }));
                  } else {
                    setPostAssessment(prev => ({ ...prev, stress: value }));
                  }
                }}
                max={10}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5C5C5C]">
                <span>Very calm</span>
                <span>Very stressed</span>
              </div>
            </div>

            <Button 
              onClick={() => setShowAssessment(null)}
              className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}