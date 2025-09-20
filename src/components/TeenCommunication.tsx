import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  PlayCircle,
  MessageCircle,
  Target,
  BookOpen,
  Video,
  Headphones,
  Star,
  Award,
  Download,
  Share,
  Bookmark,
  Lightbulb,
  AlertTriangle,
  Brain,
  RefreshCw,
  Mic,
  Send,
  Phone,
  Globe,
  Accessibility,
  CheckCircle2,
  Clock,
  Users,
  Heart,
  FileText,
  Eye,
  ThumbsUp,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface TeenCommunicationProps {
  onBack: () => void;
  currentLanguage: string;
}

interface ModuleSection {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'reading' | 'activity' | 'quiz';
  duration: string;
  completed: boolean;
  locked: boolean;
  description: string;
  content?: string;
}

const moduleProgress = {
  overall: 65,
  completedSections: 8,
  totalSections: 12,
  timeSpent: "2h 15m",
  lastAccessed: "2 days ago"
};

const moduleSections: ModuleSection[] = [
  {
    id: '1',
    title: 'Understanding Teen Development',
    type: 'video',
    duration: '12 min',
    completed: true,
    locked: false,
    description: 'Learn about adolescent brain development and emotional changes',
    content: 'Understanding how teenagers think and feel is crucial for effective communication...'
  },
  {
    id: '2',
    title: 'Active Listening Techniques',
    type: 'audio',
    duration: '8 min',
    completed: true,
    locked: false,
    description: 'Master the art of truly hearing what your teen is saying',
    content: 'Active listening involves more than just hearing words...'
  },
  {
    id: '3',
    title: 'Building Trust and Rapport',
    type: 'reading',
    duration: '15 min',
    completed: true,
    locked: false,
    description: 'Establish a foundation of trust with your teenager',
    content: 'Trust is the cornerstone of any meaningful relationship...'
  },
  {
    id: '4',
    title: 'Handling Difficult Conversations',
    type: 'video',
    duration: '18 min',
    completed: true,
    locked: false,
    description: 'Navigate challenging topics with confidence and empathy',
    content: 'Difficult conversations are inevitable in parent-teen relationships...'
  },
  {
    id: '5',
    title: 'Setting Boundaries with Compassion',
    type: 'activity',
    duration: '10 min',
    completed: true,
    locked: false,
    description: 'Learn to set healthy limits while maintaining connection',
    content: 'Boundaries help teens feel safe and understand expectations...'
  },
  {
    id: '6',
    title: 'Recognizing Mental Health Warning Signs',
    type: 'reading',
    duration: '20 min',
    completed: true,
    locked: false,
    description: 'Identify when your teen might need professional support',
    content: 'Early recognition of mental health challenges is crucial...'
  },
  {
    id: '7',
    title: 'Technology and Digital Communication',
    type: 'video',
    duration: '14 min',
    completed: true,
    locked: false,
    description: 'Navigate the digital world and screen time discussions',
    content: 'Digital communication has transformed how teens interact...'
  },
  {
    id: '8',
    title: 'Practice Scenario: Academic Stress',
    type: 'activity',
    duration: '15 min',
    completed: true,
    locked: false,
    description: 'Role-play handling conversations about school pressure',
    content: 'Practice makes perfect when it comes to communication skills...'
  },
  {
    id: '9',
    title: 'Supporting Teen Independence',
    type: 'reading',
    duration: '12 min',
    completed: false,
    locked: false,
    description: 'Balance guidance with allowing autonomy',
    content: 'Teens need space to grow while still feeling supported...'
  },
  {
    id: '10',
    title: 'Crisis Communication',
    type: 'video',
    duration: '22 min',
    completed: false,
    locked: false,
    description: 'What to do when your teen is in crisis',
    content: 'Crisis situations require specific communication approaches...'
  },
  {
    id: '11',
    title: 'Building Long-term Connection',
    type: 'activity',
    duration: '18 min',
    completed: false,
    locked: true,
    description: 'Strategies for maintaining close relationships over time',
    content: 'Long-lasting relationships require ongoing effort and adaptation...'
  },
  {
    id: '12',
    title: 'Module Assessment',
    type: 'quiz',
    duration: '10 min',
    completed: false,
    locked: true,
    description: 'Test your knowledge and receive certification',
    content: 'Complete this assessment to earn your Teen Communication certificate...'
  }
];

const keyTakeaways = [
  "Validate your teen's emotions before offering solutions",
  "Use open-ended questions to encourage sharing",
  "Practice active listening without judgment",
  "Set consistent boundaries with clear explanations",
  "Recognize when professional help might be needed"
];

const expertTips = [
  {
    expert: "Dr. Priya Sharma",
    tip: "Remember that your teen's brain is still developing. Their emotional responses may seem dramatic, but they're very real to them.",
    category: "Development"
  },
  {
    expert: "Dr. Anjali Mehta",
    tip: "Create regular 'check-in' times that aren't tied to problems or discipline. This builds a foundation for open communication.",
    category: "Connection"
  },
  {
    expert: "Dr. Rohit Gupta",
    tip: "When your teen is upset, resist the urge to immediately fix the problem. Sometimes they just need to be heard.",
    category: "Listening"
  }
];

// Roleplay scenarios with comprehensive details
const roleplayScenarios = [
  {
    id: '1',
    title: 'Failed Grade Discussion',
    description: 'Your teen got a failing grade and is hiding it',
    difficulty: 'Medium' as const,
    category: 'Academic',
    prompt: 'Your teen got a failing grade and is hiding it. They are irritable and avoidant — how do you respond?',
    context: 'Your 16-year-old has been acting withdrawn lately. You just found out from a teacher that they failed their math test, but they haven\'t told you.'
  },
  {
    id: '2',
    title: 'Social Exclusion Concerns',
    description: 'Teen feels left out by friend group',
    difficulty: 'Easy' as const,
    category: 'Social',
    prompt: 'Your teen comes home upset because their friends excluded them from weekend plans. How do you help them process this?',
    context: 'Your teen is visibly upset and mentions that their friends made plans without including them. They seem hurt and confused.'
  },
  {
    id: '3',
    title: 'Substance Use Suspicion',
    description: 'You suspect your teen might be experimenting',
    difficulty: 'Hard' as const,
    category: 'Safety',
    prompt: 'You found something suspicious in your teen\'s room and suspect substance use. How do you approach this conversation?',
    context: 'You\'ve noticed some behavioral changes and found concerning items. You need to address this sensitively but directly.'
  },
  {
    id: '4',
    title: 'Mental Health Crisis',
    description: 'Teen expresses thoughts of self-harm',
    difficulty: 'Hard' as const,
    category: 'Crisis',
    prompt: 'Your teen has just said "I can\'t take this anymore" and you\'re worried about their mental state. How do you respond?',
    context: 'This is a crisis situation requiring immediate, careful attention and potentially professional intervention.'
  }
];

// Message templates with effectiveness ratings
const messageTemplates = [
  {
    category: 'I-Statements',
    title: 'For Conflict Resolution',
    template: 'I feel [emotion] when [situation] because [reason]. I need [request].',
    example: 'I feel worried when you don\'t answer my texts because I care about your safety. I need to know you\'re okay.',
    effectiveness: 85,
    culturalNote: 'Works well in direct communication cultures'
  },
  {
    category: 'Validation',
    title: 'Acknowledging Feelings',
    template: 'I can see that you\'re [feeling]. That must be [difficult/frustrating/scary].',
    example: 'I can see that you\'re really stressed about this exam. That must be overwhelming.',
    effectiveness: 92,
    culturalNote: 'Universal approach, culturally sensitive'
  },
  {
    category: 'Boundaries',
    title: 'Setting Limits with Compassion',
    template: 'I understand [teen\'s perspective], and [boundary] because [reason].',
    example: 'I understand you want more freedom, and curfew is 10 PM because your safety is important to me.',
    effectiveness: 78,
    culturalNote: 'Adapt timing based on family values'
  },
  {
    category: 'Problem-Solving',
    title: 'Collaborative Solutions',
    template: 'Let\'s work together on this. What do you think would help with [situation]?',
    example: 'Let\'s work together on this. What do you think would help with managing your homework load?',
    effectiveness: 88,
    culturalNote: 'Empowers teens while maintaining guidance'
  }
];

export function TeenCommunication({ onBack, currentLanguage }: TeenCommunicationProps) {
  const [selectedSection, setSelectedSection] = useState<ModuleSection | null>(moduleSections[8]);
  const [activeTab, setActiveTab] = useState('content');
  const [userNotes, setUserNotes] = useState('');
  const [showRoleplay, setShowRoleplay] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [roleplayMode, setRoleplayMode] = useState<'text' | 'voice' | 'guided'>('text');
  const [userResponse, setUserResponse] = useState('');
  const [aiCoachFeedback, setAiCoachFeedback] = useState<any>(null);
  const [practiceAttempts, setPracticeAttempts] = useState(0);
  const [improvementScore, setImprovementScore] = useState(0);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'activity': return <Target className="w-4 h-4" />;
      case 'quiz': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-600 bg-red-100';
      case 'audio': return 'text-purple-600 bg-purple-100';
      case 'reading': return 'text-blue-600 bg-blue-100';
      case 'activity': return 'text-green-600 bg-green-100';
      case 'quiz': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const startRoleplay = (scenario: any) => {
    setSelectedScenario(scenario);
    setShowRoleplay(true);
    setUserResponse('');
    setAiCoachFeedback(null);
    setPracticeAttempts(0);
  };

  const submitRoleplayResponse = () => {
    if (!userResponse.trim() || !selectedScenario) return;

    // Check for crisis indicators
    if (selectedScenario.category === 'Crisis' || userResponse.toLowerCase().includes('harm')) {
      setShowCrisisModal(true);
      return;
    }

    setPracticeAttempts(prev => prev + 1);

    // Simulate AI Coach analysis
    const feedback = analyzeResponse(userResponse, selectedScenario);
    setAiCoachFeedback(feedback);
    setImprovementScore(feedback.score);
  };

  const analyzeResponse = (response: string, scenario: any) => {
    // Simulate AI analysis
    const hasValidation = response.toLowerCase().includes('understand') || response.toLowerCase().includes('feel');
    const hasBlaming = response.toLowerCase().includes('why') || response.toLowerCase().includes('should');
    const hasEmpathy = response.toLowerCase().includes('worried') || response.toLowerCase().includes('help');

    let score = 60; // Base score
    let tone = 'neutral';
    let improvements = [];

    if (hasValidation) {
      score += 20;
      tone = 'empathetic';
    }
    
    if (hasBlaming) {
      score -= 15;
      tone = 'blaming';
      improvements.push('Avoid "why" questions that can sound accusatory');
    }

    if (hasEmpathy) {
      score += 15;
    }

    if (!hasValidation && !hasEmpathy) {
      improvements.push('Try starting with validation of their feelings');
    }

    const refinedScript = hasBlaming 
      ? response.replace(/Why did you/g, 'I can see that you\'re upset, and I\'d like to understand what happened')
      : response;

    return {
      score: Math.min(100, Math.max(0, score)),
      tone,
      refinedScript,
      improvements,
      suggestedNext: 'Ask an open-ended question to encourage them to share more'
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100'; 
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
                <h2 className="font-semibold">Teen Communication</h2>
                <p className="text-xs text-white/80">{moduleProgress.overall}% Complete</p>
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

      {/* Hero Section */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#657FA4] to-[#8BAAC6] relative">
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-lg font-bold">Speak. Listen. Connect.</h1>
                <p className="text-sm text-white/90">Practical, research-backed guidance to support your teen.</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex gap-3 mb-4">
                <Button 
                  className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                  onClick={() => startRoleplay(roleplayScenarios[0])}
                >
                  Start Practice
                </Button>
                <Button variant="outline" className="flex-1">
                  Take Quick Course
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="font-semibold text-[#2E2E2E]">8–15 min</div>
                  <div className="text-[#5C5C5C]">modules</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2E2E2E]">Lessons, Roleplay</div>
                  <div className="text-[#5C5C5C]">format</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2E2E2E]">Certificate</div>
                  <div className="text-[#5C5C5C]">on completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Module Navigation */}
        <div className="w-80 bg-[#F4F7FA] border-r border-[#E5E7EB] h-screen overflow-y-auto">
          <div className="p-4">
            {/* Progress Overview */}
            <Card className="mb-4 border-0 bg-white">
              <CardContent className="p-4">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-[#657FA4]">{moduleProgress.overall}%</div>
                  <div className="text-sm text-[#5C5C5C]">Module Progress</div>
                </div>
                <Progress value={moduleProgress.overall} className="mb-3" />
                <div className="grid grid-cols-2 gap-2 text-xs text-[#5C5C5C]">
                  <div>Completed: {moduleProgress.completedSections}/{moduleProgress.totalSections}</div>
                  <div>Time: {moduleProgress.timeSpent}</div>
                </div>
              </CardContent>
            </Card>

            {/* Module Sections */}
            <h3 className="text-sm font-semibold text-[#2E2E2E] mb-3">Module Sections</h3>
            <div className="space-y-2">
              {moduleSections.map((section, index) => (
                <Card 
                  key={section.id} 
                  className={`cursor-pointer transition-all border-0 ${
                    selectedSection?.id === section.id 
                      ? 'bg-[#657FA4] text-white' 
                      : 'bg-white hover:bg-gray-50'
                  } ${section.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !section.locked && setSelectedSection(section)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        section.completed 
                          ? 'bg-green-100 text-green-600' 
                          : selectedSection?.id === section.id
                          ? 'bg-white/20 text-white'
                          : getTypeColor(section.type)
                      }`}>
                        {section.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          getTypeIcon(section.type)
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">
                            {index + 1}. {section.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-80">
                          <Clock className="w-3 h-3" />
                          <span>{section.duration}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              selectedSection?.id === section.id 
                                ? 'border-white/30 text-white' 
                                : ''
                            }`}
                          >
                            {section.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {selectedSection ? (
            <div className="p-6 max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">{selectedSection.title}</h1>
                    <p className="text-[#5C5C5C]">{selectedSection.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(selectedSection.type)}`}>
                      {getTypeIcon(selectedSection.type)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#2E2E2E]">{selectedSection.duration}</div>
                      <div className="text-xs text-[#5C5C5C] capitalize">{selectedSection.type}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Live Roleplay Practice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-2 border-[#657FA4] bg-gradient-to-r from-[#F4F7FA] to-white mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#657FA4]" />
                      Live Roleplay Practice
                      <Badge className="bg-[#AED6D2] text-[#2E2E2E]">Core Feature</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#5C5C5C] mb-4">
                      Practice real conversations, get AI feedback, and refine your approach until you feel confident.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {roleplayScenarios.slice(0, 4).map((scenario) => (
                        <Card 
                          key={scenario.id}
                          className="cursor-pointer hover:shadow-md transition-shadow border-0 bg-white"
                          onClick={() => startRoleplay(scenario)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={getDifficultyColor(scenario.difficulty)}>
                                {scenario.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {scenario.category}
                              </Badge>
                            </div>
                            <h4 className="font-semibold text-[#2E2E2E] text-sm mb-1">{scenario.title}</h4>
                            <p className="text-xs text-[#5C5C5C]">{scenario.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                      onClick={() => startRoleplay(roleplayScenarios[0])}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Practice Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Message Templates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 bg-[#F4F7FA] mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-[#657FA4]" />
                      Message Templates & Scripts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {messageTemplates.map((template, index) => (
                        <Card 
                          key={index}
                          className="cursor-pointer hover:shadow-md transition-shadow bg-white border-0"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTemplateModal(true);
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-[#2E2E2E]">{template.title}</h4>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {template.category}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-[#657FA4]">
                                  {template.effectiveness}% effective
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs text-[#5C5C5C]">Recommended</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-[#5C5C5C] mb-2 italic">
                              "{template.example}"
                            </p>
                            <p className="text-xs text-[#657FA4]">
                              Cultural note: {template.culturalNote}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Content Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="tips">Expert Tips</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-6">
                    <Card className="border-0 bg-[#F4F7FA]">
                      <CardContent className="p-6">
                        {selectedSection.type === 'video' && (
                          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                            <Button className="bg-white text-[#2E2E2E] hover:bg-gray-100">
                              <PlayCircle className="w-6 h-6 mr-2" />
                              Play Video
                            </Button>
                          </div>
                        )}
                        
                        {selectedSection.type === 'audio' && (
                          <div className="bg-[#657FA4] rounded-lg p-6 flex items-center justify-center mb-4">
                            <Button className="bg-white text-[#2E2E2E] hover:bg-gray-100">
                              <PlayCircle className="w-6 h-6 mr-2" />
                              Play Audio
                            </Button>
                          </div>
                        )}

                        <div className="prose max-w-none">
                          <p className="text-[#2E2E2E] leading-relaxed">
                            {selectedSection.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes" className="mt-6">
                    <Card className="border-0 bg-[#F4F7FA]">
                      <CardContent className="p-6">
                        <h3 className="text-[#2E2E2E] mb-4">Your Notes</h3>
                        <Textarea
                          value={userNotes}
                          onChange={(e) => setUserNotes(e.target.value)}
                          placeholder="Take notes about key insights, questions, or ideas you want to remember..."
                          className="min-h-32 mb-4"
                        />
                        <Button className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                          Save Notes
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tips" className="mt-6">
                    <div className="space-y-4">
                      {expertTips.map((tip, index) => (
                        <Card key={index} className="border-0 bg-[#F4F7FA]">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-[#657FA4] rounded-full flex items-center justify-center text-white font-semibold">
                                {tip.expert.split(' ')[1][0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-[#2E2E2E]">{tip.expert}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {tip.category}
                                  </Badge>
                                </div>
                                <p className="text-[#5C5C5C] text-sm">"{tip.tip}"</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="mt-6">
                    <Card className="border-0 bg-[#F4F7FA]">
                      <CardContent className="p-6">
                        <h3 className="text-[#2E2E2E] mb-4">Key Takeaways</h3>
                        <div className="space-y-3">
                          {keyTakeaways.map((takeaway, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-[#657FA4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-semibold">{index + 1}</span>
                              </div>
                              <p className="text-[#2E2E2E] text-sm">{takeaway}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-[#657FA4] mx-auto mb-4" />
                <h3 className="text-[#2E2E2E] mb-2">Select a module to get started</h3>
                <p className="text-[#5C5C5C] text-sm">Choose from the sidebar to begin your learning journey</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Roleplay Practice Modal */}
      <Dialog open={showRoleplay} onOpenChange={setShowRoleplay}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Roleplay Practice: {selectedScenario?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedScenario && (
            <div className="space-y-4">
              {/* Scenario Context */}
              <Card className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                      {selectedScenario.difficulty}
                    </Badge>
                    <Badge variant="outline">{selectedScenario.category}</Badge>
                  </div>
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Scenario</h4>
                  <p className="text-sm text-[#5C5C5C] mb-3">{selectedScenario.context}</p>
                  <div className="p-3 bg-white rounded-lg border-l-4 border-l-[#657FA4]">
                    <p className="text-sm text-[#2E2E2E] font-medium">
                      {selectedScenario.prompt}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Mode Selection */}
              <div>
                <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                  Practice Mode
                </Label>
                <div className="flex gap-2">
                  {[
                    { id: 'text', label: 'Text', icon: MessageCircle },
                    { id: 'voice', label: 'Voice', icon: Mic },
                    { id: 'guided', label: 'Guided', icon: Lightbulb }
                  ].map((mode) => (
                    <Button
                      key={mode.id}
                      variant={roleplayMode === mode.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRoleplayMode(mode.id as any)}
                      className={roleplayMode === mode.id ? 'bg-[#657FA4]' : ''}
                    >
                      <mode.icon className="w-3 h-3 mr-1" />
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Response Input */}
              <div>
                <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                  Your Response
                </Label>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="How would you respond to your teen in this situation?"
                  className="min-h-24"
                />
                {practiceAttempts > 0 && (
                  <p className="text-xs text-[#5C5C5C] mt-1">
                    Attempt {practiceAttempts} • You can practice as many times as you'd like
                  </p>
                )}
              </div>

              {/* AI Coach Feedback */}
              {aiCoachFeedback && (
                <Card className="border-0 bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Coach Feedback
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{aiCoachFeedback.score}/100</div>
                          <div className="text-xs text-green-600">Score</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            aiCoachFeedback.tone === 'empathetic' ? 'text-green-700' :
                            aiCoachFeedback.tone === 'blaming' ? 'text-red-700' : 'text-orange-700'
                          }`}>
                            {aiCoachFeedback.tone}
                          </div>
                          <div className="text-xs text-green-600">Tone</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{improvementScore > 70 ? '✓' : '○'}</div>
                          <div className="text-xs text-green-600">Effective</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-lg">
                        <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Refined Script</h5>
                        <p className="text-sm text-[#5C5C5C] italic">"{aiCoachFeedback.refinedScript}"</p>
                      </div>

                      {aiCoachFeedback.improvements.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Areas to Improve</h5>
                          <ul className="space-y-1">
                            {aiCoachFeedback.improvements.map((improvement: string, index: number) => (
                              <li key={index} className="text-sm text-[#5C5C5C] flex items-start gap-2">
                                <Lightbulb className="w-3 h-3 mt-1 text-[#657FA4] flex-shrink-0" />
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Next step:</strong> {aiCoachFeedback.suggestedNext}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowRoleplay(false)}>
                  Close
                </Button>
                <Button 
                  onClick={submitRoleplayResponse}
                  disabled={!userResponse.trim()}
                  className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Feedback
                </Button>
                {aiCoachFeedback && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setUserResponse('');
                      setAiCoachFeedback(null);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message Template</DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#2E2E2E] mb-2">{selectedTemplate.title}</h4>
                <Badge variant="outline">{selectedTemplate.category}</Badge>
              </div>
              
              <div className="p-3 bg-[#F4F7FA] rounded-lg">
                <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Template</h5>
                <p className="text-sm text-[#5C5C5C] font-mono">{selectedTemplate.template}</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h5 className="text-sm font-semibold text-green-800 mb-1">Example</h5>
                <p className="text-sm text-green-700 italic">"{selectedTemplate.example}"</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="text-sm font-semibold text-blue-800 mb-1">Cultural Note</h5>
                <p className="text-sm text-blue-700">{selectedTemplate.culturalNote}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Save Template
                </Button>
                <Button className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send via App
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Crisis Modal */}
      <Dialog open={showCrisisModal} onOpenChange={setShowCrisisModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Crisis Support Needed
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-[#2E2E2E]">
              This scenario involves serious mental health concerns. If there is immediate danger, please call emergency services.
            </p>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-800 mb-2">Immediate Actions</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Stay calm and listen without judgment</li>
                  <li>• Do not leave them alone</li>
                  <li>• Remove any means of self-harm</li>
                  <li>• Contact a mental health professional immediately</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Services
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect to Crisis Expert
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Crisis Response Guide
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}