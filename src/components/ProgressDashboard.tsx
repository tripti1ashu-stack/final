import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Brain, Heart, Frown, Smile, Activity, Target, Award, ArrowLeft } from "lucide-react";

interface ProgressDashboardProps {
  currentLanguage: string;
  onBack?: () => void;
}

// Sample data for the past week
const weeklyData = [
  { day: 'Mon', stress: 65, happiness: 72, sadness: 28, overall: 70, date: '2024-01-08' },
  { day: 'Tue', stress: 58, happiness: 78, sadness: 22, overall: 75, date: '2024-01-09' },
  { day: 'Wed', stress: 70, happiness: 65, sadness: 35, overall: 65, date: '2024-01-10' },
  { day: 'Thu', stress: 52, happiness: 82, sadness: 18, overall: 82, date: '2024-01-11' },
  { day: 'Fri', stress: 45, happiness: 88, sadness: 12, overall: 88, date: '2024-01-12' },
  { day: 'Sat', stress: 38, happiness: 92, sadness: 8, overall: 92, date: '2024-01-13' },
  { day: 'Sun', stress: 35, happiness: 95, sadness: 5, overall: 95, date: '2024-01-14' },
];

// Prediction data for next week
const predictionData = [
  { day: 'Mon', predicted: 96, confidence: 85 },
  { day: 'Tue', predicted: 97, confidence: 80 },
  { day: 'Wed', predicted: 98, confidence: 75 },
  { day: 'Thu', predicted: 96, confidence: 70 },
  { day: 'Fri', predicted: 99, confidence: 85 },
  { day: 'Sat', predicted: 100, confidence: 90 },
  { day: 'Sun', predicted: 98, confidence: 85 },
];

// Activity completion data
const activityData = [
  { name: 'Breathing Exercises', completed: 85, color: '#657FA4' },
  { name: 'Meditation', completed: 70, color: '#8BAAC6' },
  { name: 'Journaling', completed: 60, color: '#AED6D2' },
  { name: 'Physical Activity', completed: 45, color: '#2E8B57' },
];

const COLORS = ['#657FA4', '#8BAAC6', '#AED6D2', '#2E8B57'];

export function ProgressDashboard({ currentLanguage, onBack }: ProgressDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  
  // Calculate trends
  const currentWeekAvg = weeklyData.reduce((sum, day) => sum + day.overall, 0) / weeklyData.length;
  const lastWeekAvg = 65; // Mock previous week average
  const improvement = currentWeekAvg - lastWeekAvg;
  const improvementPercentage = ((improvement / lastWeekAvg) * 100).toFixed(1);
  
  const currentStress = weeklyData[weeklyData.length - 1].stress;
  const currentHappiness = weeklyData[weeklyData.length - 1].happiness;
  const currentSadness = weeklyData[weeklyData.length - 1].sadness;

  const translations = {
    en: {
      title: "Mental Health Progress",
      weeklyOverview: "Weekly Overview",
      currentLevels: "Current Levels",
      stressLevel: "Stress Level",
      happinessLevel: "Happiness Level",
      sadnessLevel: "Sadness Level",
      improvementTrend: "Improvement Trend",
      prediction: "Next Week Prediction",
      activities: "Activity Completion",
      achievements: "Recent Achievements",
      insights: "AI Insights",
      week: "Week",
      month: "Month",
      low: "Low",
      moderate: "Moderate",
      high: "High",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      improvement: "improvement",
      decline: "decline",
      stable: "stable",
      predictionText: "Based on your current trend, your mental health is predicted to continue improving",
      insightText: "Your consistency with breathing exercises is showing great results! Consider adding more meditation sessions.",
      achievement1: "7-day streak completed",
      achievement2: "Stress reduced by 30%",
      achievement3: "Happiness increased by 23%"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const getStatusColor = (level: number) => {
    if (level >= 80) return "text-[#2E8B57]";
    if (level >= 60) return "text-[#8BAAC6]";
    if (level >= 40) return "text-[#657FA4]";
    return "text-[#E05656]";
  };

  const getStatusText = (level: number) => {
    if (level >= 80) return t.excellent;
    if (level >= 60) return t.good;
    if (level >= 40) return t.fair;
    return t.low;
  };

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="w-8 h-8 p-0 rounded-full hover:bg-[#F4F7FA]"
            >
              <ArrowLeft className="w-4 h-4 text-[#657FA4]" />
            </Button>
          )}
          <div>
            <h1 className="text-[#0F1722] mb-1">{t.title}</h1>
            <p className="text-[#55707F]">Track your mental wellness journey</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
            className="text-xs"
          >
            {t.week}
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
            className="text-xs"
          >
            {t.month}
          </Button>
        </div>
      </div>

      {/* Overall Trend Card */}
      <Card className="p-6 bg-gradient-to-r from-[#657FA4]/10 to-[#8BAAC6]/10 border-[#657FA4]/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#0F1722]">{t.weeklyOverview}</h2>
          <div className="flex items-center gap-2">
            {improvement > 0 ? (
              <TrendingUp className="w-5 h-5 text-[#2E8B57]" />
            ) : (
              <TrendingDown className="w-5 h-5 text-[#E05656]" />
            )}
            <Badge variant={improvement > 0 ? "default" : "destructive"} className="text-xs">
              {improvement > 0 ? '+' : ''}{improvementPercentage}%
            </Badge>
          </div>
        </div>
        
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#657FA4" opacity={0.2} />
              <XAxis dataKey="day" stroke="#55707F" fontSize={12} />
              <YAxis stroke="#55707F" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F4F7FA', 
                  border: '1px solid #657FA4',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="overall" 
                stroke="#657FA4" 
                fill="url(#overallGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#657FA4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#657FA4" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center">
          <div className="text-2xl font-semibold text-[#0F1722] mb-1">
            {currentWeekAvg.toFixed(0)}%
          </div>
          <p className="text-[#55707F] text-sm">Average wellness score this week</p>
        </div>
      </Card>

      {/* Current Levels */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">{t.currentLevels}</h2>
        <div className="space-y-4">
          {/* Stress Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-[#E05656]" />
              <div>
                <p className="font-medium text-[#0F1722]">{t.stressLevel}</p>
                <p className="text-xs text-[#55707F]">{getStatusText(100 - currentStress)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={100 - currentStress} className="w-20 h-2" />
              <span className={`text-sm font-medium ${getStatusColor(100 - currentStress)}`}>
                {100 - currentStress}%
              </span>
            </div>
          </div>

          {/* Happiness Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smile className="w-5 h-5 text-[#2E8B57]" />
              <div>
                <p className="font-medium text-[#0F1722]">{t.happinessLevel}</p>
                <p className="text-xs text-[#55707F]">{getStatusText(currentHappiness)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={currentHappiness} className="w-20 h-2" />
              <span className={`text-sm font-medium ${getStatusColor(currentHappiness)}`}>
                {currentHappiness}%
              </span>
            </div>
          </div>

          {/* Sadness Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Frown className="w-5 h-5 text-[#8BAAC6]" />
              <div>
                <p className="font-medium text-[#0F1722]">{t.sadnessLevel}</p>
                <p className="text-xs text-[#55707F]">{getStatusText(100 - currentSadness)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={100 - currentSadness} className="w-20 h-2" />
              <span className={`text-sm font-medium ${getStatusColor(100 - currentSadness)}`}>
                {100 - currentSadness}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Trends */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">{t.improvementTrend}</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#657FA4" opacity={0.2} />
              <XAxis dataKey="day" stroke="#55707F" fontSize={12} />
              <YAxis stroke="#55707F" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F4F7FA', 
                  border: '1px solid #657FA4',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="happiness" 
                stroke="#2E8B57" 
                strokeWidth={2}
                name="Happiness"
                dot={{ fill: '#2E8B57', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#E05656" 
                strokeWidth={2}
                name="Stress"
                dot={{ fill: '#E05656', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="sadness" 
                stroke="#8BAAC6" 
                strokeWidth={2}
                name="Sadness"
                dot={{ fill: '#8BAAC6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Predictions */}
      <Card className="p-6 bg-gradient-to-r from-[#AED6D2]/10 to-[#8BAAC6]/10 border-[#AED6D2]/20">
        <h2 className="text-[#0F1722] mb-4">{t.prediction}</h2>
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#657FA4" opacity={0.2} />
              <XAxis dataKey="day" stroke="#55707F" fontSize={12} />
              <YAxis stroke="#55707F" fontSize={12} domain={[90, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F4F7FA', 
                  border: '1px solid #657FA4',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#AED6D2" 
                fill="url(#predictionGradient)" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <defs>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AED6D2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#AED6D2" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[#55707F] text-sm text-center">{t.predictionText}</p>
      </Card>

      {/* Activity Completion */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">{t.activities}</h2>
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <div key={activity.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4" style={{ color: activity.color }} />
                <span className="text-[#0F1722] text-sm">{activity.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={activity.completed} className="w-16 h-2" />
                <span className="text-xs text-[#55707F] w-8">{activity.completed}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">{t.achievements}</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-[#F4F7FA] rounded-lg">
            <Award className="w-5 h-5 text-[#2E8B57]" />
            <span className="text-[#0F1722] text-sm">{t.achievement1}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F4F7FA] rounded-lg">
            <Target className="w-5 h-5 text-[#657FA4]" />
            <span className="text-[#0F1722] text-sm">{t.achievement2}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F4F7FA] rounded-lg">
            <Heart className="w-5 h-5 text-[#8BAAC6]" />
            <span className="text-[#0F1722] text-sm">{t.achievement3}</span>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 bg-gradient-to-r from-[#657FA4]/5 to-[#AED6D2]/5 border-[#657FA4]/20">
        <h2 className="text-[#0F1722] mb-3">{t.insights}</h2>
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-[#657FA4] mt-0.5" />
          <p className="text-[#55707F] text-sm leading-relaxed">{t.insightText}</p>
        </div>
      </Card>
    </div>
  );
}