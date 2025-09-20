import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Volume2,
  VolumeOff,
  Mic,
  Eye,
  Sparkles,
  TrendingUp,
  Calendar,
  Award,
  MessageSquare,
  Users,
  Coffee,
  Clock,
  CheckCircle2,
  ChevronRight,
  Heart,
  Zap,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";

interface QuickCheckInProps {
  onBack: () => void;
  currentLanguage: string;
}

interface MoodData {
  emoji: string;
  label: string;
  value: string;
}

interface CheckInHistory {
  date: string;
  mood: string;
  intensity: number;
  energy: number;
}

const moods: MoodData[] = [
  { emoji: '😃', label: 'Joyful', value: 'joyful' },
  { emoji: '🙂', label: 'Calm', value: 'calm' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😟', label: 'Anxious', value: 'anxious' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😡', label: 'Stressed', value: 'stressed' },
  { emoji: '😴', label: 'Tired', value: 'tired' }
];

const smartTags = [
  'Academic Stress', 'Relationships', 'Homesickness', 'Group Projects', 
  'Exam Pressure', 'Social Anxiety', 'Time Management', 'Future Worries'
];

const affirmations = [
  "You're stronger than you think.",
  "Every challenge is a chance to grow.",
  "Your feelings are valid and temporary.",
  "You have overcome difficulties before.",
  "Progress, not perfection, is the goal."
];

const tips = [
  "Try box breathing: 4 counts in, hold 4, out 4, hold 4.",
  "Take a 5-minute walk to reset your energy.",
  "Write down 3 things you're grateful for right now.",
  "Reach out to a friend or family member.",
  "Do a quick body scan - notice any tension and release it."
];

export function QuickCheckIn({ onBack, currentLanguage }: QuickCheckInProps) {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState([5]);
  const [energy, setEnergy] = useState([5]);
  const [thoughts, setThoughts] = useState('');
  const [detectedTags, setDetectedTags] = useState<string[]>([]);
  const [streak, setStreak] = useState(5);
  const [totalPoints, setTotalPoints] = useState(340);
  const [completedToday, setCompletedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [voiceInput, setVoiceInput] = useState(false);
  const [backgroundAura, setBackgroundAura] = useState('from-sky-100 to-mint-100');

  const checkInHistory: CheckInHistory[] = [
    { date: 'Today', mood: '😟', intensity: 6, energy: 4 },
    { date: 'Yesterday', mood: '🙂', intensity: 7, energy: 6 },
    { date: '2 days ago', mood: '😃', intensity: 8, energy: 8 }
  ];

  useEffect(() => {
    // Update background based on selected mood
    if (selectedMood) {
      const moodColors = {
        joyful: 'from-yellow-100 to-orange-100',
        calm: 'from-blue-100 to-green-100',
        neutral: 'from-gray-100 to-slate-100',
        anxious: 'from-orange-100 to-red-100',
        sad: 'from-blue-100 to-purple-100',
        stressed: 'from-red-100 to-pink-100',
        tired: 'from-purple-100 to-indigo-100'
      };
      setBackgroundAura(moodColors[selectedMood] || 'from-sky-100 to-mint-100');
    }
  }, [selectedMood]);

  useEffect(() => {
    // Auto-detect themes from thoughts
    if (thoughts.trim()) {
      const detected = smartTags.filter(tag => 
        thoughts.toLowerCase().includes(tag.toLowerCase().replace(' ', ''))
      );
      setDetectedTags(detected.slice(0, 3));
    }
  }, [thoughts]);

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonalizedFeedback = () => {
    const moodValue = selectedMood;
    const intensityLevel = intensity[0];
    const energyLevel = energy[0];

    if (['anxious', 'stressed'].includes(moodValue!) && intensityLevel >= 7) {
      return {
        affirmation: affirmations[2],
        tip: tips[0],
        resource: 'Mental Gym - Stress Relief'
      };
    } else if (['sad', 'tired'].includes(moodValue!) && energyLevel <= 4) {
      return {
        affirmation: affirmations[1],
        tip: tips[1],
        resource: 'Breathing Exercises'
      };
    } else if (moodValue === 'joyful' && energyLevel >= 7) {
      return {
        affirmation: affirmations[0],
        tip: tips[2],
        resource: 'Peer Stories - Share Your Joy'
      };
    } else {
      return {
        affirmation: affirmations[4],
        tip: tips[3],
        resource: 'Mind Mitra Chat'
      };
    }
  };

  const handleComplete = () => {
    setShowCelebration(true);
    setCompletedToday(true);
    setStreak(prev => prev + 1);
    setTotalPoints(prev => prev + 10 + (streak >= 5 ? 5 : 0)); // Bonus for streaks
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          
          <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">
            You've checked in {streak} days straight!
          </h2>
          <p className="text-[#5C5C5C] mb-6">Keep going! You earned {10 + (streak >= 5 ? 5 : 0)} points</p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mb-6"
          />
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#657FA4]">{streak}</div>
              <div className="text-[#5C5C5C] text-sm">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#657FA4]">{totalPoints}</div>
              <div className="text-[#5C5C5C] text-sm">Total Points</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto text-yellow-500" />
              <div className="text-[#5C5C5C] text-sm">Mindful Badge</div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
            onClick={onBack}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundAura} transition-all duration-1000`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between p-4 h-14">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === 1 ? onBack : prevStep}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h2 className="font-semibold text-[#2E2E2E]">Quick Check-In 🌿</h2>
            <p className="text-xs text-[#5C5C5C]">Take just 2 minutes to reflect and recharge</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#5C5C5C]">{formatTime(timeLeft)} left</div>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <Progress value={(step / 5) * 100} className="h-2" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] text-center">How are you feeling right now?</CardTitle>
                  <p className="text-[#5C5C5C] text-sm text-center">Click the emoji that matches your mood</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {moods.map((mood, index) => (
                      <motion.button
                        key={mood.value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-2xl text-center transition-all ${
                          selectedMood === mood.value 
                            ? 'bg-[#AED6D2] ring-2 ring-[#657FA4] shadow-lg' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        onClick={() => setSelectedMood(mood.value)}
                      >
                        <motion.div
                          animate={{ 
                            rotate: selectedMood === mood.value ? [0, -10, 10, 0] : 0 
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-3xl mb-2"
                        >
                          {mood.emoji}
                        </motion.div>
                        <div className="text-xs text-[#2E2E2E] font-medium">{mood.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">How strong is this feeling?</CardTitle>
                  <p className="text-[#5C5C5C] text-sm">Slide to adjust the intensity (1-10)</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#5C5C5C]">Mild</span>
                      <span className="text-lg font-bold text-[#657FA4]">{intensity[0]}</span>
                      <span className="text-sm text-[#5C5C5C]">Intense</span>
                    </div>
                    <Slider
                      value={intensity}
                      onValueChange={setIntensity}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <CardTitle className="text-[#2E2E2E] mb-3">How's your energy right now?</CardTitle>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#5C5C5C]">Low 🔋</span>
                      <span className="text-lg font-bold text-[#657FA4]">{energy[0]}</span>
                      <span className="text-sm text-[#5C5C5C]">High ⚡</span>
                    </div>
                    <Slider
                      value={energy}
                      onValueChange={setEnergy}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">What's on your mind?</CardTitle>
                  <p className="text-[#5C5C5C] text-sm">Optional - share what you're thinking about</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Textarea
                      value={thoughts}
                      onChange={(e) => setThoughts(e.target.value)}
                      placeholder="e.g., exam pressure, homesickness, group project stress..."
                      className="min-h-24 bg-white/60 border-white/40"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setVoiceInput(!voiceInput)}
                    >
                      {voiceInput ? <VolumeOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {detectedTags.length > 0 && (
                    <div>
                      <p className="text-sm text-[#5C5C5C] mb-2">Detected themes:</p>
                      <div className="flex flex-wrap gap-2">
                        {detectedTags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#657FA4]" />
                    Your Personalized Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const feedback = getPersonalizedFeedback();
                    return (
                      <>
                        <div className="p-4 bg-gradient-to-r from-[#AED6D2]/20 to-[#8BAAC6]/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-[#657FA4]" />
                            <span className="font-semibold text-[#2E2E2E]">Affirmation</span>
                          </div>
                          <p className="text-[#2E2E2E] italic">"{feedback.affirmation}"</p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-yellow-100/60 to-orange-100/60 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold text-[#2E2E2E]">1-Minute Tip</span>
                          </div>
                          <p className="text-[#2E2E2E]">{feedback.tip}</p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-[#2E2E2E]">Recommended</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full justify-between">
                            {feedback.resource}
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Your Progress</CardTitle>
                  <p className="text-[#5C5C5C] text-sm">See how you're doing over time</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">{streak}</div>
                      <div className="text-[#5C5C5C] text-sm">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">{totalPoints}</div>
                      <div className="text-[#5C5C5C] text-sm">Points</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                        Resilience Builder
                      </Badge>
                      <div className="text-[#5C5C5C] text-sm mt-1">Current Level</div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#5C5C5C] mb-2">Last 3 Check-Ins:</p>
                    <div className="flex gap-2">
                      {checkInHistory.map((entry, index) => (
                        <div key={index} className="flex-1 text-center p-2 bg-white/40 rounded-lg">
                          <div className="text-xl mb-1">{entry.mood}</div>
                          <div className="text-xs text-[#5C5C5C]">{entry.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedMood === 'anxious' && (
                    <div className="p-3 bg-blue-100/60 rounded-lg">
                      <p className="text-[#2E2E2E] text-sm">
                        <strong>Insight:</strong> You felt anxious 3 times this week. Let's build resilience together!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {step < 5 ? (
            <Button 
              className="w-full bg-[#5BB97E] hover:bg-green-600 text-white h-12"
              onClick={nextStep}
              disabled={step === 1 && !selectedMood}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {step === 4 ? 'Continue' : 'Next'}
            </Button>
          ) : (
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white h-12"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete Check-In & Earn Points
            </Button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="bg-white/40 border-white/40">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with Mind Mitra
          </Button>
          <Button variant="outline" className="bg-white/40 border-white/40">
            <Users className="w-4 h-4 mr-2" />
            See Peer Reflections
          </Button>
        </div>

        <div className="text-center text-xs text-[#5C5C5C] pb-6">
          Quick reflections keep you sharp! • {formatTime(timeLeft)} remaining
        </div>
      </div>
    </div>
  );
}