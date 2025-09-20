import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { 
  ArrowLeft, Clock, CheckCircle2, Plus, Target, Trophy, 
  Moon, Sun, Settings, Brain, Heart, BookOpen, Dumbbell,
  Send, MessageCircle, Bell, Flame, Calendar, TrendingUp
} from "lucide-react";

interface WellnessRoutineProps {
  currentLanguage: string;
  onBack: () => void;
}

interface RoutineActivity {
  id: string;
  name: string;
  type: 'mind' | 'body' | 'academic' | 'lifestyle';
  icon: any;
  completed: boolean;
  streak: number;
  description: string;
}

interface Partner {
  name: string;
  avatar: string;
  streak: number;
  lastActive: string;
  todayProgress: number;
}

export function WellnessRoutine({ currentLanguage, onBack }: WellnessRoutineProps) {
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'evening' | 'custom'>('morning');
  const [activities, setActivities] = useState<RoutineActivity[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      type: 'mind',
      icon: Brain,
      completed: true,
      streak: 12,
      description: '10 minutes of mindful breathing'
    },
    {
      id: '2',
      name: 'Daily Journaling',
      type: 'mind',
      icon: BookOpen,
      completed: true,
      streak: 8,
      description: 'Reflect on thoughts and feelings'
    },
    {
      id: '3',
      name: 'Breathing Exercise',
      type: 'mind',
      icon: Heart,
      completed: false,
      streak: 5,
      description: '5 minutes of deep breathing'
    },
    {
      id: '4',
      name: 'Sleep Tracking',
      type: 'lifestyle',
      icon: Moon,
      completed: false,
      streak: 15,
      description: 'Track sleep quality and duration'
    },
    {
      id: '5',
      name: 'Academic Planning',
      type: 'academic',
      icon: Calendar,
      completed: true,
      streak: 6,
      description: 'Plan study schedule and goals'
    },
    {
      id: '6',
      name: 'Physical Wellness',
      type: 'body',
      icon: Dumbbell,
      completed: false,
      streak: 3,
      description: '30 minutes of physical activity'
    }
  ]);

  const [partner] = useState<Partner>({
    name: 'Sarah M.',
    avatar: '👩‍💼',
    streak: 14,
    lastActive: '2 hours ago',
    todayProgress: 75
  });

  const [showPartnerHub, setShowPartnerHub] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const completedToday = activities.filter(a => a.completed).length;
  const totalActivities = activities.length;
  const completionPercentage = Math.round((completedToday / totalActivities) * 100);
  const currentStreak = 12; // Mock streak

  const motivationalQuotes = [
    "Consistency is self-love in action.",
    "Small steps daily lead to big changes yearly.",
    "Progress, not perfection.",
    "Your mental health matters every single day."
  ];

  const todaysQuote = motivationalQuotes[0];

  const typeColors = {
    mind: '#657FA4',
    body: '#2E8B57',
    academic: '#8BAAC6',
    lifestyle: '#AED6D2'
  };

  const badges = [
    { name: 'Mindful Learner', earned: true, icon: Brain, color: '#657FA4' },
    { name: 'Consistency Hero', earned: true, icon: Target, color: '#2E8B57' },
    { name: 'Wellness Warrior', earned: false, icon: Trophy, color: '#8BAAC6' },
    { name: 'Balance Master', earned: false, icon: Heart, color: '#AED6D2' }
  ];

  const toggleActivity = (id: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed }
        : activity
    ));
  };

  const quickMessages = [
    "You've got this today! 💪",
    "Keep up the great work! 🌟",
    "Believing in you always! ✨",
    "One step at a time! 🚀"
  ];

  const sendQuickMessage = (message: string) => {
    // Mock sending message
    console.log('Sent message:', message);
  };

  if (showPartnerHub) {
    return (
      <div className="p-4 space-y-6 bg-white min-h-screen pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPartnerHub(false)}
            className="w-8 h-8 p-0 rounded-full hover:bg-[#F4F7FA]"
          >
            <ArrowLeft className="w-4 h-4 text-[#657FA4]" />
          </Button>
          <div>
            <h1 className="text-[#0F1722] mb-1">🤝 Partner Hub</h1>
            <p className="text-[#55707F]">Stay motivated together</p>
          </div>
        </div>

        {/* Partner Comparison */}
        <Card className="p-6">
          <h2 className="text-[#0F1722] mb-4">Today's Progress Comparison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#F4F7FA] rounded-lg">
              <div className="text-2xl mb-2">👤</div>
              <p className="font-medium text-[#0F1722]">You</p>
              <div className="text-2xl font-bold text-[#657FA4] mt-2">{completionPercentage}%</div>
              <p className="text-xs text-[#55707F]">{completedToday}/{totalActivities} completed</p>
            </div>
            <div className="text-center p-4 bg-[#F4F7FA] rounded-lg">
              <div className="text-2xl mb-2">{partner.avatar}</div>
              <p className="font-medium text-[#0F1722]">{partner.name}</p>
              <div className="text-2xl font-bold text-[#2E8B57] mt-2">{partner.todayProgress}%</div>
              <p className="text-xs text-[#55707F]">Active {partner.lastActive}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#657FA4]/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#55707F]">Streak Comparison</span>
              <div className="flex items-center gap-4">
                <span className="text-sm">You: {currentStreak} days</span>
                <span className="text-sm">{partner.name}: {partner.streak} days</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Messages */}
        <Card className="p-6">
          <h2 className="text-[#0F1722] mb-4">💬 Quick Encouragement</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickMessages.map((message, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendQuickMessage(message)}
                className="text-xs p-2 h-auto justify-start"
              >
                {message}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Send a custom message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-[#657FA4]/20 rounded-lg bg-[#F4F7FA] focus:outline-none focus:ring-2 focus:ring-[#657FA4]/50"
            />
            <Button
              size="sm"
              onClick={() => {
                sendQuickMessage(newMessage);
                setNewMessage('');
              }}
              className="w-8 h-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Joint Challenge */}
        <Card className="p-6 bg-gradient-to-r from-[#657FA4]/10 to-[#8BAAC6]/10 border-[#657FA4]/20">
          <h2 className="text-[#0F1722] mb-4">🎯 Joint Challenge</h2>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#657FA4]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-[#657FA4]" />
            </div>
            <h3 className="font-medium text-[#0F1722] mb-2">5-Day Meditation Streak</h3>
            <p className="text-sm text-[#55707F] mb-4">Meditate together for 5 consecutive days</p>
            <div className="flex justify-center gap-4 mb-4">
              <div>
                <div className="text-lg font-bold text-[#657FA4]">3/5</div>
                <div className="text-xs text-[#55707F]">You</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#2E8B57]">4/5</div>
                <div className="text-xs text-[#55707F]">{partner.name}</div>
              </div>
            </div>
            <Button size="sm" className="w-full">Start New Challenge</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-8 h-8 p-0 rounded-full hover:bg-[#F4F7FA]"
        >
          <ArrowLeft className="w-4 h-4 text-[#657FA4]" />
        </Button>
        <div>
          <h1 className="text-[#0F1722] mb-1">🕒 My Wellness Routine</h1>
          <p className="text-[#55707F]">Build consistent wellness habits</p>
        </div>
      </div>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-r from-[#657FA4]/10 to-[#8BAAC6]/10 border-[#657FA4]/20 text-center">
        <p className="text-[#0F1722] font-medium italic">"{todaysQuote}"</p>
      </Card>

      {/* Progress Ring */}
      <Card className="p-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#F4F7FA"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#657FA4"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${completionPercentage * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-[#657FA4]">{completionPercentage}%</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-[#E05656]" />
            <span className="text-[#0F1722] font-medium">{currentStreak} day streak!</span>
          </div>
          <p className="text-[#55707F] text-sm">{completedToday} of {totalActivities} activities completed today</p>
        </div>
      </Card>

      {/* Time of Day Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={selectedTimeOfDay === 'morning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeOfDay('morning')}
            className="flex items-center gap-2"
          >
            <Sun className="w-4 h-4" />
            Morning
          </Button>
          <Button
            variant={selectedTimeOfDay === 'evening' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeOfDay('evening')}
            className="flex items-center gap-2"
          >
            <Moon className="w-4 h-4" />
            Evening
          </Button>
          <Button
            variant={selectedTimeOfDay === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeOfDay('custom')}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Custom
          </Button>
        </div>
      </Card>

      {/* Daily Checklist */}
      <div>
        <h2 className="text-[#0F1722] mb-4">📋 Daily Checklist</h2>
        <div className="space-y-3">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card 
                key={activity.id} 
                className={`p-4 transition-all duration-200 ${
                  activity.completed 
                    ? 'bg-gradient-to-r from-[#2E8B57]/10 to-[#AED6D2]/10 border-[#2E8B57]/20' 
                    : 'hover:bg-[#F4F7FA]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleActivity(activity.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        activity.completed
                          ? 'bg-[#2E8B57] border-[#2E8B57]'
                          : 'border-[#657FA4]/40 hover:border-[#657FA4]'
                      }`}
                    >
                      {activity.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <IconComponent 
                          className="w-4 h-4" 
                          style={{ color: typeColors[activity.type] }} 
                        />
                        <span className={`font-medium ${
                          activity.completed ? 'text-[#2E8B57]' : 'text-[#0F1722]'
                        }`}>
                          {activity.name}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: typeColors[activity.type],
                            color: typeColors[activity.type]
                          }}
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#55707F] mt-1">{activity.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#E05656]" />
                      <span className="text-xs text-[#55707F]">{activity.streak}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Custom Activity */}
      <Card className="p-4 border-dashed border-2 border-[#657FA4]/30">
        <button className="w-full flex items-center justify-center gap-2 text-[#657FA4] hover:text-[#55707F] transition-colors">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Custom Activity</span>
        </button>
      </Card>

      {/* Badges */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">🏆 Badges & Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.name}
                className={`p-3 rounded-lg text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-[#F4F7FA] to-white border-2'
                    : 'bg-[#F4F7FA]/50 opacity-60'
                }`}
                style={badge.earned ? { borderColor: badge.color } : {}}
              >
                <IconComponent 
                  className="w-6 h-6 mx-auto mb-2" 
                  style={{ color: badge.earned ? badge.color : '#55707F' }}
                />
                <p className="text-xs font-medium text-[#0F1722]">{badge.name}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Mood Progress */}
      <Card className="p-6">
        <h2 className="text-[#0F1722] mb-4">📈 Mood Correlation</h2>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#55707F]">This week's trend</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-[#2E8B57]" />
            <span className="text-sm text-[#2E8B57]">+15%</span>
          </div>
        </div>
        <Progress value={78} className="mb-2" />
        <p className="text-xs text-[#55707F]">
          Your routine completion correlates with improved mood scores
        </p>
      </Card>

      {/* Accountability Partner Section */}
      <Card className="p-6 bg-gradient-to-r from-[#AED6D2]/20 to-[#8BAAC6]/20 border-[#AED6D2]/40">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#0F1722]">🤝 Accountability Partner</h2>
          <Badge className="bg-[#2E8B57]/20 text-[#2E8B57] border-[#2E8B57]/30">
            <Bell className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#657FA4]/20 rounded-full flex items-center justify-center text-lg">
            {partner.avatar}
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#0F1722]">{partner.name}</p>
            <p className="text-xs text-[#55707F]">Active {partner.lastActive}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-[#657FA4]">{partner.todayProgress}%</div>
            <div className="text-xs text-[#55707F]">Today</div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => console.log('Share routine')}
          >
            <Send className="w-4 h-4" />
            Share Your Routine
          </Button>
          
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-[#657FA4]" />
              <span className="text-sm font-medium text-[#0F1722]">Latest Message</span>
            </div>
            <p className="text-sm text-[#55707F]">"Great job on your 12-day streak! Keep it up! 🌟"</p>
          </div>
          
          <Button
            size="sm"
            className="w-full"
            onClick={() => setShowPartnerHub(true)}
          >
            Open Partner Hub
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Reports
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Explore Modules
          </Button>
        </div>
      </Card>
    </div>
  );
}