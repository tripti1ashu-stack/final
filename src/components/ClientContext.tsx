import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  ArrowRight,
  User,
  Brain,
  Heart,
  Clock,
  MapPin,
  GraduationCap,
  MessageCircle,
  FileText,
  AlertTriangle,
  Shield,
  Activity,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface ClientContextProps {
  onBack: () => void;
  onContinue: () => void;
  currentLanguage: string;
}

interface ClientInfo {
  anonymousId: string;
  riskScore: number;
  consentStatus: 'anonymous' | 'identified';
  preferredLanguage: string;
  sessionHistory: number;
  lastCheckIns: string[];
  flaggedKeywords: string[];
  campus: string;
  department: string;
  yearOfStudy: string;
  lastActive: string;
  currentIssue: string;
  mood: string;
  previousNotes: string[];
  attachments: any[];
  institutionContext: {
    hotspots: string[];
    departmentTrends: string;
  };
}

const clientInfo: ClientInfo = {
  anonymousId: 'Student_A318',
  riskScore: 78,
  consentStatus: 'anonymous',
  preferredLanguage: 'English',
  sessionHistory: 3,
  lastCheckIns: ['😰', '😔', '😐', '😊', '😔'],
  flaggedKeywords: ['panic', 'exam stress', 'sleepless', 'overwhelmed', 'failure'],
  campus: 'Main Campus',
  department: 'Computer Science',
  yearOfStudy: '3rd Year',
  lastActive: '5 min ago',
  currentIssue: 'Severe panic attacks before exams',
  mood: '😰',
  previousNotes: [
    'Student responded well to breathing exercises in last session',
    'Recommended sleep hygiene practices - need follow-up',
    'Family pressure mentioned as contributing factor'
  ],
  attachments: [],
  institutionContext: {
    hotspots: ['CS Department - High stress period', 'Exam season alerts'],
    departmentTrends: 'Computer Science students showing 23% increase in anxiety reports'
  }
};

const recentInteractions = [
  {
    date: 'Today, 09:45 AM',
    excerpt: 'I\'ve been having trouble sleeping for the past week. Every time I close my eyes, I think about failing my upcoming exams...',
    type: 'chat',
    sentiment: 'negative'
  },
  {
    date: 'Yesterday, 07:30 PM',
    excerpt: 'The breathing exercise helped a bit, but I still feel this constant knot in my stomach.',
    type: 'voice_note',
    sentiment: 'mixed'
  },
  {
    date: '2 days ago, 02:15 PM',
    excerpt: 'Thank you for the last session. I tried the grounding technique when I felt panic coming on.',
    type: 'chat',
    sentiment: 'positive'
  }
];

const riskIndicators = [
  { indicator: 'Sleep disruption', severity: 'high', trend: 'increasing' },
  { indicator: 'Academic performance anxiety', severity: 'high', trend: 'stable' },
  { indicator: 'Physical symptoms (panic)', severity: 'medium', trend: 'increasing' },
  { indicator: 'Social withdrawal', severity: 'low', trend: 'stable' }
];

export function ClientContext({ onBack, onContinue, currentLanguage }: ClientContextProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'decreasing': return <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#657FA4] border-b border-[#8BAAC6]/20 z-10">
        <div className="flex items-center justify-between p-4 h-14">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <div className="text-center">
            <h2 className="font-semibold text-white">Client Context</h2>
            <p className="text-xs text-white/80">{clientInfo.anonymousId}</p>
          </div>
          
          <Button
            onClick={onContinue}
            className="bg-[#AED6D2] hover:bg-white text-[#0F1722] text-sm px-4 py-2"
          >
            Start Session
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Client Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-[#657FA4] border-2">
            <CardHeader className="bg-[#657FA4] text-white">
              <CardTitle className="flex items-center justify-between">
                <span>Client Summary</span>
                <div className={`px-3 py-1 rounded-full text-sm ${getRiskColor(clientInfo.riskScore)}`}>
                  Risk: {clientInfo.riskScore}/100
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E] text-2xl">
                    {clientInfo.mood}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">{clientInfo.anonymousId}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-[#5C5C5C]">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Status: {clientInfo.consentStatus}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>Language: {clientInfo.preferredLanguage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Sessions: {clientInfo.sessionHistory}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Active: {clientInfo.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Institution Context</h5>
                  <div className="space-y-1 text-xs text-[#5C5C5C]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{clientInfo.campus}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{clientInfo.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{clientInfo.yearOfStudy}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Current Issue</h5>
                  <p className="text-xs text-[#5C5C5C]">{clientInfo.currentIssue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Risk Assessment & Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskIndicators.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#2E2E2E]">{risk.indicator}</span>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(risk.trend)}
                    <span className="text-xs text-[#5C5C5C] capitalize">{risk.trend}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Check-ins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#657FA4]" />
                Mood Pattern (Last 5 Check-ins)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {clientInfo.lastCheckIns.map((mood, index) => (
                    <div key={index} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl border-2 border-[#AED6D2]">
                      {mood}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#5C5C5C] mb-2">Trend: Declining mood pattern</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flagged Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#657FA4]" />
                Key Concerns & Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {clientInfo.flaggedKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-orange-700 border-orange-300 bg-orange-50">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#657FA4]" />
                Recent Interactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border-l-4 border-l-[#657FA4]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#5C5C5C]">{interaction.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {interaction.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#2E2E2E] italic">"{interaction.excerpt}"</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Previous Session Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#657FA4]" />
                Previous Session Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clientInfo.previousNotes.map((note, index) => (
                <div key={index} className="p-2 bg-white rounded-lg text-sm text-[#2E2E2E]">
                  • {note}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Institution Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Institution Context & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clientInfo.institutionContext.hotspots.map((hotspot, index) => (
                <div key={index} className="p-2 bg-white rounded-lg text-sm text-orange-800">
                  ⚠️ {hotspot}
                </div>
              ))}
              <div className="p-2 bg-white rounded-lg text-sm text-orange-800">
                📊 {clientInfo.institutionContext.departmentTrends}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="sticky bottom-4 pt-4"
        >
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Queue
            </Button>
            <Button 
              onClick={onContinue}
              className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
            >
              Start Session
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}