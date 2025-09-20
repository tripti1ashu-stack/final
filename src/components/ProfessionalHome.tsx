import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LanguageSelector } from "./LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Settings, 
  MessageCircle, 
  Calendar, 
  Clock, 
  Star,
  Users,
  BookOpen,
  Award,
  Phone,
  ArrowLeft,
  Video,
  AlertTriangle,
  FileText,
  TrendingUp,
  Shield,
  Target,
  Activity,
  Brain,
  Heart,
  Zap,
  Edit3,
  Send,
  Search,
  Filter,
  MoreVertical,
  PlayCircle,
  ChevronRight,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface ProfessionalHomeProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBackToRoleSelection?: () => void;
  onStartSession?: () => void;
  onViewSessionRequests?: () => void;
}

interface Client {
  id: string;
  anonymousId: string;
  riskLevel: 'low' | 'medium' | 'high';
  tag: string;
  scheduledTime: string;
  mood: string;
  lastActive: string;
  riskScore: number;
  topKeywords: string[];
  consentStatus: 'anonymous' | 'identified';
  preferredLanguage: string;
}

interface Session {
  id: string;
  clientId: string;
  date: string;
  duration: number;
  type: 'chat' | 'voice' | 'video';
  status: 'completed' | 'scheduled' | 'cancelled';
  notes?: string;
}

interface Rating {
  id: string;
  clientId: string;
  rating: number;
  feedback: string;
  reason: string;
  date: string;
  sessionType: 'chat' | 'voice' | 'video';
}

const todayStats = [
  { title: "Sessions Today", value: "8", change: "+2", icon: MessageCircle, color: "text-blue-600" },
  { title: "Queue Length", value: "12", change: "-3", icon: Users, color: "text-orange-600" },
  { title: "Avg Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-600" },
  { title: "Response Time", value: "2.5m", change: "-30s", icon: Clock, color: "text-green-600" }
];

const clientQueue: Client[] = [
  {
    id: '1',
    anonymousId: 'Student_A318',
    riskLevel: 'high',
    tag: 'Anxiety',
    scheduledTime: '10:00 AM',
    mood: '😰',
    lastActive: '5 min ago',
    riskScore: 78,
    topKeywords: ['panic', 'exam stress', 'sleepless'],
    consentStatus: 'anonymous',
    preferredLanguage: 'English'
  },
  {
    id: '2',
    anonymousId: 'Student_B459',
    riskLevel: 'medium',
    tag: 'Depression',
    scheduledTime: '10:30 AM',
    mood: '😔',
    lastActive: '15 min ago',
    riskScore: 65,
    topKeywords: ['lonely', 'motivation', 'grades'],
    consentStatus: 'anonymous',
    preferredLanguage: 'Hindi'
  },
  {
    id: '3',
    anonymousId: 'Student_C721',
    riskLevel: 'low',
    tag: 'Study Stress',
    scheduledTime: '11:00 AM',
    mood: '😊',
    lastActive: '2 hours ago',
    riskScore: 35,
    topKeywords: ['time management', 'focus'],
    consentStatus: 'identified',
    preferredLanguage: 'English'
  },
  {
    id: '4',
    anonymousId: 'Student_D832',
    riskLevel: 'high',
    tag: 'Crisis',
    scheduledTime: '11:30 AM',
    mood: '😢',
    lastActive: '1 min ago',
    riskScore: 92,
    topKeywords: ['hopeless', 'overwhelmed', 'drop out'],
    consentStatus: 'anonymous',
    preferredLanguage: 'English'
  }
];

const recentSessions: Session[] = [
  { id: '1', clientId: 'Student_A318', date: 'Today', duration: 45, type: 'video', status: 'completed' },
  { id: '2', clientId: 'Student_B459', date: 'Yesterday', duration: 30, type: 'chat', status: 'completed' },
  { id: '3', clientId: 'Student_C721', date: '2 days ago', duration: 60, type: 'voice', status: 'completed' }
];

const studentRatings: Rating[] = [
  {
    id: '1',
    clientId: 'Student_A318',
    rating: 5,
    feedback: 'Dr. Priya was extremely helpful and understanding. I felt heard and supported throughout the session.',
    reason: 'Excellent listening skills and practical advice',
    date: 'Today',
    sessionType: 'video'
  },
  {
    id: '2',
    clientId: 'Student_B459',
    rating: 4,
    feedback: 'Good session but would like more concrete strategies for managing anxiety.',
    reason: 'Helpful but wanted more actionable steps',
    date: 'Yesterday',
    sessionType: 'chat'
  },
  {
    id: '3',
    clientId: 'Student_C721',
    rating: 5,
    feedback: 'Amazing support! Dr. Priya helped me develop a study schedule that actually works.',
    reason: 'Practical solutions and empathetic approach',
    date: '2 days ago',
    sessionType: 'voice'
  },
  {
    id: '4',
    clientId: 'Student_D832',
    rating: 3,
    feedback: 'Session was okay but felt a bit rushed. Would prefer longer sessions for complex issues.',
    reason: 'Good advice but needed more time',
    date: '3 days ago',
    sessionType: 'video'
  }
];

const quickInterventions = [
  { title: 'Grounding Exercise', duration: '5 min', description: '5-4-3-2-1 sensory technique', icon: Brain },
  { title: 'Breathing Exercise', duration: '3 min', description: 'Box breathing for anxiety', icon: Heart },
  { title: 'Thought Reframing', duration: '10 min', description: 'CBT worksheet for negative thoughts', icon: Edit3 },
  { title: 'Crisis Safety Plan', duration: '15 min', description: 'Emergency contact and coping strategies', icon: Shield }
];

const interventionLibrary = [
  { title: 'Anxiety Management Toolkit', type: 'worksheet', category: 'CBT', duration: '20 min', rating: 4.8 },
  { title: 'Depression Mood Tracker', type: 'tool', category: 'Behavioral', duration: '5 min', rating: 4.6 },
  { title: 'Stress Reduction Audio', type: 'audio', category: 'Relaxation', duration: '15 min', rating: 4.9 },
  { title: 'Sleep Hygiene Guide', type: 'guide', category: 'Wellness', duration: '10 min', rating: 4.7 }
];

export function ProfessionalHome({ currentLanguage, onLanguageChange, onBackToRoleSelection, onStartSession, onViewSessionRequests }: ProfessionalHomeProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState('queue');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const averageRating = studentRatings.reduce((sum, rating) => sum + rating.rating, 0) / studentRatings.length;
  const totalRatings = studentRatings.length;

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
            <Badge variant="outline" className="ml-2 text-xs">Professional</Badge>
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

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-[#657FA4] to-[#8BAAC6] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👩‍⚕️
                </div>
                <div className="flex-1">
                  <h2 className="text-white mb-1">Dr. Priya Sharma</h2>
                  <p className="text-white/90 text-sm mb-3">Licensed Clinical Psychologist • Mind Mitra Certified</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#AED6D2] hover:bg-white text-[#0F1722]"
                      onClick={onViewSessionRequests}
                    >
                      Session Requests
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {todayStats.map((stat, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#0F1722] mb-1">{stat.value}</h4>
                  <p className="text-[#55707F] text-xs">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Main Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="queue">Queue</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>

            {/* Client Queue & Triage */}
            <TabsContent value="queue" className="mt-4 space-y-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2E2E2E]">Client Queue & Triage</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {clientQueue.map((client, index) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card 
                        className={`border hover:shadow-md transition-all cursor-pointer ${
                          selectedClient?.id === client.id ? 'ring-2 ring-[#657FA4]' : ''
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E]">
                                {client.mood}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[#2E2E2E] font-semibold text-sm">{client.anonymousId}</h4>
                                <Badge className={getRiskColor(client.riskLevel)}>
                                  {client.riskLevel.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-xs">{client.tag}</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-[#5C5C5C]">
                                <span>Scheduled: {client.scheduledTime}</span>
                                <span>Risk Score: {client.riskScore}</span>
                                <span>Last active: {client.lastActive}</span>
                                <span>Language: {client.preferredLanguage}</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-[#5C5C5C]">
                                  Keywords: {client.topKeywords.join(', ')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button size="sm" className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                                Open Summary
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onStartSession?.();
                                }}
                              >
                                Start Session
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Client Summary Panel */}
              {selectedClient && (
                <Card className="bg-white border-[#657FA4] border-2">
                  <CardHeader className="bg-[#657FA4] text-white">
                    <CardTitle className="flex items-center justify-between">
                      Client Summary - {selectedClient.anonymousId}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/20"
                        onClick={() => setSelectedClient(null)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Client Info</h5>
                        <div className="space-y-1 text-xs text-[#5C5C5C]">
                          <p>Consent: {selectedClient.consentStatus}</p>
                          <p>Language: {selectedClient.preferredLanguage}</p>
                          <p>Risk Score: {selectedClient.riskScore}/100</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Last 5 Check-ins</h5>
                        <div className="flex gap-1">
                          <span>😊</span><span>😐</span><span>😔</span><span>😰</span><span>😊</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Recent Interactions</h5>
                      <div className="bg-[#F4F7FA] p-3 rounded-lg">
                        <p className="text-xs italic text-[#5C5C5C]">
                          "I've been having trouble sleeping before exams. My mind keeps racing with worry about failing..."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                        onClick={() => onStartSession?.()}
                      >
                        Start Session
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Schedule Follow-up
                      </Button>
                      <Button variant="outline">
                        Request ID
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Professional Tools */}
            <TabsContent value="tools" className="mt-4 space-y-4">
              {/* Quick Intervention Kit */}
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Quick Intervention Kit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickInterventions.map((intervention, index) => (
                      <Card key={index} className="border hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#AED6D2] rounded-lg flex items-center justify-center">
                              <intervention.icon className="w-4 h-4 text-[#2E2E2E]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-1">
                                {intervention.title}
                              </h4>
                              <p className="text-xs text-[#5C5C5C] mb-2">
                                {intervention.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#5C5C5C]">{intervention.duration}</span>
                                <Button size="sm" className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                                  <Send className="w-3 h-3 mr-1" />
                                  Send
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resource & Referral Manager */}
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Resource & Referral Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {interventionLibrary.map((resource, index) => (
                      <Card key={index} className="border">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-semibold text-[#2E2E2E]">{resource.title}</h4>
                                <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                                <span>{resource.type}</span>
                                <span>{resource.duration}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{resource.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                              <Button size="sm" className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                                <Send className="w-3 h-3 mr-1" />
                                Assign
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Credential & Compliance Panel */}
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Credentials & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-[#2E2E2E]">License Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-[#2E2E2E]">Background Check</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-[#2E2E2E]">Code of Conduct</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Update License
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Professional Analytics */}
            <TabsContent value="analytics" className="mt-4 space-y-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Professional Analytics & Workload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">42</div>
                      <div className="text-sm text-[#5C5C5C]">Sessions This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">6.8</div>
                      <div className="text-sm text-[#5C5C5C]">Avg Case Severity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">2.5m</div>
                      <div className="text-sm text-[#5C5C5C]">Avg Wait Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#657FA4]">94%</div>
                      <div className="text-sm text-[#5C5C5C]">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Recent Sessions</h5>
                      <div className="space-y-2">
                        {recentSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                            <div className="flex items-center gap-2">
                              {session.type === 'video' && <Video className="w-4 h-4 text-[#657FA4]" />}
                              {session.type === 'voice' && <Phone className="w-4 h-4 text-[#657FA4]" />}
                              {session.type === 'chat' && <MessageCircle className="w-4 h-4 text-[#657FA4]" />}
                              <span className="text-sm text-[#2E2E2E]">{session.clientId}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-[#2E2E2E]">{session.duration}min</div>
                              <div className="text-xs text-[#5C5C5C]">{session.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Scheduling & Follow-up</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          View Calendar
                        </Button>
                        <Button variant="outline">
                          <Clock className="w-4 h-4 mr-2" />
                          Set Availability
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Student Ratings & Feedback */}
            <TabsContent value="ratings" className="mt-4 space-y-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E]">Student Ratings & Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Overall Rating Summary */}
                  <div className="flex items-center gap-6 mb-6 p-4 bg-white rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#657FA4]">{averageRating.toFixed(1)}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(averageRating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-[#5C5C5C] mt-1">{totalRatings} ratings</div>
                    </div>
                    
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Rating Distribution</h5>
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = studentRatings.filter(r => r.rating === rating).length;
                        const percentage = (count / totalRatings) * 100;
                        return (
                          <div key={rating} className="flex items-center gap-2 mb-1">
                            <span className="text-sm w-2">{rating}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <Progress value={percentage} className="flex-1 h-2" />
                            <span className="text-xs text-[#5C5C5C] w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Feedback */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-semibold text-[#2E2E2E]">Recent Feedback</h5>
                    {studentRatings.map((rating) => (
                      <Card key={rating.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E] text-xs">
                                {rating.clientId.slice(-3)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-[#2E2E2E]">{rating.clientId}</span>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star}
                                      className={`w-3 h-3 ${
                                        star <= rating.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <Badge variant="outline" className="text-xs">{rating.sessionType}</Badge>
                                <span className="text-xs text-[#5C5C5C]">{rating.date}</span>
                              </div>
                              
                              <div className="bg-[#F4F7FA] p-3 rounded-lg mb-2">
                                <p className="text-sm text-[#2E2E2E] italic">"{rating.feedback}"</p>
                              </div>
                              
                              <div className="flex items-center gap-2 text-xs text-[#5C5C5C]">
                                <MessageSquare className="w-3 h-3" />
                                <span>Reason: {rating.reason}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}