import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Globe,
  Settings,
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  Clock,
  Moon,
  Sun,
  Calendar,
  TrendingUp,
  Heart,
  Battery,
  Coffee,
  Smartphone,
  Eye,
  EyeOff,
  Plus,
  Minus,
  RotateCcw,
  CheckCircle2,
  Circle,
  HelpCircle,
  Zap,
  Droplets,
  Wind,
  Music,
  Timer,
  Target,
  BarChart3,
  BookOpen,
  Sparkles,
  Wifi,
  WifiOff,
  Save,
  Edit3,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SleepBetterProps {
  onBack: () => void;
  currentLanguage: string;
}

interface SleepData {
  score: number;
  lastNight: {
    duration: string;
    efficiency: number;
    deepSleep: string;
    bedTime: string;
    wakeTime: string;
    quality: number;
  };
  weeklyTrend: Array<{
    date: string;
    duration: number;
    quality: number;
  }>;
}

interface WinddownRoutine {
  id: string;
  title: string;
  duration: number;
  difficulty: string;
  steps: WinddownStep[];
  description: string;
}

interface WinddownStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'breathing' | 'relaxation' | 'meditation' | 'visualization';
  instruction: string;
}

interface Soundscape {
  id: string;
  name: string;
  category: string;
  duration: string;
  isPlaying: boolean;
  volume: number;
}

interface SleepLogEntry {
  date: string;
  bedTime: string;
  wakeTime: string;
  sleepLatency: number;
  awakenings: number;
  quality: number;
  caffeine: number;
  exercise: boolean;
  screenTime: number;
  notes: string;
}

const sleepData: SleepData = {
  score: 78,
  lastNight: {
    duration: "7h 12m",
    efficiency: 85,
    deepSleep: "1h 20m",
    bedTime: "11:30 PM",
    wakeTime: "6:42 AM",
    quality: 4
  },
  weeklyTrend: [
    { date: "Mon", duration: 7.2, quality: 4 },
    { date: "Tue", duration: 6.8, quality: 3 },
    { date: "Wed", duration: 7.5, quality: 4 },
    { date: "Thu", duration: 6.5, quality: 3 },
    { date: "Fri", duration: 7.1, quality: 4 },
    { date: "Sat", duration: 8.2, quality: 5 },
    { date: "Sun", duration: 7.8, quality: 4 }
  ]
};

const winddownRoutines: WinddownRoutine[] = [
  {
    id: 'quick-winddown',
    title: '10-min Wind-down',
    duration: 10,
    difficulty: 'Easy',
    description: 'Quick relaxation routine to prepare for sleep',
    steps: [
      { id: '1', title: 'Breathing', description: 'Deep breathing exercise', duration: 180, type: 'breathing', instruction: 'Take slow, deep breaths. Inhale for 4, hold for 4, exhale for 6.' },
      { id: '2', title: 'Progressive Relaxation', description: 'Release tension from your body', duration: 300, type: 'relaxation', instruction: 'Starting from your toes, tense and release each muscle group.' },
      { id: '3', title: 'Visualization', description: 'Imagine a peaceful place', duration: 120, type: 'visualization', instruction: 'Picture yourself in a calm, safe place. Notice the details around you.' }
    ]
  },
  {
    id: 'sleep-meditation',
    title: 'Guided Sleep Meditation',
    duration: 15,
    difficulty: 'Medium',
    description: 'Deeper meditation practice for better sleep quality',
    steps: [
      { id: '1', title: 'Body Scan', description: 'Full body awareness', duration: 480, type: 'meditation', instruction: 'Focus your attention on each part of your body, from head to toe.' },
      { id: '2', title: 'Breath Focus', description: 'Mindful breathing', duration: 360, type: 'breathing', instruction: 'Follow your natural breath without trying to change it.' },
      { id: '3', title: 'Letting Go', description: 'Release the day', duration: 240, type: 'meditation', instruction: 'Let thoughts come and go like clouds in the sky.' }
    ]
  },
  {
    id: 'pmr-routine',
    title: 'Progressive Muscle Relaxation',
    duration: 8,
    difficulty: 'Easy',
    description: 'Systematic muscle relaxation for physical tension release',
    steps: [
      { id: '1', title: 'Upper Body', description: 'Face, neck, shoulders', duration: 180, type: 'relaxation', instruction: 'Tense your facial muscles for 5 seconds, then release completely.' },
      { id: '2', title: 'Arms & Hands', description: 'Arms, hands, fingers', duration: 120, type: 'relaxation', instruction: 'Make fists, tense your arms, hold for 5 seconds, then let go.' },
      { id: '3', title: 'Lower Body', description: 'Torso, legs, feet', duration: 180, type: 'relaxation', instruction: 'Tense your leg muscles, hold briefly, then feel them become heavy and relaxed.' }
    ]
  }
];

const soundscapes: Soundscape[] = [
  { id: 'rain', name: 'Rain', category: 'Nature', duration: '60 min', isPlaying: false, volume: 50 },
  { id: 'ocean', name: 'Ocean Waves', category: 'Nature', duration: '45 min', isPlaying: false, volume: 50 },
  { id: 'forest', name: 'Forest', category: 'Nature', duration: '90 min', isPlaying: false, volume: 50 },
  { id: 'white-noise', name: 'White Noise', category: 'Ambient', duration: 'Continuous', isPlaying: false, volume: 50 },
  { id: 'brown-noise', name: 'Brown Noise', category: 'Ambient', duration: 'Continuous', isPlaying: false, volume: 50 },
  { id: 'pink-noise', name: 'Pink Noise', category: 'Ambient', duration: 'Continuous', isPlaying: false, volume: 50 }
];

const sleepHygieneChecklist = [
  { id: 'dim-lights', text: 'Dim lights 1h before bed', completed: true },
  { id: 'no-caffeine', text: 'Avoid caffeine after 4pm', completed: false },
  { id: 'screen-curfew', text: 'Screen curfew 30min before sleep', completed: true },
  { id: 'cool-room', text: 'Keep bedroom cool (65-68°F)', completed: true },
  { id: 'consistent-schedule', text: 'Consistent sleep schedule', completed: false },
  { id: 'comfortable-bed', text: 'Comfortable mattress & pillows', completed: true }
];

export function SleepBetter({ onBack, currentLanguage }: SleepBetterProps) {
  const [currentView, setCurrentView] = useState<'home' | 'session' | 'trends' | 'log'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoutine, setSelectedRoutine] = useState<WinddownRoutine | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSessionPaused, setIsSessionPaused] = useState(false);
  const [stepTimeLeft, setStepTimeLeft] = useState(0);
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [soundscapeVolume, setSoundscapeVolume] = useState([50]);
  const [autoFadeTime, setAutoFadeTime] = useState([30]);
  
  // Settings
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [healthKitSync, setHealthKitSync] = useState(false);
  const [sleepTimer, setSleepTimer] = useState(false);
  
  // Sleep logging
  const [logBedTime, setLogBedTime] = useState('23:30');
  const [logWakeTime, setLogWakeTime] = useState('06:30');
  const [logQuality, setLogQuality] = useState(4);
  const [logNotes, setLogNotes] = useState('');
  const [logCaffeine, setLogCaffeine] = useState(120);
  const [logScreenTime, setLogScreenTime] = useState(90);
  
  const [expandedHygiene, setExpandedHygiene] = useState(false);
  const [lastSync, setLastSync] = useState('2 hours ago');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 300 + 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentView === 'session' && !isSessionPaused && selectedRoutine && stepTimeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setStepTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next step
            if (currentStep < selectedRoutine.steps.length - 1) {
              setCurrentStep(prev => prev + 1);
              return selectedRoutine.steps[currentStep + 1].duration;
            } else {
              // Session complete
              completeSession();
              return 0;
            }
          }
          return prev - 1;
        });
        
        setSessionProgress(prev => {
          const totalTime = selectedRoutine.steps.reduce((total, step) => total + step.duration, 0);
          return Math.min(prev + (100 / totalTime), 100);
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentView, isSessionPaused, currentStep, stepTimeLeft, selectedRoutine]);

  const startWinddown = (routine: WinddownRoutine) => {
    setSelectedRoutine(routine);
    setCurrentView('session');
    setCurrentStep(0);
    setSessionProgress(0);
    setIsSessionPaused(false);
    setStepTimeLeft(routine.steps[0].duration);
  };

  const pauseSession = () => {
    setIsSessionPaused(true);
  };

  const resumeSession = () => {
    setIsSessionPaused(false);
  };

  const completeSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentView('home');
    
    // Show success notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('😴 Wind-down Complete!', {
        body: 'Great job! Your body is ready for sleep.',
        icon: '/icon-192x192.png'
      });
    }
  };

  const exitSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentView('home');
    setSelectedRoutine(null);
  };

  const toggleSoundscape = (soundscapeId: string) => {
    if (activeSoundscape === soundscapeId) {
      setActiveSoundscape(null);
    } else {
      setActiveSoundscape(soundscapeId);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSleepScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#5BB97E]';
    if (score >= 60) return 'text-[#F5B942]';
    return 'text-[#E35B5B]';
  };

  if (currentView === 'session' && selectedRoutine) {
    const currentStepData = selectedRoutine.steps[currentStep];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#657FA4] to-[#2E2E2E] flex flex-col">
        {/* Session Header */}
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm('Are you sure you want to exit the wind-down?')) {
                exitSession();
              }
            }}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h3 className="font-semibold">{selectedRoutine.title}</h3>
            <p className="text-sm opacity-80">Step {currentStep + 1} of {selectedRoutine.steps.length}</p>
          </div>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Session Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Progress Ring */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#AED6D2"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${sessionProgress * 2.83} 283`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <Moon className="w-12 h-12 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">{formatTime(stepTimeLeft)}</div>
                <div className="text-sm opacity-80">{Math.round(sessionProgress)}%</div>
              </motion.div>
            </div>
          </div>

          {/* Step Information */}
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center text-white mb-8 max-w-md"
          >
            <h3 className="text-xl font-semibold mb-2">{currentStepData.title}</h3>
            <p className="text-lg mb-4">{currentStepData.description}</p>
            <p className="text-sm opacity-80 leading-relaxed">{currentStepData.instruction}</p>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-6 mb-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={isSessionPaused ? resumeSession : pauseSession}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            >
              {isSessionPaused ? <Play className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Finish wind-down early?')) {
                  completeSession();
                }
              }}
              className="text-white/80 hover:text-white"
            >
              Finish Early
            </Button>
          </div>

          {/* Soundscape Controls */}
          {activeSoundscape && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">
                  {soundscapes.find(s => s.id === activeSoundscape)?.name}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSoundscape(null)}
                  className="text-white/80 hover:text-white"
                >
                  <VolumeX className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-white" />
                  <Slider
                    value={soundscapeVolume}
                    onValueChange={setSoundscapeVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white text-sm w-8">{soundscapeVolume[0]}%</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Timer className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">Auto-fade in {autoFadeTime[0]} min</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Voice & Captions */}
          {voiceGuidance && (
            <div className="flex items-center gap-2 mt-4 text-white/70 text-sm">
              <Volume2 className="w-4 h-4" />
              Voice guidance active
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'trends') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('home')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Sleep Trends</h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Weekly Chart */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end gap-2">
                {sleepData.weeklyTrend.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full flex flex-col gap-1 mb-2">
                      <div 
                        className="bg-[#657FA4] rounded-t"
                        style={{ height: `${(day.duration / 10) * 100}px` }}
                      />
                      <div 
                        className="bg-[#AED6D2] rounded-b"
                        style={{ height: `${(day.quality / 5) * 30}px` }}
                      />
                    </div>
                    <span className="text-xs text-[#5C5C5C]">{day.date}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#657FA4] rounded"></div>
                  <span className="text-[#5C5C5C]">Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#AED6D2] rounded"></div>
                  <span className="text-[#5C5C5C]">Quality</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="bg-gradient-to-r from-[#AED6D2]/10 to-[#8BAAC6]/10 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#657FA4]" />
                <h4 className="font-semibold text-[#2E2E2E]">AI Insights</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-[#2E2E2E] text-sm">
                    Your sleep drops by 45min on nights you consume more than 200mg caffeine after 4pm.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-[#2E2E2E] text-sm">
                    Try a 7-day wind-down plan — predicted +12% sleep efficiency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Correlation Factors */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Sleep Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-[#8BAAC6]" />
                    <span className="text-[#2E2E2E]">Caffeine Intake</span>
                  </div>
                  <Badge variant="outline" className="text-xs">-1.2h avg</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#8BAAC6]" />
                    <span className="text-[#2E2E2E]">Screen Time</span>
                  </div>
                  <Badge variant="outline" className="text-xs">-30min avg</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#8BAAC6]" />
                    <span className="text-[#2E2E2E]">Exercise</span>
                  </div>
                  <Badge className="bg-[#5BB97E] text-white text-xs">+45min avg</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'log') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('home')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Log Sleep</h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Save className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Quick Log */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Last Night's Sleep</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#2E2E2E] text-sm font-semibold">Bedtime</label>
                  <input
                    type="time"
                    value={logBedTime}
                    onChange={(e) => setLogBedTime(e.target.value)}
                    className="w-full p-2 bg-white rounded-lg border border-[#8BAAC6]/20 focus:ring-2 focus:ring-[#657FA4] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#2E2E2E] text-sm font-semibold">Wake time</label>
                  <input
                    type="time"
                    value={logWakeTime}
                    onChange={(e) => setLogWakeTime(e.target.value)}
                    className="w-full p-2 bg-white rounded-lg border border-[#8BAAC6]/20 focus:ring-2 focus:ring-[#657FA4] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm font-semibold">Sleep Quality</label>
                <div className="flex justify-between items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="lg"
                      onClick={() => setLogQuality(rating)}
                      className={`text-2xl ${rating <= logQuality ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      {rating <= logQuality ? '😴' : '😑'}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-[#5C5C5C]">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Factors */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm font-semibold">Caffeine Intake (mg)</label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[logCaffeine]}
                    onValueChange={(value) => setLogCaffeine(value[0])}
                    max={400}
                    step={20}
                    className="flex-1"
                  />
                  <span className="text-[#2E2E2E] w-12 text-sm">{logCaffeine}mg</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm font-semibold">Screen Time Before Bed (min)</label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[logScreenTime]}
                    onValueChange={(value) => setLogScreenTime(value[0])}
                    max={240}
                    step={15}
                    className="flex-1"
                  />
                  <span className="text-[#2E2E2E] w-12 text-sm">{logScreenTime}m</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm font-semibold">Notes</label>
                <Textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="How did you feel? Any factors that affected your sleep?"
                  className="bg-white border-[#8BAAC6]/20 focus:ring-2 focus:ring-[#657FA4]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] h-12">
            <Save className="w-5 h-5 mr-2" />
            Save Sleep Log
          </Button>

          {/* Health Integration */}
          {healthKitSync && (
            <Card className="bg-[#5BB97E]/10 border-[#5BB97E]/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#5BB97E]" />
                    <div>
                      <p className="text-[#2E2E2E] font-semibold">Auto-sync enabled</p>
                      <p className="text-[#5C5C5C] text-sm">Last sync: {lastSync}</p>
                    </div>
                  </div>
                  <Badge className="bg-[#5BB97E] text-white">Connected</Badge>
                </div>
              </CardContent>
            </Card>
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
        
        <h2 className="flex-1 text-white text-center font-semibold">Sleep Better</h2>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Globe className="w-4 h-4 text-white" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Settings className="w-4 h-4 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px]">
              <SheetHeader>
                <SheetTitle>Sleep Settings</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Voice Guidance</p>
                    <p className="text-sm text-[#5C5C5C]">Spoken instructions during wind-down</p>
                  </div>
                  <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Health Sync</p>
                    <p className="text-sm text-[#5C5C5C]">Connect with Apple Health/Google Fit</p>
                  </div>
                  <Switch checked={healthKitSync} onCheckedChange={setHealthKitSync} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Sleep Timer</p>
                    <p className="text-sm text-[#5C5C5C]">Auto-stop sounds when sleep detected</p>
                  </div>
                  <Switch checked={sleepTimer} onCheckedChange={setSleepTimer} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Hero Sleep Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  {isLoading ? (
                    <Skeleton className="w-24 h-24 rounded-full" />
                  ) : (
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="rgba(101, 127, 164, 0.2)" strokeWidth="6" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          stroke="#AED6D2" 
                          strokeWidth="6" 
                          fill="none"
                          strokeDasharray={`${sleepData.score * 2.83} 283`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-2xl font-bold ${getSleepScoreColor(sleepData.score)}`}>
                          {sleepData.score}
                        </span>
                        <span className="text-xs text-[#5C5C5C]">Sleep Score</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[#5C5C5C]">Last night</p>
                      <p className="text-[#2E2E2E] font-semibold">{sleepData.lastNight.duration}</p>
                    </div>
                    <div>
                      <p className="text-[#5C5C5C]">Efficiency</p>
                      <p className="text-[#2E2E2E] font-semibold">{sleepData.lastNight.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-[#5C5C5C]">Deep sleep</p>
                      <p className="text-[#2E2E2E] font-semibold">{sleepData.lastNight.deepSleep}</p>
                    </div>
                    <div>
                      <p className="text-[#5C5C5C]">Quality</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < sleepData.lastNight.quality ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] flex-1"
                  onClick={() => startWinddown(winddownRoutines[0])}
                >
                  Start Wind-Down
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setCurrentView('log')}
                >
                  Log Sleep
                </Button>
              </div>
              
              <p className="text-[#5C5C5C] text-xs mt-3 text-center">
                Tap Start for a guided wind-down routine or log last night's sleep.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sleep Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setCurrentView('trends')}
          >
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center justify-between">
                <span>Sleep Trends</span>
                <TrendingUp className="w-5 h-5 text-[#657FA4]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-16 flex items-end gap-1">
                {sleepData.weeklyTrend.map((day, index) => (
                  <div key={index} className="flex-1">
                    <div 
                      className="bg-[#8BAAC6] rounded-t w-full"
                      style={{ height: `${(day.duration / 10) * 40}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[#5C5C5C] text-sm mt-2">
                7-day average: 7h 15m • Tap for detailed insights
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Personalized Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-[#657FA4]" />
                <h4 className="font-semibold text-[#2E2E2E]">Today's Recommendation</h4>
              </div>
              <p className="text-[#2E2E2E] mb-3">
                Short wind-down: 10-minute breathing + soundscape
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">Based on late-night screen use</Badge>
                <Button 
                  size="sm" 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                  onClick={() => startWinddown(winddownRoutines[0])}
                >
                  Start Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wind-down Routines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Wind-down Routines</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {winddownRoutines.map((routine) => (
              <Card key={routine.id} className="min-w-[180px] bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#8BAAC6] rounded-full flex items-center justify-center">
                      <Moon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">{routine.title}</h4>
                    <p className="text-[#5C5C5C] text-sm mb-2">{routine.duration} min</p>
                    <Badge variant="outline" className="text-xs mb-3">{routine.difficulty}</Badge>
                    <Button 
                      size="sm" 
                      className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                      onClick={() => startWinddown(routine)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Soundscapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Soundscapes & Sleep Sounds</h3>
          <div className="grid grid-cols-3 gap-3">
            {soundscapes.map((sound) => (
              <Card 
                key={sound.id} 
                className={`bg-[#F4F7FA] border-0 cursor-pointer transition-all ${
                  activeSoundscape === sound.id ? 'ring-2 ring-[#AED6D2] bg-[#AED6D2]/20' : 'hover:shadow-md'
                }`}
                onClick={() => toggleSoundscape(sound.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    activeSoundscape === sound.id ? 'bg-[#AED6D2]' : 'bg-[#8BAAC6]'
                  }`}>
                    {activeSoundscape === sound.id ? 
                      <Pause className="w-4 h-4 text-[#2E2E2E]" /> : 
                      <Play className="w-4 h-4 text-white" />
                    }
                  </div>
                  <h4 className="text-[#2E2E2E] font-semibold text-sm mb-1">{sound.name}</h4>
                  <p className="text-[#5C5C5C] text-xs">{sound.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Sleep Diary Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center justify-between">
                Sleep Diary
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentView('log')}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
                <Calendar className="w-5 h-5 text-[#8BAAC6]" />
                <div className="flex-1">
                  <p className="text-[#2E2E2E] font-semibold">Last entry: Yesterday</p>
                  <p className="text-[#5C5C5C] text-sm">Quality: 😴😴😴😴 • Caffeine: 120mg</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentView('log')}
                >
                  Add Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sleep Hygiene Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Collapsible open={expandedHygiene} onOpenChange={setExpandedHygiene}>
            <Card className="bg-[#F4F7FA] border-0">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F4F7FA]/80 transition-colors">
                  <CardTitle className="text-[#2E2E2E] flex items-center justify-between">
                    Sleep Hygiene Checklist
                    {expandedHygiene ? 
                      <Eye className="w-5 h-5" /> : 
                      <EyeOff className="w-5 h-5" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {sleepHygieneChecklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                        <div 
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                            item.completed ? 'bg-[#5BB97E]' : 'bg-gray-300'
                          }`}
                        >
                          {item.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-[#2E2E2E] text-sm ${item.completed ? 'line-through opacity-60' : ''}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Evening Routine
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </motion.div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Integrations & Auto-Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {healthKitSync ? <Wifi className="w-5 h-5 text-[#5BB97E]" /> : <WifiOff className="w-5 h-5 text-gray-400" />}
                  <div>
                    <p className="text-[#2E2E2E] font-semibold">Health Sync</p>
                    <p className="text-[#5C5C5C] text-sm">
                      {healthKitSync ? `Last sync: ${lastSync}` : 'Tap to connect'}
                    </p>
                  </div>
                </div>
                <Switch checked={healthKitSync} onCheckedChange={setHealthKitSync} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center space-x-4 text-xs text-[#5C5C5C] pb-20"
        >
          <button className="hover:text-[#657FA4]">Sleep tips</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Research</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Expert Connect</button>
        </motion.div>
      </div>
    </div>
  );
}