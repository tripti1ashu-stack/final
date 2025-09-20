import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Users, 
  FileText,
  Calendar,
  Download,
  Filter,
  Bell,
  Eye,
  Clock,
  MapPin,
  Building,
  GraduationCap,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Shield,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AcademicStressReportsProps {
  onBack: () => void;
  currentLanguage: string;
}

interface FeedbackTrend {
  date: string;
  volume: number;
  critical: number;
}

interface AnonymousVoice {
  id: string;
  text: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  department?: string;
  year?: string;
}

interface RiskGroup {
  group: string;
  type: 'department' | 'year' | 'course';
  riskLevel: 'low' | 'medium' | 'high';
  count: number;
  trend: 'up' | 'down' | 'stable';
  primaryIssue: string;
}

interface EarlyWarning {
  id: string;
  type: 'spike' | 'keyword' | 'pattern';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  affectedGroups: string[];
}

const feedbackStats = {
  totalToday: 23,
  criticalAlerts: 2,
  mostReported: 'Academic Stress',
  trendChange: 15
};

const feedbackTrends: FeedbackTrend[] = [
  { date: '2024-01-15', volume: 45, critical: 3 },
  { date: '2024-01-14', volume: 38, critical: 2 },
  { date: '2024-01-13', volume: 52, critical: 5 },
  { date: '2024-01-12', volume: 41, critical: 1 },
  { date: '2024-01-11', volume: 35, critical: 2 },
  { date: '2024-01-10', volume: 48, critical: 4 },
  { date: '2024-01-09', volume: 42, critical: 2 }
];

const anonymousVoices: AnonymousVoice[] = [
  {
    id: '1',
    text: "I feel overwhelmed during group projects. The workload distribution is unfair and causing stress.",
    category: 'Academic Stress',
    severity: 'medium',
    timestamp: '2 hours ago',
    department: 'Computer Science',
    year: '2nd Year'
  },
  {
    id: '2',
    text: "Exam stress is giving me sleepless nights. I wish there were more study resources available.",
    category: 'Exam Anxiety',
    severity: 'high',
    timestamp: '4 hours ago',
    department: 'Electronics',
    year: '3rd Year'
  },
  {
    id: '3',
    text: "Faculty expectations are unclear for assignments. This creates unnecessary anxiety.",
    category: 'Faculty Relations',
    severity: 'medium',
    timestamp: '6 hours ago',
    department: 'Mechanical',
    year: '1st Year'
  },
  {
    id: '4',
    text: "Course load feels impossible to manage. Need better time management resources.",
    category: 'Course Load',
    severity: 'high',
    timestamp: '8 hours ago',
    department: 'Computer Science',
    year: '2nd Year'
  }
];

const riskGroups: RiskGroup[] = [
  {
    group: 'Computer Science - 2nd Year',
    type: 'department',
    riskLevel: 'high',
    count: 34,
    trend: 'up',
    primaryIssue: 'Course Load'
  },
  {
    group: 'Electronics - 3rd Year',
    type: 'department',
    riskLevel: 'medium',
    count: 28,
    trend: 'stable',
    primaryIssue: 'Exam Anxiety'
  },
  {
    group: 'All 1st Years',
    type: 'year',
    riskLevel: 'medium',
    count: 45,
    trend: 'up',
    primaryIssue: 'Academic Adjustment'
  },
  {
    group: 'Final Year Students',
    type: 'year',
    riskLevel: 'high',
    count: 39,
    trend: 'down',
    primaryIssue: 'Placement Stress'
  }
];

const earlyWarnings: EarlyWarning[] = [
  {
    id: '1',
    type: 'spike',
    title: 'Sudden increase in academic stress reports',
    description: '40% spike in reports from Computer Science department in last 24 hours',
    severity: 'high',
    timestamp: '2 hours ago',
    affectedGroups: ['Computer Science - 2nd Year', 'Computer Science - 3rd Year']
  },
  {
    id: '2',
    type: 'keyword',
    title: 'Concerning keywords detected',
    description: 'Multiple reports mentioning "overwhelming workload" and "burnout"',
    severity: 'medium',
    timestamp: '4 hours ago',
    affectedGroups: ['Electronics Department', 'Mechanical Department']
  },
  {
    id: '3',
    type: 'pattern',
    title: 'Recurring pattern identified',
    description: 'Weekly spike in exam anxiety reports every Thursday (assignment due day)',
    severity: 'medium',
    timestamp: '1 day ago',
    affectedGroups: ['All departments']
  }
];

const categoryDistribution = [
  { category: 'Academic Stress', percentage: 35, count: 89, change: 12 },
  { category: 'Exam Anxiety', percentage: 28, count: 71, change: 8 },
  { category: 'Course Load', percentage: 18, count: 46, change: -5 },
  { category: 'Faculty Relations', percentage: 12, count: 30, change: 15 },
  { category: 'Grading Concerns', percentage: 7, count: 18, change: -10 }
];

const aiRecommendations = [
  {
    title: 'Conduct de-stress workshop for 2nd year students',
    reason: 'High concentration of academic stress reports',
    impact: 'Expected 30% reduction in stress levels',
    urgency: 'high'
  },
  {
    title: 'Increase counseling hours during exam week',
    reason: 'Predictive model shows exam anxiety peak approaching',
    impact: 'Prevent 25% of potential crisis cases',
    urgency: 'medium'
  },
  {
    title: 'Faculty training on assignment clarity',
    reason: 'Multiple reports about unclear expectations',
    impact: 'Improve student-faculty relations by 40%',
    urgency: 'medium'
  }
];

export function AcademicStressReports({ onBack, currentLanguage }: AcademicStressReportsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#657FA4] border-b border-[#8BAAC6]/20">
        <div className="flex items-center justify-between p-4 h-14">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <div className="text-center">
            <h2 className="font-semibold text-white">Anonymous Student Voices</h2>
            <p className="text-xs text-white/80">Academic Stress & Early Warning System</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between text-xs text-white/80">
            <span>Last updated: {lastUpdated}</span>
            <span>Real-time monitoring active</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-[#F4F7FA] to-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#657FA4]">{feedbackStats.totalToday}</div>
                  <div className="text-xs text-[#5C5C5C]">Feedbacks Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{feedbackStats.criticalAlerts}</div>
                  <div className="text-xs text-[#5C5C5C]">Critical Alerts</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2E2E2E]">{feedbackStats.mostReported}</div>
                  <div className="text-xs text-[#5C5C5C]">Most Reported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">+{feedbackStats.trendChange}%</div>
                  <div className="text-xs text-[#5C5C5C]">Trend Change</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feedback Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#657FA4]" />
                  Feedback Trends
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feedbackTrends.map((trend, index) => (
                  <div key={trend.date} className="flex items-center gap-4">
                    <div className="w-16 text-xs text-[#5C5C5C]">
                      {new Date(trend.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#2E2E2E]">{trend.volume} reports</span>
                        {trend.critical > 0 && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            {trend.critical} critical
                          </Badge>
                        )}
                      </div>
                      <Progress value={(trend.volume / 60) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Anonymous Voices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#657FA4]" />
                Anonymous Student Voices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anonymousVoices.map((voice, index) => (
                  <motion.div
                    key={voice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#AED6D2] rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-[#2E2E2E]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getSeverityColor(voice.severity)}>
                                {voice.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {voice.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-[#2E2E2E] text-sm leading-relaxed mb-3 italic">
                              "{voice.text}"
                            </p>
                            <div className="flex items-center justify-between text-xs text-[#5C5C5C]">
                              <div className="flex items-center gap-3">
                                {voice.department && (
                                  <div className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    <span>{voice.department}</span>
                                  </div>
                                )}
                                {voice.year && (
                                  <div className="flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    <span>{voice.year}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{voice.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Issue Distribution & At-Risk Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="distribution">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="distribution">Issue Distribution</TabsTrigger>
              <TabsTrigger value="risk-groups">At-Risk Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="distribution" className="mt-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#657FA4]" />
                    Academic Issue Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryDistribution.map((category, index) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#2E2E2E] text-sm">{category.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[#2E2E2E] font-semibold">{category.percentage}%</span>
                            <span className={`text-xs ${
                              category.change > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {category.change > 0 ? '+' : ''}{category.change}%
                            </span>
                          </div>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <p className="text-xs text-[#5C5C5C]">{category.count} reports this period</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="risk-groups" className="mt-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#657FA4]" />
                    At-Risk Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {riskGroups.map((group, index) => (
                      <motion.div
                        key={group.group}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="border hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-[#2E2E2E] text-sm font-semibold">{group.group}</h4>
                                  <Badge className={`text-xs ${getRiskColor(group.riskLevel)}`}>
                                    {group.riskLevel.toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                                  <span>{group.count} affected students</span>
                                  <span>Primary: {group.primaryIssue}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getTrendIcon(group.trend)}
                                <ChevronRight className="w-4 h-4 text-[#5C5C5C]" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Early Warning System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Early Warning System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earlyWarnings.map((warning, index) => (
                  <motion.div
                    key={warning.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className={`border-l-4 ${
                      warning.severity === 'critical' ? 'border-red-500 bg-red-50' :
                      warning.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                      'border-yellow-500 bg-yellow-50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            warning.severity === 'critical' ? 'bg-red-200' :
                            warning.severity === 'high' ? 'bg-orange-200' :
                            'bg-yellow-200'
                          }`}>
                            {warning.type === 'spike' && <TrendingUp className="w-4 h-4" />}
                            {warning.type === 'keyword' && <Eye className="w-4 h-4" />}
                            {warning.type === 'pattern' && <Activity className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-[#2E2E2E] font-semibold text-sm">{warning.title}</h4>
                              <Badge className={getSeverityColor(warning.severity)}>
                                {warning.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-[#5C5C5C] text-sm mb-2">{warning.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-[#5C5C5C]">
                                <span>Affected: {warning.affectedGroups.join(', ')}</span>
                                <span>{warning.timestamp}</span>
                              </div>
                              <Button size="sm" className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                                Investigate
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/30">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#657FA4]" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            rec.urgency === 'high' ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            <Target className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-[#2E2E2E] font-semibold text-sm">{rec.title}</h4>
                              <Badge className={rec.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                                {rec.urgency.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-[#5C5C5C] text-xs mb-2">{rec.reason}</p>
                            <p className="text-[#2E2E2E] text-sm font-semibold">{rec.impact}</p>
                          </div>
                          <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white h-auto p-4 flex flex-col gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">Escalate to Mental Health Cell</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Bell className="w-5 h-5" />
                  <span className="text-sm">Notify Faculty Mentors</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Schedule Event</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Download Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}