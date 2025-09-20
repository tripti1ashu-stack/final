import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LanguageSelector } from "./LanguageSelector";
import { UrgentHelpModal } from "./UrgentHelpModal";
import { 
  Globe, 
  Settings, 
  Heart, 
  Bookmark, 
  Clock, 
  Star,
  TrendingUp,
  Calendar,
  Moon,
  Activity,
  Smile,
  AlertTriangle,
  Shield,
  ArrowLeft
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

const genericModules = [
  { title: "Stress Management", progress: 65, icon: "🧘", color: "from-blue-400 to-blue-600" },
  { title: "Sleep Better", progress: 30, icon: "😴", color: "from-purple-400 to-purple-600" },
  { title: "Focus & Productivity", progress: 80, icon: "🎯", color: "from-green-400 to-green-600" },
  { title: "Social Anxiety", progress: 45, icon: "💬", color: "from-orange-400 to-orange-600" }
];

const instituteModules = [
  { title: "Exam Anxiety", progress: 70, institute: "Psychology Dept" },
  { title: "Campus Life", progress: 85, institute: "Student Affairs" }
];

const peerStories = [
  { title: "How I overcame exam stress", excerpt: "Last semester was tough, but these techniques...", author: "Anonymous", hearts: 24 },
  { title: "Finding friends on campus", excerpt: "Starting university felt overwhelming until...", author: "Vidya_21", hearts: 18 }
];

const experts = [
  { name: "Dr. Priya S.", specialty: "Anxiety & Stress", rating: 4.9, available: true },
  { name: "Rohan K.", specialty: "Sleep Disorders", rating: 4.8, available: false },
  { name: "Kavya R.", specialty: "Student Counseling", rating: 4.9, available: true }
];

const mentalGymExercises = [
  { name: "Deep Breathing", time: "5 mins", icon: "🫁", difficulty: "Easy" },
  { name: "Mindful Walking", time: "10 mins", icon: "🚶", difficulty: "Easy" },
  { name: "Progressive Relaxation", time: "15 mins", icon: "🧘", difficulty: "Medium" },
  { name: "Gratitude Practice", time: "8 mins", icon: "🙏", difficulty: "Easy" }
];

const upcomingEvents = [
  { title: "Mindfulness Workshop", date: "Tomorrow", location: "Online", type: "Workshop" },
  { title: "Study Skills Seminar", date: "Oct 15", location: "Library Hall", type: "Seminar" }
];

interface StudentHomeProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBackToRoleSelection?: () => void;
  onNavigateToMindBody?: () => void;
  onNavigateToBreathing?: () => void;
  onNavigateToAnonymousFeedback?: () => void;
  onNavigateToStory?: () => void;
  onNavigateToMentalGym?: () => void;
  onNavigateToSleepBetter?: () => void;
  onNavigateToQuickCheckIn?: () => void;
  onNavigateToMindfulnessWorkshop?: () => void;
  onNavigateToConnectToExpert?: () => void;
  onNavigateToWellnessRoutine?: () => void;
}

export function StudentHome({ currentLanguage, onLanguageChange, onBackToRoleSelection, onNavigateToMindBody, onNavigateToBreathing, onNavigateToAnonymousFeedback, onNavigateToStory, onNavigateToMentalGym, onNavigateToSleepBetter, onNavigateToQuickCheckIn, onNavigateToMindfulnessWorkshop, onNavigateToConnectToExpert, onNavigateToWellnessRoutine }: StudentHomeProps) {
  const [showBreathing, setShowBreathing] = useState(false);
  const [openStory, setOpenStory] = useState(false);
  const [showRoutine, setShowRoutine] = useState(false);


  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white border-b border-[#F4F7FA] z-10">
        <div className="flex items-center justify-between p-4 h-14">
          <div className="flex items-center gap-2">
            {onBackToRoleSelection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToRoleSelection}
                className="w-8 h-8 p-0 rounded-full hover:bg-[#F4F7FA]"
              >
                <ArrowLeft className="w-4 h-4 text-[#657FA4]" />
              </Button>
            )}
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
              <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-[#0F1722]">MindMitra</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              variant="compact"
            />
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-4 pb-24 space-y-6">
        {/* Hero Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-[#B3D9FF] to-[#D1E9FF] text-[#0F1722] border-0 mt-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#AED6D2]/30 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1">
                  <h2 className="text-[#0F1722] mb-1">Hello Arjun</h2>
                  <p className="text-[#0F1722]/80 text-sm mb-3">How are you feeling today?</p>
                  <Button 
                    size="sm" 
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                    onClick={() => onNavigateToQuickCheckIn?.()}
                  >
                    Quick Check-in
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wellness Routine Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card 
            className="bg-gradient-to-r from-[#657FA4]/10 to-[#8BAAC6]/10 border-[#657FA4]/20 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigateToWellnessRoutine?.()}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#657FA4]/20 rounded-full flex items-center justify-center text-2xl">
                  🕒
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0F1722] mb-1">My Wellness Routine</h3>
                  <p className="text-[#55707F] text-sm mb-3">
                    Build consistent habits for better mental health
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#AED6D2]/30 rounded-full flex items-center justify-center">
                        <span className="text-xs text-[#657FA4]">12</span>
                      </div>
                      <span className="text-xs text-[#55707F]">day streak</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#2E8B57]/20 rounded-full flex items-center justify-center">
                        <span className="text-xs text-[#2E8B57]">75%</span>
                      </div>
                      <span className="text-xs text-[#55707F]">today</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-[#657FA4] hover:bg-[#55707F] text-white"
                >
                  View Routine
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}

        {/* Urgent Help Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UrgentHelpModal>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 h-auto rounded-xl shadow-lg"
              size="lg"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Need urgent help?</div>
                  <div className="text-white/90 text-sm font-normal">24/7 crisis support available</div>
                </div>
              </div>
            </Button>
          </UrgentHelpModal>
        </motion.div>

        {/* Generic Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Wellness Modules</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View All</Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {genericModules.map((module, index) => (
              <Card 
                key={index} 
                className="min-w-[160px] bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (module.title === "Sleep Better") {
                    onNavigateToSleepBetter?.();
                  }
                 
                }}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center text-2xl mb-3`}>
                    {module.icon}
                  </div>
                  <h4 className="text-[#0F1722] text-sm mb-2 line-clamp-2">{module.title}</h4>
                  <div className="space-y-2">
                    <Progress value={module.progress} className="h-2" />
                    <p className="text-[#55707F] text-xs">{module.progress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Institute Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Your Institute Modules</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View All</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {instituteModules.map((module, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{module.institute}</Badge>
                  <h4 className="text-[#0F1722] text-sm mb-2">{module.title}</h4>
                  <div className="space-y-2">
                    <Progress value={module.progress} className="h-2" />
                    <p className="text-[#55707F] text-xs">{module.progress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Peer Wisdom Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Peer Wisdom</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View all</Button>
          </div>
          <div className="space-y-3">
            {peerStories.map((story, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent 
                  className="p-4 cursor-pointer"
                  onClick={() => onNavigateToStory?.()}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#AED6D2] rounded-full flex items-center justify-center text-sm">
                      {story.author[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#0F1722] text-sm mb-1">{story.title}</h4>
                      <p className="text-[#55707F] text-xs mb-2 line-clamp-2">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-[#55707F]">{story.hearts}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-[#55707F]">
                          <Bookmark className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Expert Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Expert Connect</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View all</Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {experts.map((expert, index) => (
              <Card key={index} className="min-w-[140px] bg-[#F4F7FA] border-0">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-[#8BAAC6] rounded-full flex items-center justify-center text-xl mb-2 mx-auto">
                    👨‍⚕️
                  </div>
                  <h4 className="text-[#0F1722] text-sm mb-1">{expert.name}</h4>
                  <p className="text-[#55707F] text-xs mb-2">{expert.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-[#55707F]">{expert.rating}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className={`w-full text-xs ${expert.available ? 'bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]' : 'bg-gray-200 text-gray-500'}`}
                    disabled={!expert.available}
                    onClick={() => expert.available && expert.name === 'Dr. Priya S.' || 'Kavya R.' && onNavigateToConnectToExpert?.()}
                  >
                    {expert.available ? 'Consult' : 'Busy'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Serenity Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Serenity Studio</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">Start Suggested</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mentalGymExercises.map((exercise, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent
                  className="p-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => onNavigateToBreathing?.()}
                >
                  <div className="text-2xl mb-2">{exercise.icon}</div>
                  <h4 className="text-[#0F1722] text-sm mb-1">{exercise.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#55707F]" />
                      <span className="text-xs text-[#55707F]">{exercise.time}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Mental Gym Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 overflow-hidden shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-md">
                  <div className="text-2xl">🧠</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0F1722] mb-2 flex items-center gap-2">
                    🧠 Mental Gym
                  </h3>
                  <p className="text-sm text-[#657FA4] mb-3 italic">
                    ✨ "Train your mind like you train your body."
                  </p>
                  <p className="text-[#55707F] text-sm mb-4 leading-relaxed">
                    Boost <span className="font-semibold text-[#657FA4]">focus</span>, reduce stress, and build emotional <span className="font-semibold text-[#657FA4]">resilience</span> through guided exercises, mindfulness drills, and fun brain workouts—personalized just for you to stay <span className="font-semibold text-[#657FA4]">stress-free</span>.
                  </p>
                  <Button 
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
                    size="sm"
                    onClick={() => onNavigateToMentalGym?.()}
                  >
                    👉 Enter Gym
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mind-Body Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-6">
              <h3 className="text-[#0F1722] mb-4">Balance Your Mind, Heal Your Body: Discover the Power of Connection</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 relative">
                    <div className="w-12 h-12 rounded-full border-4 border-[#AED6D2] flex items-center justify-center">
                      <Moon className="w-5 h-5 text-[#657FA4]" />
                    </div>
                  </div>
                  <p className="text-xs text-[#55707F] mb-1">Sleep Score</p>
                  <p className="text-lg font-semibold text-[#0F1722]">85</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Smile className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-[#55707F] mb-1">Mood</p>
                  <p className="text-lg font-semibold text-[#0F1722]">Good</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-[#55707F] mb-1">Activity</p>
                  <p className="text-lg font-semibold text-[#0F1722]">45m</p>
                </div>
              </div>
              <div className="text-center">
                <Button 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] font-semibold shadow-md transition-all duration-200"
                  size="sm"
                  onClick={() => onNavigateToMindBody?.()}
                >
                  Explore now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* Workshops & Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Workshops & Events</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View all</Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="min-w-[200px] bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">{event.type}</Badge>
                  <h4 className="text-[#0F1722] text-sm mb-2">{event.title}</h4>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#55707F]" />
                      <span className="text-xs text-[#55707F]">{event.date}</span>
                    </div>
                    <p className="text-xs text-[#55707F]">{event.location}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                    onClick={() => event.title === 'Mindfulness Workshop' && onNavigateToMindfulnessWorkshop?.()}
                  >
                    RSVP
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Anonymous Feedback Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <Card className="bg-gradient-to-r from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#AED6D2] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#2E2E2E]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#2E2E2E] font-semibold mb-1">Anonymous Feedback, Meaningful Change</h4>
                  <p className="text-[#5C5C5C] text-sm">Share concerns safely with college authorities while protecting your identity</p>
                </div>
                <Button 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] font-semibold"
                  size="sm"
                  onClick={() => onNavigateToAnonymousFeedback?.()}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <div className="flex justify-center gap-6 text-xs text-[#55707F]">
            <a href="#" className="hover:text-[#0F1722]">Privacy</a>
            <a href="#" className="hover:text-[#0F1722]">Help</a>
            <a href="#" className="hover:text-[#0F1722]">Contact</a>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {openStory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setOpenStory(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Blog heading */}
            <h1 className="text-2xl font-bold mb-3 text-[#0F1722]">
              How I Overcame Exam Stress
            </h1>
            <p className="text-sm text-gray-500 mb-6">By Anonymous • 5 min read</p>

            {/* Blog body */}
            <div className="prose prose-gray text-[#0F1722] text-sm leading-relaxed">
              <p>
                During my final exams, I felt completely overwhelmed. The syllabus
                seemed endless, and the constant pressure made it impossible to
                focus. I would sit with my books but my mind was racing with "what if"
                scenarios.
              </p>
              <p>
                What truly helped me was breaking things down into small, achievable
                goals. Instead of trying to study everything at once, I created a
                schedule that gave time for both revision and rest. This small shift
                gave me back a sense of control.
              </p>
              <p>
                Another powerful technique was <strong>deep breathing</strong>. Before
                I started a study session, I would close my eyes, take a few deep
                breaths, and calm my racing thoughts. It's amazing how this small
                practice reduced my stress levels instantly.
              </p>
              <p>
                Talking to peers also reminded me that I wasn't alone. We all shared
                the same fears, and supporting each other made the experience far less
                scary. It also gave me new study techniques that I hadn't thought of.
              </p>
              <p>
                By the time exams started, I wasn't stress-free, but I was prepared,
                calmer, and confident. Looking back, I realize that stress is natural,
                but it doesn't have to control us.
              </p>
              <p className="italic mt-4">
                If you're struggling with exam stress — take a deep breath, break your
                goals down, and remember you're not alone. You've got this.
              </p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}