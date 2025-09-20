import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, 
  Clock, 
  Calendar as CalendarIcon,
  MessageCircle,
  Video,
  Phone,
  AlertTriangle,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  User,
  MapPin,
  GraduationCap
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface SessionRequestsProps {
  onBack: () => void;
  onScheduleSession: (requestId: string) => void;
  onViewClientContext?: () => void;
  currentLanguage: string;
}

interface SessionRequest {
  id: string;
  anonymousId: string;
  type: 'urgent' | 'scheduled' | 'followup';
  preferredMode: 'chat' | 'voice' | 'video';
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  submittedAt: string;
  preferredDateTime?: string;
  issue: string;
  description: string;
  previousSessions: number;
  mood: string;
  campus?: string;
  department?: string;
  yearOfStudy?: string;
  lastActive: string;
  status: 'pending' | 'scheduled' | 'declined';
}

const sessionRequests: SessionRequest[] = [
  {
    id: '1',
    anonymousId: 'Student_A318',
    type: 'urgent',
    preferredMode: 'video',
    riskLevel: 'high',
    riskScore: 89,
    submittedAt: '2 hours ago',
    issue: 'Panic Attacks',
    description: 'Having severe panic attacks before exams. Can\'t sleep or focus. Need immediate help.',
    previousSessions: 2,
    mood: '😰',
    campus: 'Main Campus',
    department: 'Computer Science',
    yearOfStudy: '3rd Year',
    lastActive: '5 min ago',
    status: 'pending'
  },
  {
    id: '2',
    anonymousId: 'Student_B459',
    type: 'scheduled',
    preferredMode: 'chat',
    riskLevel: 'medium',
    riskScore: 65,
    submittedAt: '5 hours ago',
    preferredDateTime: 'Tomorrow 2:00 PM',
    issue: 'Academic Stress',
    description: 'Struggling with course load and feeling overwhelmed. Would like to schedule a session.',
    previousSessions: 0,
    mood: '😔',
    campus: 'North Campus',
    department: 'Psychology',
    yearOfStudy: '2nd Year',
    lastActive: '2 hours ago',
    status: 'pending'
  },
  {
    id: '3',
    anonymousId: 'Student_C721',
    type: 'followup',
    preferredMode: 'voice',
    riskLevel: 'low',
    riskScore: 35,
    submittedAt: '1 day ago',
    preferredDateTime: 'This week',
    issue: 'Follow-up Session',
    description: 'Follow-up on previous session about time management strategies.',
    previousSessions: 3,
    mood: '😊',
    campus: 'Main Campus',
    department: 'Business',
    yearOfStudy: '4th Year',
    lastActive: '1 day ago',
    status: 'pending'
  },
  {
    id: '4',
    anonymousId: 'Student_D832',
    type: 'urgent',
    preferredMode: 'video',
    riskLevel: 'high',
    riskScore: 92,
    submittedAt: '30 min ago',
    issue: 'Crisis Support',
    description: 'Feeling hopeless and considering dropping out. Need someone to talk to urgently.',
    previousSessions: 1,
    mood: '😢',
    campus: 'South Campus',
    department: 'Engineering',
    yearOfStudy: '1st Year',
    lastActive: '10 min ago',
    status: 'pending'
  },
  {
    id: '5',
    anonymousId: 'Student_E943',
    type: 'scheduled',
    preferredMode: 'chat',
    riskLevel: 'medium',
    riskScore: 58,
    submittedAt: '3 hours ago',
    preferredDateTime: 'Next Monday 11:00 AM',
    issue: 'Social Anxiety',
    description: 'Having trouble making friends and participating in class discussions.',
    previousSessions: 0,
    mood: '😟',
    campus: 'Main Campus',
    department: 'Literature',
    yearOfStudy: '2nd Year',
    lastActive: '1 hour ago',
    status: 'pending'
  }
];

export function SessionRequests({ onBack, onScheduleSession, onViewClientContext, currentLanguage }: SessionRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'scheduled' | 'followup'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'followup': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = sessionRequests.filter(request => {
    if (filterType !== 'all' && request.type !== filterType) return false;
    if (filterRisk !== 'all' && request.riskLevel !== filterRisk) return false;
    return true;
  });

  const urgentCount = sessionRequests.filter(r => r.type === 'urgent').length;
  const pendingCount = sessionRequests.filter(r => r.status === 'pending').length;

  const handleScheduleRequest = (request: SessionRequest) => {
    // Instead of showing modal, go to client context
    if (onViewClientContext) {
      onViewClientContext();
    } else {
      setSelectedRequest(request);
      setShowScheduleModal(true);
    }
  };

  const confirmSchedule = () => {
    if (selectedRequest && selectedDate && selectedTime) {
      onScheduleSession(selectedRequest.id);
      setShowScheduleModal(false);
      setSelectedRequest(null);
      setSelectedTime('');
      setScheduleNotes('');
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

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
                <h2 className="font-semibold">Session Requests</h2>
                <p className="text-xs text-white/80">{pendingCount} pending • {urgentCount} urgent</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
                <div className="text-sm text-red-700">Urgent</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
                <div className="text-sm text-blue-700">Pending</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-green-700">Today</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className={filterType === 'all' ? 'bg-[#657FA4]' : ''}
          >
            All
          </Button>
          <Button
            variant={filterType === 'urgent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('urgent')}
            className={filterType === 'urgent' ? 'bg-red-600' : ''}
          >
            Urgent
          </Button>
          <Button
            variant={filterType === 'scheduled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('scheduled')}
            className={filterType === 'scheduled' ? 'bg-blue-600' : ''}
          >
            Scheduled
          </Button>
          <Button
            variant={filterType === 'followup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('followup')}
            className={filterType === 'followup' ? 'bg-purple-600' : ''}
          >
            Follow-up
          </Button>
        </div>

        {/* Session Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`border-l-4 ${
                request.type === 'urgent' ? 'border-l-red-500' : 
                request.type === 'scheduled' ? 'border-l-blue-500' : 'border-l-purple-500'
              } hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[#AED6D2] text-[#2E2E2E] text-lg">
                        {request.mood}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#2E2E2E]">{request.anonymousId}</h4>
                        <Badge className={getTypeColor(request.type)}>
                          {request.type.toUpperCase()}
                        </Badge>
                        <Badge className={getRiskColor(request.riskLevel)}>
                          {request.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#5C5C5C]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Submitted: {request.submittedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>Sessions: {request.previousSessions}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{request.campus}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          <span>{request.department}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="text-sm font-semibold text-[#2E2E2E]">{request.issue}</h5>
                        <p className="text-sm text-[#5C5C5C] line-clamp-2">{request.description}</p>
                      </div>
                      
                      {request.preferredDateTime && (
                        <div className="flex items-center gap-1 text-xs text-[#657FA4]">
                          <CalendarIcon className="w-3 h-3" />
                          <span>Preferred: {request.preferredDateTime}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {request.preferredMode === 'video' && <Video className="w-4 h-4 text-[#657FA4]" />}
                          {request.preferredMode === 'voice' && <Phone className="w-4 h-4 text-[#657FA4]" />}
                          {request.preferredMode === 'chat' && <MessageCircle className="w-4 h-4 text-[#657FA4]" />}
                          <span className="text-xs text-[#5C5C5C] capitalize">{request.preferredMode}</span>
                        </div>
                        <div className="text-xs text-[#5C5C5C]">
                          Risk: {request.riskScore}/100
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                        onClick={() => handleScheduleRequest(request)}
                      >
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      {request.type === 'urgent' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Schedule Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Session</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-[#F4F7FA] p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-[#2E2E2E]">{selectedRequest.anonymousId}</h4>
                  <Badge className={getTypeColor(selectedRequest.type)}>
                    {selectedRequest.type}
                  </Badge>
                </div>
                <p className="text-sm text-[#5C5C5C]">{selectedRequest.issue}</p>
                {selectedRequest.preferredDateTime && (
                  <p className="text-xs text-[#657FA4] mt-1">
                    Preferred: {selectedRequest.preferredDateTime}
                  </p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">Select Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">Select Time</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">Notes (Optional)</label>
                <Textarea
                  value={scheduleNotes}
                  onChange={(e) => setScheduleNotes(e.target.value)}
                  placeholder="Add any notes for the session..."
                  className="text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSchedule}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}