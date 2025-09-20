import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  HelpCircle, 
  Settings,
  Play, 
  Pause, 
  RotateCcw,
  SkipForward,
  Heart,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Clock,
  Star,
  Award,
  Share,
  Plus,
  Bell,
  Zap,
  Moon,
  Coffee,
  AlertTriangle,
  Shield,
  Eye,
  Mic
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface BreathingExercisesProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  pattern: { inhale: number; hold1: number; exhale: number; hold2: number };
  description: string;
}

const exercises: Exercise[] = [
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    subtitle: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s',
    duration: 2,
    difficulty: 'Beginner',
    benefits: ['Stress relief', 'Focus'],
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    description: 'A calming technique used by Navy SEALs to maintain focus under pressure.'
  },
  {
    id: '4-7-8-breathing',
    title: '4-7-8 Breathing',
    subtitle: 'Inhale 4s → Hold 7s → Exhale 8s',
    duration: 3,
    difficulty: 'Intermediate',
    benefits: ['Sleep aid', 'Anxiety relief'],
    pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
    description: 'Dr. Weil\'s technique for natural sleep and anxiety relief.'
  },
  {
    id: 'diaphragmatic',
    title: 'Diaphragmatic Breathing',
    subtitle: 'Deep belly breathing technique',
    duration: 5,
    difficulty: 'Beginner',
    benefits: ['Relaxation', 'Better oxygen flow'],
    pattern: { inhale: 6, hold1: 2, exhale: 6, hold2: 2 },
    description: 'Focus on breathing deep into your belly, not your chest.'
  }
];

const routines = [
  { id: 'morning', title: 'Morning Calm', duration: '5 min', icon: '☀️', exercises: ['box-breathing'] },
  { id: 'pre-exam', title: 'Pre-exam', duration: '3 min', icon: '📚', exercises: ['box-breathing'] },
  { id: 'sleep', title: 'Sleep wind-down', duration: '7 min', icon: '🌙', exercises: ['4-7-8-breathing'] },
  { id: 'panic', title: 'Panic stop', duration: '2 min', icon: '🚨', exercises: ['box-breathing'] }
];

const categories = [
  { id: 'short', name: 'Short', time: '1–2m', icon: '⚡' },
  { id: 'medium', name: 'Medium', time: '3–5m', icon: '🌊' },
  { id: 'long', name: 'Long', time: '6–10m', icon: '🧘' },
  { id: 'techniques', name: 'Techniques', time: 'Various', icon: '🎯' }
];

type SessionPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';
type AppScreen = 'home' | 'exercise-detail' | 'session';

export function BreathingExercises({ onBack, currentLanguage }: BreathingExercisesProps) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<SessionPhase>('inhale');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalCycles] = useState(6);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  
  // Settings
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [backgroundSound, setBackgroundSound] = useState('none');
  const [selectedDuration, setSelectedDuration] = useState(2);
  
  // Progress & streaks
  const [currentStreak, setCurrentStreak] = useState(5);
  const [xpPoints, setXpPoints] = useState(120);
  const [badges, setBadges] = useState(3);
  const [lastSession] = useState('2 hours ago');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 300 + 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSessionActive && !isPaused && selectedExercise) {
      intervalRef.current = setInterval(() => {
        setPhaseTimeLeft(prev => {
          if (prev <= 0) {
            // Move to next phase
            const phases: SessionPhase[] = ['inhale', 'hold1', 'exhale', 'hold2'];
            const currentIndex = phases.indexOf(currentPhase);
            const nextIndex = (currentIndex + 1) % phases.length;
            const nextPhase = phases[nextIndex];
            
            if (nextIndex === 0) {
              setCyclesCompleted(prev => prev + 1);
            }
            
            setCurrentPhase(nextPhase);
            return selectedExercise.pattern[nextPhase];
          }
          return prev - 1;
        });

        setSessionTimeLeft(prev => {
          if (prev <= 0) {
            completeSession();
            return 0;
          }
          return prev - 1;
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
  }, [isSessionActive, isPaused, currentPhase, selectedExercise]);

  const startSession = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentScreen('session');
    setIsSessionActive(true);
    setIsPaused(false);
    setCurrentPhase('inhale');
    setPhaseTimeLeft(exercise.pattern.inhale);
    setCyclesCompleted(0);
    setSessionTimeLeft(selectedDuration * 60);
  };

  const pauseSession = () => {
    setIsPaused(true);
  };

  const resumeSession = () => {
    setIsPaused(false);
  };

  const completeSession = () => {
    setIsSessionActive(false);
    setCurrentScreen('home');
    setXpPoints(prev => prev + 10);
    setCurrentStreak(prev => prev + 1);
    
    // Show completion notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🎉 Breathing session complete!', {
        body: 'Well done! You\'ve earned 10 XP.',
        icon: '/icon-192x192.png'
      });
    }
  };

  const skipPhase = () => {
    if (!selectedExercise) return;
    
    const phases: SessionPhase[] = ['inhale', 'hold1', 'exhale', 'hold2'];
    const currentIndex = phases.indexOf(currentPhase);
    const nextIndex = (currentIndex + 1) % phases.length;
    const nextPhase = phases[nextIndex];
    
    setCurrentPhase(nextPhase);
    setPhaseTimeLeft(selectedExercise.pattern[nextPhase]);
  };

  const getPhaseInstructions = () => {
    const instructions = {
      inhale: 'Breathe in slowly...',
      hold1: 'Hold your breath...',
      exhale: 'Breathe out gently...',
      hold2: 'Rest and hold...'
    };
    return instructions[currentPhase];
  };

  const getCircleScale = () => {
    if (currentPhase === 'inhale') return 1.3;
    if (currentPhase === 'hold1') return 1.3;
    if (currentPhase === 'exhale') return 0.8;
    return 0.8;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentScreen === 'session' && selectedExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#657FA4] to-[#AED6D2] flex flex-col">
        {/* Session UI */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Timer and phase info */}
          <div className="text-center mb-8">
            <div className="text-white/80 text-sm mb-2">
              {formatTime(sessionTimeLeft)} remaining
            </div>
            <div className="text-white text-lg mb-4">
              {getPhaseInstructions()}
            </div>
          </div>

          {/* Breathing circle */}
          <motion.div
            className="w-64 h-64 rounded-full bg-[#AED6D2]/30 border-4 border-[#AED6D2] flex items-center justify-center mb-8"
            animate={{ 
              scale: getCircleScale(),
              opacity: isPaused ? 0.5 : 1
            }}
            transition={{ 
              duration: selectedExercise.pattern[currentPhase],
              ease: currentPhase === 'inhale' ? 'easeIn' : 'easeOut'
            }}
          >
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-2">{phaseTimeLeft}</div>
              <div className="text-sm capitalize">{currentPhase.replace('1', '').replace('2', '')}</div>
            </div>
          </motion.div>

          {/* Progress indicators */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: totalCycles }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < cyclesCompleted ? 'bg-[#AED6D2]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={isPaused ? resumeSession : pauseSession}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            >
              {isPaused ? <Play className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSessionActive(false)}
              className="text-white/80 hover:text-white"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Restart
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={skipPhase}
              className="text-white/80 hover:text-white"
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={completeSession}
              className="text-white/80 hover:text-white"
            >
              Finish
            </Button>
          </div>

          {/* Voice guidance indicator */}
          {voiceGuidance && (
            <div className="flex items-center gap-2 mt-6 text-white/70 text-sm">
              <Volume2 className="w-4 h-4" />
              Voice guidance active
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentScreen === 'exercise-detail' && selectedExercise) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('home')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">
            {selectedExercise.title} — {selectedDuration} min
          </h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Heart className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero section */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
              
              <h3 className="text-[#2E2E2E] mb-2">{selectedExercise.title}</h3>
              <p className="text-[#5C5C5C] text-sm mb-3">{selectedExercise.subtitle}</p>
              <p className="text-[#5C5C5C] text-sm mb-4">{selectedExercise.description}</p>
              
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  {selectedExercise.difficulty}
                </Badge>
                {selectedExercise.benefits.map((benefit) => (
                  <Badge key={benefit} variant="outline" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] h-12"
              onClick={() => startSession(selectedExercise)}
            >
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              Preview
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="px-3">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[300px]">
                <SheetHeader>
                  <SheetTitle>Exercise Options</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" className="justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Routine
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Share Progress
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Settings */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] text-lg">Session Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#657FA4]" />
                  <span className="text-[#2E2E2E]">Voice Guidance</span>
                </div>
                <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#657FA4]" />
                  <span className="text-[#2E2E2E]">Captions</span>
                </div>
                <Switch checked={captions} onCheckedChange={setCaptions} />
              </div>
              
              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm">Background Sound</label>
                <Select value={backgroundSound} onValueChange={setBackgroundSound}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ocean">Ocean Waves</SelectItem>
                    <SelectItem value="rain">Rain</SelectItem>
                    <SelectItem value="white-noise">White Noise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[#2E2E2E] text-sm">Duration</label>
                <div className="flex gap-2">
                  {[1, 2, 5, 10].map((duration) => (
                    <Button
                      key={duration}
                      variant={selectedDuration === duration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDuration(duration)}
                      className={selectedDuration === duration ? "bg-[#657FA4]" : ""}
                    >
                      {duration}m
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <h4 className="text-[#2E2E2E] mb-2">Accessibility & Help</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start text-[#657FA4] h-8">
                  📖 Short instructions (text-only)
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-[#657FA4] h-8">
                  🧠 Why this technique helps
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-[#657FA4] h-8">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice commands help
                </Button>
              </div>
            </CardContent>
          </Card>
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
        
        <h2 className="flex-1 text-white text-center font-semibold">Breathing Exercises</h2>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <HelpCircle className="w-4 h-4 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4 text-white" />
          </Button>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Quick Start Card */}
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
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/30"
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[#2E2E2E] mb-1">Quick Reset — 2 min Box Breathing</h3>
                  <p className="text-[#5C5C5C] text-sm mb-3">Calm breathing technique to restore balance.</p>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">Beginner</Badge>
                    <Badge variant="outline" className="text-xs">Stress relief</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] h-11 px-6"
                    onClick={() => startSession(exercises[0])}
                  >
                    Start
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Suggested Routines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Suggested Routines</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {routines.map((routine, index) => (
              <Card key={routine.id} className="min-w-[160px] bg-[#8BAAC6] border-0 text-white">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{routine.icon}</div>
                  <h4 className="font-semibold mb-1">{routine.title}</h4>
                  <p className="text-sm opacity-90">{routine.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Card key={category.id} className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h4 className="text-[#2E2E2E] font-semibold mb-1">{category.name}</h4>
                  <p className="text-[#5C5C5C] text-sm">{category.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Featured Exercises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Featured Exercises</h3>
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-[#2E2E2E] font-semibold mb-1">{exercise.title}</h4>
                      <p className="text-[#5C5C5C] text-sm mb-2">{exercise.subtitle}</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">{exercise.difficulty}</Badge>
                        <Badge variant="outline" className="text-xs">{exercise.duration} min</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedExercise(exercise);
                          setCurrentScreen('exercise-detail');
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                        size="sm"
                        onClick={() => startSession(exercise)}
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Your Progress</h3>
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-[#AED6D2]" />
                    <span className="text-[#2E2E2E] font-semibold">Current Streak: {currentStreak} days 🔥</span>
                  </div>
                  <p className="text-[#5C5C5C] text-sm">XP: {xpPoints} | Badges: {badges}</p>
                  <p className="text-[#5C5C5C] text-xs">Last session: {lastSession}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    Repeat last
                  </Button>
                  <Award className="text-[#5BB97E] w-8 h-8 mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-orange-800 font-semibold mb-1">Tips & Safety</h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    If you feel dizzy or unwell, stop immediately. For severe distress, contact emergency services. 
                    Start slowly and listen to your body.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-x-4 text-xs text-[#5C5C5C] pb-20"
        >
          <button className="hover:text-[#657FA4]">How it works</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Accessibility</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Privacy</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Share progress</button>
        </motion.div>
      </div>
    </div>
  );
}