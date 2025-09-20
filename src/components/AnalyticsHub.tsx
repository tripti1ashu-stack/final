import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Users, 
  AlertTriangle, 
  FileText,
  MapPin,
  Calendar,
  Download,
  Share,
  Eye,
  Activity,
  Brain,
  Target,
  Award,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  Globe,
  Lightbulb,
  Zap,
  Clock,
  Building,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";

interface AnalyticsHubProps {
  onBack: () => void;
  currentLanguage: string;
}

interface KPIData {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

interface HotspotData {
  id: string;
  name: string;
  type: 'department' | 'hostel' | 'building';
  riskLevel: 'stable' | 'at-risk' | 'high-risk';
  reports: number;
  topIssue: string;
  severity: number;
}

interface CategoryData {
  category: string;
  percentage: number;
  count: number;
  change: number;
  color: string;
}

interface InterventionData {
  name: string;
  type: 'workshop' | 'counseling' | 'peer-support' | 'awareness';
  beforeScore: number;
  afterScore: number;
  improvement: number;
  participants: number;
  date: string;
}

const kpiData: KPIData[] = [
  { label: 'Total Students Engaged', value: '2,847', change: 12, trend: 'up', icon: Users, color: 'text-blue-600' },
  { label: 'Reports This Month', value: '156', change: 8, trend: 'up', icon: FileText, color: 'text-green-600' },
  { label: 'Critical Cases Flagged', value: '3', change: -25, trend: 'down', icon: AlertTriangle, color: 'text-red-600' },
  { label: 'Average Stress Index', value: '6.2', change: -5, trend: 'down', icon: Activity, color: 'text-orange-600' },
  { label: 'Wellness Score', value: '78%', change: 15, trend: 'up', icon: Brain, color: 'text-purple-600' },
  { label: 'Intervention Rate', value: '92%', change: 7, trend: 'up', icon: Target, color: 'text-teal-600' }
];

const hotspots: HotspotData[] = [
  { id: 'cse-dept', name: 'Computer Science Dept', type: 'department', riskLevel: 'high-risk', reports: 45, topIssue: 'Academic Stress', severity: 85 },
  { id: 'hostel-a', name: 'Hostel A - North Wing', type: 'hostel', riskLevel: 'at-risk', reports: 32, topIssue: 'Sleep Issues', severity: 65 },
  { id: 'library', name: 'Central Library', type: 'building', riskLevel: 'stable', reports: 8, topIssue: 'Noise Levels', severity: 35 },
  { id: 'ece-dept', name: 'Electronics Dept', type: 'department', riskLevel: 'at-risk', reports: 28, topIssue: 'Exam Anxiety', severity: 70 },
  { id: 'hostel-b', name: 'Hostel B - South Wing', type: 'hostel', riskLevel: 'stable', reports: 15, topIssue: 'Social Issues', severity: 40 }
];

const categoryData: CategoryData[] = [
  { category: 'Academic Stress', percentage: 35, count: 89, change: 12, color: '#657FA4' },
  { category: 'Exam Anxiety', percentage: 28, count: 71, change: 8, color: '#8BAAC6' },
  { category: 'Course Load', percentage: 18, count: 46, change: -5, color: '#AED6D2' },
  { category: 'Faculty Relations', percentage: 12, count: 30, change: 15, color: '#B8E6B8' },
  { category: 'Grading Concerns', percentage: 7, count: 18, change: -10, color: '#F0C27B' }
];

const interventions: InterventionData[] = [
  { name: 'Stress Management Workshop', type: 'workshop', beforeScore: 7.2, afterScore: 5.8, improvement: 19, participants: 89, date: '2024-01-15' },
  { name: 'Peer Mentorship Program', type: 'peer-support', beforeScore: 6.8, afterScore: 5.1, improvement: 25, participants: 156, date: '2024-01-10' },
  { name: 'Faculty-Student Meet', type: 'awareness', beforeScore: 7.5, afterScore: 6.2, improvement: 17, participants: 67, date: '2024-01-08' },
  { name: 'Counseling Sessions', type: 'counseling', beforeScore: 8.1, afterScore: 6.0, improvement: 26, participants: 34, date: '2024-01-05' }
];

const aiRecommendations = [
  { 
    title: 'Introduce guided meditation during exams', 
    impact: '25% stress reduction predicted',
    confidence: 92,
    timeframe: '2 weeks',
    icon: Brain
  },
  { 
    title: 'Add peer mentorship for 1st years', 
    impact: 'Lower academic anxiety by 30%',
    confidence: 88,
    timeframe: '1 month',
    icon: Users
  },
  { 
    title: 'Faculty training on student support', 
    impact: 'Improve faculty relations by 40%',
    confidence: 85,
    timeframe: '3 weeks',
    icon: Award
  }
];

export function AnalyticsHub({ onBack, currentLanguage }: AnalyticsHubProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedView, setSelectedView] = useState('department');
  const [timeSlider, setTimeSlider] = useState([100]);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'high-risk': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
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
            <h2 className="font-semibold text-white">📊 Analytics Hub</h2>
            <p className="text-xs text-white/80">Turning Data into Action</p>
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
        {/* Executive Summary KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#2E2E2E]">Executive Summary</h3>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-gradient-to-br from-[#F4F7FA] to-white border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                      <div className="flex items-center gap-1">
                        {getTrendIcon(kpi.trend)}
                        <span className={`text-xs font-semibold ${
                          kpi.change > 0 ? 'text-green-600' : kpi.change < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {kpi.change > 0 ? '+' : ''}{kpi.change}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#2E2E2E] mb-1">{kpi.value}</div>
                    <p className="text-[#5C5C5C] text-xs">{kpi.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Hotspot Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#657FA4]" />
                  Campus Hotspot Analysis
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedView('department')}>
                    Department
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedView('hostel')}>
                    Hostel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-[#5C5C5C]">Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-[#5C5C5C]">At Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-[#5C5C5C]">High Risk</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {hotspots.map((hotspot, index) => (
                  <motion.div
                    key={hotspot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-[#2E2E2E] text-sm font-semibold">{hotspot.name}</h4>
                              <Badge className={`text-xs ${getRiskColor(hotspot.riskLevel)}`}>
                                {hotspot.riskLevel.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-[#5C5C5C]">
                              <span>{hotspot.reports} reports</span>
                              <span>Top: {hotspot.topIssue}</span>
                              <span>Severity: {hotspot.severity}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={hotspot.severity} className="w-16 h-2 mb-1" />
                            <ChevronRight className="w-4 h-4 text-[#5C5C5C] mx-auto" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#5C5C5C]" />
                  <span className="text-sm text-[#5C5C5C]">Time-lapse View</span>
                </div>
                <Slider
                  value={timeSlider}
                  onValueChange={setTimeSlider}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#5C5C5C] mt-1">
                  <span>Last Month</span>
                  <span>Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Issue Category Breakdown & Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="categories">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="categories">Issue Categories</TabsTrigger>
              <TabsTrigger value="trends">Predictive Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#657FA4]" />
                    Issue Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-[#2E2E2E] text-sm">{category.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#2E2E2E] font-semibold text-sm">{category.percentage}%</span>
                            <span className={`text-xs ${
                              category.change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {category.change > 0 ? '+' : ''}{category.change}%
                            </span>
                          </div>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <p className="text-xs text-[#5C5C5C]">{category.count} reports this month</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-4">
              <Card className="bg-[#F4F7FA] border-0">
                <CardHeader>
                  <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#657FA4]" />
                    Predictive Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <h4 className="text-[#2E2E2E] font-semibold text-sm mb-1">Exam Period Prediction</h4>
                      <p className="text-[#5C5C5C] text-xs">Stress levels expected to spike 40% during final exams (next week)</p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <h4 className="text-[#2E2E2E] font-semibold text-sm mb-1">Seasonal Pattern</h4>
                      <p className="text-[#5C5C5C] text-xs">Academic stress typically increases by 35% every semester during mid-terms</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <h4 className="text-[#2E2E2E] font-semibold text-sm mb-1">Intervention Window</h4>
                      <p className="text-[#5C5C5C] text-xs">Optimal time for stress management workshop: 2 weeks before exams</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Intervention Effectiveness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#657FA4]" />
                Intervention Impact Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventions.map((intervention, index) => (
                  <motion.div
                    key={intervention.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-[#2E2E2E] font-semibold text-sm">{intervention.name}</h4>
                            <p className="text-[#5C5C5C] text-xs">{intervention.participants} participants • {intervention.date}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {intervention.improvement}% improvement
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-red-600">{intervention.beforeScore}</div>
                            <div className="text-xs text-[#5C5C5C]">Before</div>
                          </div>
                          <div className="flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-[#5C5C5C]" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{intervention.afterScore}</div>
                            <div className="text-xs text-[#5C5C5C]">After</div>
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
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/30">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#657FA4]" />
                AI-Powered Recommendations
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
                    <Card className="border hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#AED6D2] rounded-full flex items-center justify-center">
                            <rec.icon className="w-5 h-5 text-[#2E2E2E]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#2E2E2E] font-semibold text-sm mb-1">{rec.title}</h4>
                            <p className="text-[#5C5C5C] text-xs mb-2">{rec.impact}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3 text-green-600" />
                                <span>{rec.confidence}% confidence</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-600" />
                                <span>{rec.timeframe}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                            Implement
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

        {/* Action Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white h-auto p-4 flex flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Download Report</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Share className="w-5 h-5" />
                  <span className="text-sm">Share Dashboard</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Schedule Campaign</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="text-sm">Custom Report</span>
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