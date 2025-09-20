import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Settings, 
  Globe, 
  Moon, 
  Smile, 
  Activity, 
  Plus, 
  RefreshCw,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
  Droplets,
  Smartphone,
  Apple,
  Clock,
  HelpCircle,
  Download,
  Shield,
  AlertTriangle,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

interface MindBodyConnectionProps {
  onBack: () => void;
  currentLanguage: string;
}

export function MindBodyConnection({ onBack, currentLanguage }: MindBodyConnectionProps) {
  const [isFirstRun, setIsFirstRun] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Week');
  const [selectedChartType, setSelectedChartType] = useState('Time-series');
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [shareData, setShareData] = useState(false);
  const [allowDeviceIntegration, setAllowDeviceIntegration] = useState(false);
  const [showRiskBanner, setShowRiskBanner] = useState(false);
  const [lastSyncTime] = useState('09:13');

  // Mock data
  const weeklyData = [
    { date: 'Mon', sleep: 6.5, mood: 5, activity: 25 },
    { date: 'Tue', sleep: 5.8, mood: 4, activity: 15 },
    { date: 'Wed', sleep: 7.2, mood: 7, activity: 45 },
    { date: 'Thu', sleep: 6.9, mood: 6, activity: 30 },
    { date: 'Fri', sleep: 6.2, mood: 5, activity: 20 },
    { date: 'Sat', sleep: 8.1, mood: 8, activity: 60 },
    { date: 'Sun', sleep: 7.5, mood: 7, activity: 40 }
  ];

  const correlationData = [
    { sleep: 5.8, mood: 4 }, { sleep: 6.2, mood: 5 }, { sleep: 6.5, mood: 5 },
    { sleep: 6.9, mood: 6 }, { sleep: 7.2, mood: 7 }, { sleep: 7.5, mood: 7 },
    { sleep: 8.1, mood: 8 }
  ];

  const currentMetrics = {
    sleep: { value: 85, label: 'Good', color: '#AED6D2' },
    mood: { value: 6, label: 'Slightly Low', color: '#F5B942' },
    activity: { value: 18, label: 'Needs Attention', color: '#E35B5B' }
  };

  useEffect(() => {
    // Check if first run
    const hasSeenOnboarding = localStorage.getItem('mindmitra.mindbody.onboarding');
    if (!hasSeenOnboarding) {
      setIsFirstRun(true);
      setShowOnboarding(true);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setDataLoading(false);
    }, Math.random() * 300 + 300);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('mindmitra.mindbody.onboarding', 'true');
  };

  const quickAddItems = [
    { icon: '⏰', label: 'Sleep', type: 'sleep' },
    { icon: '😊', label: 'Mood', type: 'mood' },
    { icon: '🏃', label: 'Activity', type: 'activity' },
    { icon: '💧', label: 'Water', type: 'water' },
    { icon: '⌚', label: 'Screen', type: 'screen' },
    { icon: '🍎', label: 'Food', type: 'food' }
  ];

  const habits = [
    { title: "Dim screens 60m before bed", category: "Sleep" },
    { title: "10-min walk post lunch", category: "Activity" },
    { title: "2-min breathing on stress", category: "Mindfulness" },
    { title: "Glass of water on waking", category: "Hydration" }
  ];

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
        
        <h2 className="flex-1 text-white text-center font-semibold">Mind-Body</h2>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Globe className="w-4 h-4 text-white" />
          </Button>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Risk Banner */}
        <AnimatePresence>
          {showRiskBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <Alert className="border-[#E35B5B] bg-[#E35B5B]/10">
                <AlertTriangle className="h-4 w-4 text-[#E35B5B]" />
                <AlertDescription className="text-[#E35B5B] font-medium">
                  We notice some concerning patterns in your data.
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-[#E35B5B] border-[#E35B5B]">
                      Contact Volunteer (anon)
                    </Button>
                    <Button size="sm" className="bg-[#E35B5B] hover:bg-[#E35B5B]/90">
                      <Phone className="w-4 h-4 mr-1" />
                      Crisis Helpline
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] flex items-center justify-center">
                  <div className="text-xl">🧠💝</div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[#2E2E2E] font-semibold mb-1">
                    Today: Mood — {currentMetrics.mood.label}
                  </h3>
                  <p className="text-[#5C5C5C] text-sm">
                    Sleep 6.5h • Activity 18m • Screen 6h
                  </p>
                </div>
                
                <Sheet open={quickAddOpen} onOpenChange={setQuickAddOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] rounded-full px-4"
                    >
                      Quick Add
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[400px]">
                    <SheetHeader>
                      <SheetTitle>Quick Add Entry</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {quickAddItems.map((item, index) => (
                        <motion.div
                          key={item.type}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 border-[#AED6D2] hover:bg-[#AED6D2]/10"
                            onClick={() => setQuickAddOpen(false)}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xs">{item.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Metric Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 overflow-x-auto pb-2"
        >
          {[
            { icon: Moon, label: 'Sleep Score', value: currentMetrics.sleep.value, status: currentMetrics.sleep.label, color: currentMetrics.sleep.color },
            { icon: Smile, label: 'Mood Today', value: currentMetrics.mood.value, status: currentMetrics.mood.label, color: currentMetrics.mood.color },
            { icon: Activity, label: 'Activity Minutes', value: currentMetrics.activity.value, status: currentMetrics.activity.label, color: currentMetrics.activity.color }
          ].map((metric, index) => (
            <Card key={metric.label} className="min-w-[140px] bg-[#F4F7FA] border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-[#657FA4]" />
                  <span className="text-xs text-[#5C5C5C]">{metric.label}</span>
                </div>
                <div className="text-2xl font-bold text-[#2E2E2E] mb-1">{metric.value}</div>
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
                >
                  {metric.status}
                </Badge>
                {/* Mini sparkline placeholder */}
                <div className="h-8 mt-2 bg-gradient-to-r from-transparent via-[#AED6D2]/20 to-transparent rounded"></div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Interactive Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {['Day', 'Week', 'Month', '3M'].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className={selectedTimeRange === range 
                      ? "bg-[#657FA4] hover:bg-[#657FA4]/90" 
                      : "border-[#657FA4] text-[#657FA4] hover:bg-[#657FA4]/10"
                    }
                  >
                    {range}
                  </Button>
                ))}
              </div>
              
              <Tabs value={selectedChartType} onValueChange={setSelectedChartType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="Time-series">Time-series</TabsTrigger>
                  <TabsTrigger value="Correlation">Correlation</TabsTrigger>
                  <TabsTrigger value="Heatmap">Heatmap</TabsTrigger>
                </TabsList>
                
                <TabsContent value="Time-series" className="mt-4">
                  {dataLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#657FA4" opacity={0.2} />
                        <XAxis dataKey="date" stroke="#657FA4" />
                        <YAxis stroke="#657FA4" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#F4F7FA',
                            border: '1px solid #AED6D2',
                            borderRadius: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sleep" 
                          stroke="#657FA4" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Sleep Hours"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#AED6D2" 
                          strokeWidth={2}
                          name="Mood Rating"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </TabsContent>
                
                <TabsContent value="Correlation" className="mt-4">
                  {dataLoading ? (
                    <Skeleton className="h-48 w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <ScatterChart data={correlationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#657FA4" opacity={0.2} />
                        <XAxis dataKey="sleep" stroke="#657FA4" name="Sleep" />
                        <YAxis dataKey="mood" stroke="#657FA4" name="Mood" />
                        <Tooltip />
                        <Scatter dataKey="mood" fill="#AED6D2" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                  <div className="mt-2 text-center">
                    <Badge variant="secondary" className="bg-[#AED6D2]/20 text-[#657FA4]">
                      R² = 0.78
                    </Badge>
                  </div>
                </TabsContent>
                
                <TabsContent value="Heatmap" className="mt-4">
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }, (_, i) => (
                      <div 
                        key={i}
                        className="aspect-square rounded flex items-center justify-center text-xs font-medium"
                        style={{
                          backgroundColor: i % 7 === 0 || i % 7 === 6 
                            ? '#AED6D2' 
                            : i % 3 === 0 
                              ? '#F5B942' 
                              : '#E35B5B',
                          opacity: 0.7,
                          color: '#2E2E2E'
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>

        {/* AI Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
        >
          <Card className="bg-gradient-to-r from-[#AED6D2]/10 to-[#8BAAC6]/10 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#AED6D2] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#2E2E2E]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-[#2E2E2E]">AI Insight</h4>
                    <Badge variant="secondary" className="bg-[#5BB97E]/20 text-[#5BB97E]">
                      High Confidence
                    </Badge>
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                      <HelpCircle className="w-4 h-4 text-[#5C5C5C]" />
                    </Button>
                  </div>
                  <p className="text-[#2E2E2E] text-sm mb-3">
                    Lower sleep on Mon/Tue correlates with 18% lower mood — try a 30-minute wind-down routine before bed.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                      Add Wind-down to Routine
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#8BAAC6] text-[#657FA4]">
                      Remind me nightly
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#657FA4]" />
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Health App Integration</h4>
                    <p className="text-sm text-[#5C5C5C]">
                      {deviceConnected ? (
                        <>Connected • Last sync: {lastSyncTime}</>
                      ) : (
                        'Connect to sync your health data automatically'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {deviceConnected && (
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Sync now
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                    onClick={() => setDeviceConnected(!deviceConnected)}
                  >
                    {deviceConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Habit Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Recommended Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {habits.map((habit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#AED6D2]/30"
                  >
                    <div>
                      <p className="font-medium text-[#2E2E2E]">{habit.title}</p>
                      <p className="text-sm text-[#5C5C5C]">{habit.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                        Add to Routine
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-x-4 text-xs text-[#5C5C5C] pb-20"
        >
          <button className="hover:text-[#657FA4]">Privacy details</button>
          <span>•</span>
          <button className="hover:text-[#657FA4] flex items-center gap-1">
            <Download className="w-3 h-3" />
            Export data
          </button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Help</button>
        </motion.div>
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#AED6D2]/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#657FA4]" />
                </div>
                <h3 className="font-semibold text-[#2E2E2E] mb-2">Welcome to Mind-Body Connection</h3>
                <p className="text-sm text-[#5C5C5C]">
                  We collect sleep and activity data to provide personalized insights for your mental wellbeing.
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">Share data with institution</span>
                  <Switch checked={shareData} onCheckedChange={setShareData} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">Allow device integration</span>
                  <Switch checked={allowDeviceIntegration} onCheckedChange={setAllowDeviceIntegration} />
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#657FA4] hover:bg-[#657FA4]/90"
                onClick={handleOnboardingComplete}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}