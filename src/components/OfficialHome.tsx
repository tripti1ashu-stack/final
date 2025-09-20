import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LanguageSelector } from "./LanguageSelector";
import { 
  Settings, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  BarChart3,
  FileText,
  Calendar,
  Shield,
  ArrowLeft
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

const dashboardStats = [
  { title: "Active Students", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
  { title: "Wellness Reports", value: "156", change: "+8%", icon: FileText, color: "text-green-600" },
  { title: "Critical Alerts", value: "3", change: "-25%", icon: AlertTriangle, color: "text-red-600" },
  { title: "Engagement Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-purple-600" }
];

const recentReports = [
  { id: 1, category: "Academic Stress", count: 23, severity: "High", time: "2 hours ago" },
  { id: 2, category: "Exam Anxiety", count: 18, severity: "High", time: "4 hours ago" },
  { id: 3, category: "Course Load Issues", count: 15, severity: "Medium", time: "1 day ago" },
  { id: 4, category: "Faculty Relations", count: 12, severity: "Medium", time: "1 day ago" }
];

const pendingActions = [
  { title: "Review flagged anonymous reports", count: 5, urgent: true },
  { title: "Approve new wellness modules", count: 3, urgent: false },
  { title: "Schedule campus mental health event", count: 1, urgent: true },
  { title: "Update privacy policy", count: 1, urgent: false }
];

interface OfficialHomeProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBackToRoleSelection?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToEventScheduler?: () => void;
  onNavigateToAcademicStressReports?: () => void;
}

export function OfficialHome({ currentLanguage, onLanguageChange, onBackToRoleSelection, onNavigateToAnalytics, onNavigateToEventScheduler, onNavigateToAcademicStressReports }: OfficialHomeProps) {
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
            <Badge variant="outline" className="ml-2 text-xs">Official</Badge>
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
                  🏛️
                </div>
                <div className="flex-1">
                  <h2 className="text-white mb-1">Official Dashboard</h2>
                  <p className="text-white/90 text-sm mb-3">Monitor institutional mental wellness</p>
                  <Button 
                    size="sm" 
                    className="bg-[#AED6D2] hover:bg-white text-[#0F1722]"
                    onClick={() => onNavigateToAnalytics?.()}
                  >
                    View Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-[#0F1722] mb-4">Institution Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <Badge variant="outline" className="text-xs">{stat.change}</Badge>
                  </div>
                  <h4 className="text-2xl font-bold text-[#0F1722] mb-1">{stat.value}</h4>
                  <p className="text-[#55707F] text-xs">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Anonymous Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0F1722]">Anonymous Reports</h3>
            <Button variant="ghost" size="sm" className="text-[#55707F]">View All</Button>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <Card 
                key={report.id} 
                className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (report.category === "Academic Stress") {
                    onNavigateToAcademicStressReports?.();
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-[#0F1722] text-sm">{report.category}</h4>
                        <Badge 
                          variant={report.severity === 'High' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {report.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#55707F] text-xs">{report.count} reports</p>
                        <p className="text-[#55707F] text-xs">{report.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-[#0F1722] mb-4">Pending Actions</h3>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[#0F1722] text-sm">{action.title}</h4>
                        {action.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-[#55707F] text-xs">{action.count} items</p>
                    </div>
                    <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]">
                      Review
                    </Button>
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
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-[#0F1722] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigateToAnalytics?.()}
            >
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Analytics</h4>
                <p className="text-[#55707F] text-xs">View trends</p>
              </CardContent>
            </Card>
            <Card 
              className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigateToEventScheduler?.()}
            >
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Event Schedule</h4>
                <p className="text-[#55707F] text-xs">Schedule events</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Privacy</h4>
                <p className="text-[#55707F] text-xs">Settings</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-[#657FA4]" />
                <h4 className="text-[#0F1722] text-sm mb-1">Users</h4>
                <p className="text-[#55707F] text-xs">Manage</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}