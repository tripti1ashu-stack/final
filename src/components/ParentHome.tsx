import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LanguageSelector } from "./LanguageSelector";
import { 
  Settings, 
  Heart, 
  BookOpen, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  MessageCircle,
  Clock,
  Star,
  ArrowLeft
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

const familyMembers = [
  { name: "Arjun", relation: "Son", age: 16, wellnessScore: 85, mood: "😊", lastActive: "2 hours ago" },
  { name: "Kavya", relation: "Daughter", age: 14, wellnessScore: 78, mood: "😐", lastActive: "5 hours ago" }
];

const parentingModules = [
  { title: "Teen Communication", progress: 65, icon: "💬", difficulty: "Beginner" },
  { title: "Supporting Anxiety", progress: 40, icon: "🤗", difficulty: "Intermediate" },
  { title: "Digital Wellness", progress: 90, icon: "📱", difficulty: "Beginner" },
  { title: "Crisis Recognition", progress: 25, icon: "🚨", difficulty: "Advanced" }
];

const recentInsights = [
  { child: "Arjun", insight: "Stress levels decreased by 15% this week", positive: true, time: "Today" },
  { child: "Kavya", insight: "Missed 2 wellness check-ins", positive: false, time: "Yesterday" },
  { child: "Arjun", insight: "Completed sleep hygiene module", positive: true, time: "2 days ago" }
];

const expertRecommendations = [
  { title: "Help your teen manage exam stress", expert: "Dr. Priya Sharma", duration: "15 min read", rating: 4.8 },
  { title: "When to seek professional help", expert: "Dr. Rohit Gupta", duration: "20 min read", rating: 4.9 },
  { title: "Building emotional resilience", expert: "Dr. Anjali Mehta", duration: "12 min read", rating: 4.7 }
];

interface ParentHomeProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBackToRoleSelection?: () => void;
  onNavigateToTeenCommunication?: () => void;
}

export function ParentHome({ currentLanguage, onLanguageChange, onBackToRoleSelection, onNavigateToTeenCommunication }: ParentHomeProps) {
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
                className="w-8 h-8 p-0 mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
              <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-[#0F1722]">MindMitra</span>
            <Badge variant="outline" className="ml-2 text-xs">Parent</Badge>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-[#657FA4] to-[#8BAAC6] text-white border-0 mt-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👨‍👩‍👧
                </div>
                <div className="flex-1">
                  <h2 className="text-white mb-1">Welcome, Meera</h2>
                  <p className="text-white/90 text-sm mb-3">Supporting your family's mental wellness</p>
                  <Button size="sm" className="bg-[#AED6D2] hover:bg-white text-[#0F1722]">
                    Family Check-in
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* Family Members Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Family Wellness</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">
              <Users className="w-4 h-4 mr-1" />
              Manage
            </Button>
          </div>
          <div className="space-y-3">
            {familyMembers.map((member, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#AED6D2] rounded-full flex items-center justify-center text-2xl">
                        {member.mood}
                      </div>
                      <div>
                        <h4 className="text-[#0F1722] text-sm">{member.name}</h4>
                        <p className="text-[#55707F] text-xs">{member.relation}, {member.age} years</p>
                        <p className="text-[#55707F] text-xs">Last active: {member.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#0F1722]">{member.wellnessScore}</span>
                        <div className="w-12 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-[#AED6D2] rounded-full" 
                            style={{ width: `${member.wellnessScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Parenting Training Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Parent/Guardian Training</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View All</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {parentingModules.map((module, index) => (
              <Card 
                key={index} 
                className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (module.title === "Teen Communication" && onNavigateToTeenCommunication) {
                    onNavigateToTeenCommunication();
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{module.icon}</div>
                  <h4 className="text-[#0F1722] text-sm mb-2 line-clamp-2">{module.title}</h4>
                  <div className="space-y-2">
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex items-center justify-between">
                      <p className="text-[#55707F] text-xs">{module.progress}%</p>
                      <Badge variant="outline" className="text-xs">{module.difficulty}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Recent Insights</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View Timeline</Button>
          </div>
          <div className="space-y-3">
            {recentInsights.map((insight, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      insight.positive ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {insight.positive ? '✅' : '⚠️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[#0F1722] text-sm">{insight.child}</h4>
                        <span className="text-xs text-[#55707F]">{insight.time}</span>
                      </div>
                      <p className="text-[#55707F] text-xs">{insight.insight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Expert Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Expert Recommendations</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View All</Button>
          </div>
          <div className="space-y-3">
            {expertRecommendations.map((recommendation, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#8BAAC6] rounded-full flex items-center justify-center text-xl">
                      📖
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#0F1722] text-sm mb-1">{recommendation.title}</h4>
                      <p className="text-[#55707F] text-xs mb-2">By {recommendation.expert}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#55707F]" />
                            <span className="text-xs text-[#55707F]">{recommendation.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-[#55707F]">{recommendation.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs h-6">
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-[#0F1722] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Connect</h4>
                <p className="text-[#55707F] text-xs">Expert chat</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Privacy</h4>
                <p className="text-[#55707F] text-xs">Family settings</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Schedule</h4>
                <p className="text-[#55707F] text-xs">Family time</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Progress</h4>
                <p className="text-[#55707F] text-xs">View reports</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}