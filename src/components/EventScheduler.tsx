import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit3,
  Trash2,
  Copy,
  Share,
  Bell,
  CheckCircle2,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye,
  Settings,
  Target,
  Megaphone,
  GraduationCap,
  Heart,
  Brain,
  Coffee,
  BookOpen,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";

interface EventSchedulerProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'counseling' | 'awareness' | 'social' | 'academic';
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  capacity: number;
  registered: number;
  targetAudience: string[];
  organizer: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  tags: string[];
  registrationRequired: boolean;
  isRecurring: boolean;
  notificationsSent: boolean;
}

interface EventTemplate {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'counseling' | 'awareness' | 'social' | 'academic';
  duration: number;
  suggestedCapacity: number;
  targetAudience: string[];
  tags: string[];
  icon: React.ComponentType<any>;
}

const eventTemplates: EventTemplate[] = [
  {
    id: 'stress-workshop',
    title: 'Stress Management Workshop',
    description: 'Learn practical techniques to manage academic stress and maintain mental well-being during challenging times.',
    type: 'workshop',
    duration: 120,
    suggestedCapacity: 50,
    targetAudience: ['All Students', '2nd Year', '3rd Year'],
    tags: ['stress', 'mental health', 'coping strategies'],
    icon: Brain
  },
  {
    id: 'exam-prep',
    title: 'Exam Preparation Seminar',
    description: 'Effective study strategies, time management, and maintaining mental health during exam periods.',
    type: 'seminar',
    duration: 90,
    suggestedCapacity: 100,
    targetAudience: ['All Students'],
    tags: ['academic', 'exam anxiety', 'study skills'],
    icon: BookOpen
  },
  {
    id: 'peer-support',
    title: 'Peer Support Circle',
    description: 'Facilitated group discussion where students can share experiences and support each other.',
    type: 'social',
    duration: 60,
    suggestedCapacity: 20,
    targetAudience: ['1st Year', '2nd Year'],
    tags: ['peer support', 'social connection', 'sharing'],
    icon: Heart
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness & Meditation Session',
    description: 'Guided meditation and mindfulness practices to reduce stress and improve focus.',
    type: 'workshop',
    duration: 45,
    suggestedCapacity: 30,
    targetAudience: ['All Students', 'Faculty'],
    tags: ['mindfulness', 'meditation', 'relaxation'],
    icon: Activity
  },
  {
    id: 'career-counseling',
    title: 'Career Guidance Session',
    description: 'Individual and group counseling sessions to help students navigate career choices and reduce placement anxiety.',
    type: 'counseling',
    duration: 180,
    suggestedCapacity: 15,
    targetAudience: ['Final Year', '3rd Year'],
    tags: ['career', 'placement', 'guidance'],
    icon: Target
  },
  {
    id: 'mental-health-awareness',
    title: 'Mental Health Awareness Talk',
    description: 'Educational session about mental health, recognizing warning signs, and available support resources.',
    type: 'awareness',
    duration: 75,
    suggestedCapacity: 200,
    targetAudience: ['All Students', 'Faculty', 'Staff'],
    tags: ['awareness', 'education', 'resources'],
    icon: Megaphone
  }
];

const existingEvents: Event[] = [
  {
    id: '1',
    title: 'Stress Management Workshop',
    description: 'Learn practical techniques to manage academic stress and maintain mental well-being.',
    type: 'workshop',
    date: '2024-01-25',
    time: '14:00',
    duration: 120,
    location: 'Auditorium A',
    capacity: 50,
    registered: 42,
    targetAudience: ['2nd Year', '3rd Year'],
    organizer: 'Student Counseling Team',
    status: 'published',
    tags: ['stress', 'mental health'],
    registrationRequired: true,
    isRecurring: false,
    notificationsSent: true
  },
  {
    id: '2',
    title: 'Exam Preparation Seminar',
    description: 'Effective study strategies and time management for upcoming exams.',
    type: 'seminar',
    date: '2024-01-22',
    time: '16:00',
    duration: 90,
    location: 'Library Hall',
    capacity: 100,
    registered: 78,
    targetAudience: ['All Students'],
    organizer: 'Academic Support',
    status: 'ongoing',
    tags: ['academic', 'exam prep'],
    registrationRequired: true,
    isRecurring: false,
    notificationsSent: true
  },
  {
    id: '3',
    title: 'Peer Support Circle - Weekly',
    description: 'Weekly peer support group for first-year students.',
    type: 'social',
    date: '2024-01-26',
    time: '17:30',
    duration: 60,
    location: 'Student Center Room 201',
    capacity: 20,
    registered: 15,
    targetAudience: ['1st Year'],
    organizer: 'Peer Support Network',
    status: 'published',
    tags: ['peer support', 'weekly'],
    registrationRequired: true,
    isRecurring: true,
    notificationsSent: false
  }
];

const targetAudienceOptions = [
  'All Students',
  '1st Year',
  '2nd Year', 
  '3rd Year',
  'Final Year',
  'Graduate Students',
  'Faculty',
  'Staff',
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil'
];

const locations = [
  'Auditorium A',
  'Auditorium B',
  'Library Hall',
  'Conference Room 1',
  'Conference Room 2',
  'Student Center Room 201',
  'Student Center Room 202',
  'Outdoor Amphitheater',
  'Online (Zoom)',
  'Hybrid (Physical + Online)'
];

export function EventScheduler({ onBack, currentLanguage }: EventSchedulerProps) {
  const [events, setEvents] = useState<Event[]>(existingEvents);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EventTemplate | null>(null);
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'workshop',
    date: '',
    time: '',
    duration: 60,
    location: '',
    capacity: 50,
    targetAudience: [],
    organizer: 'Student Counseling Team',
    registrationRequired: true,
    isRecurring: false,
    tags: []
  });

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description || '',
      type: newEvent.type as any,
      date: newEvent.date!,
      time: newEvent.time!,
      duration: newEvent.duration || 60,
      location: newEvent.location!,
      capacity: newEvent.capacity || 50,
      registered: 0,
      targetAudience: newEvent.targetAudience || [],
      organizer: newEvent.organizer || 'Student Counseling Team',
      status: 'draft',
      tags: newEvent.tags || [],
      registrationRequired: newEvent.registrationRequired || true,
      isRecurring: newEvent.isRecurring || false,
      notificationsSent: false
    };

    setEvents(prev => [...prev, event]);
    setShowCreateDialog(false);
    setNewEvent({
      title: '',
      description: '',
      type: 'workshop',
      date: '',
      time: '',
      duration: 60,
      location: '',
      capacity: 50,
      targetAudience: [],
      organizer: 'Student Counseling Team',
      registrationRequired: true,
      isRecurring: false,
      tags: []
    });
    setSelectedTemplate(null);
  };

  const useTemplate = (template: EventTemplate) => {
    setSelectedTemplate(template);
    setNewEvent({
      title: template.title,
      description: template.description,
      type: template.type,
      duration: template.duration,
      capacity: template.suggestedCapacity,
      targetAudience: template.targetAudience,
      tags: template.tags,
      organizer: 'Student Counseling Team',
      registrationRequired: true,
      isRecurring: false
    });
  };

  const updateEventStatus = (eventId: string, status: Event['status']) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, status } : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return <Brain className="w-4 h-4" />;
      case 'seminar': return <BookOpen className="w-4 h-4" />;
      case 'counseling': return <Heart className="w-4 h-4" />;
      case 'awareness': return <Megaphone className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'academic': return <GraduationCap className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesTab = currentTab === 'upcoming' 
      ? ['draft', 'published'].includes(event.status)
      : currentTab === 'ongoing'
      ? event.status === 'ongoing'
      : ['completed', 'cancelled'].includes(event.status);
    
    return matchesSearch && matchesType && matchesTab;
  });

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
            <h2 className="font-semibold text-white">Event Scheduler</h2>
            <p className="text-xs text-white/80">Organize wellness events & workshops</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white">
              <Download className="w-4 h-4" />
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Templates Section */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Quick Start Templates</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {eventTemplates.map((template) => (
                        <Card 
                          key={template.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedTemplate?.id === template.id ? 'ring-2 ring-[#657FA4]' : ''
                          }`}
                          onClick={() => useTemplate(template)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#AED6D2] rounded-lg flex items-center justify-center">
                                <template.icon className="w-4 h-4 text-[#2E2E2E]" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-[#2E2E2E] mb-1">{template.title}</h4>
                                <p className="text-xs text-[#5C5C5C] line-clamp-2">{template.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">{template.type}</Badge>
                                  <span className="text-xs text-[#5C5C5C]">{template.duration}min</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Event Details Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Event Title *</Label>
                        <Input
                          value={newEvent.title}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select 
                          value={newEvent.type} 
                          onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="counseling">Counseling</SelectItem>
                            <SelectItem value="awareness">Awareness</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the event purpose and what attendees will learn"
                        className="min-h-20"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Date *</Label>
                        <Input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time *</Label>
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={newEvent.duration}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                          min="15"
                          max="480"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Location *</Label>
                        <Select 
                          value={newEvent.location} 
                          onValueChange={(value) => setNewEvent(prev => ({ ...prev, location: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem key={location} value={location}>{location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Capacity</Label>
                        <Input
                          type="number"
                          value={newEvent.capacity}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, capacity: parseInt(e.target.value) || 50 }))}
                          min="5"
                          max="500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {targetAudienceOptions.map(audience => (
                          <div key={audience} className="flex items-center space-x-2">
                            <Checkbox
                              id={audience}
                              checked={newEvent.targetAudience?.includes(audience)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewEvent(prev => ({
                                    ...prev,
                                    targetAudience: [...(prev.targetAudience || []), audience]
                                  }));
                                } else {
                                  setNewEvent(prev => ({
                                    ...prev,
                                    targetAudience: prev.targetAudience?.filter(a => a !== audience) || []
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={audience} className="text-xs">{audience}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={newEvent.registrationRequired}
                          onCheckedChange={(checked) => setNewEvent(prev => ({ ...prev, registrationRequired: checked }))}
                        />
                        <Label>Registration Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={newEvent.isRecurring}
                          onCheckedChange={(checked) => setNewEvent(prev => ({ ...prev, isRecurring: checked }))}
                        />
                        <Label>Recurring Event</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleCreateEvent}
                      className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                    >
                      Create Event
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateDialog(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
          <div className="grid grid-cols-4 gap-3">
            <Card className="bg-[#F4F7FA] border-0">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-[#657FA4]">{events.filter(e => e.status === 'published').length}</div>
                <div className="text-xs text-[#5C5C5C]">Published</div>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-green-600">{events.filter(e => e.status === 'ongoing').length}</div>
                <div className="text-xs text-[#5C5C5C]">Ongoing</div>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-gray-600">{events.filter(e => e.status === 'draft').length}</div>
                <div className="text-xs text-[#5C5C5C]">Drafts</div>
              </CardContent>
            </Card>
            <Card className="bg-[#F4F7FA] border-0">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-[#2E2E2E]">{events.reduce((sum, e) => sum + e.registered, 0)}</div>
                <div className="text-xs text-[#5C5C5C]">Total Registered</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C5C5C]" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="counseling">Counseling</SelectItem>
                <SelectItem value="awareness">Awareness</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Events Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={currentTab} className="mt-4">
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <Card className="bg-[#F4F7FA] border-0">
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-12 h-12 text-[#5C5C5C] mx-auto mb-3" />
                      <h3 className="text-[#2E2E2E] mb-2">No events found</h3>
                      <p className="text-[#5C5C5C] text-sm">Try adjusting your search or filters, or create a new event.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#AED6D2] rounded-lg flex items-center justify-center">
                              {getTypeIcon(event.type)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-[#2E2E2E] font-semibold mb-1">{event.title}</h4>
                                  <p className="text-[#5C5C5C] text-sm line-clamp-2">{event.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(event.status)}>
                                    {event.status.toUpperCase()}
                                  </Badge>
                                  {event.isRecurring && (
                                    <Badge variant="outline" className="text-xs">Recurring</Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm text-[#5C5C5C] mb-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time} ({event.duration}min)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span>{event.registered}/{event.capacity}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {event.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {event.status === 'draft' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                                      onClick={() => updateEventStatus(event.id, 'published')}
                                    >
                                      Publish
                                    </Button>
                                  )}
                                  {event.status === 'published' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                      onClick={() => updateEventStatus(event.id, 'ongoing')}
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {event.status === 'ongoing' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-purple-600 hover:bg-purple-700 text-white"
                                      onClick={() => updateEventStatus(event.id, 'completed')}
                                    >
                                      Complete
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm">
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => deleteEvent(event.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}