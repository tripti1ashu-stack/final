import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Globe, 
  Bookmark,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Send,
  Quote,
  Sparkles,
  Eye,
  Clock,
  Plus,
  Flag,
  Save,
  Mic,
  Languages,
  HelpCircle,
  AlertTriangle,
  ThumbsUp,
  Copy,
  Edit3,
  Users,
  TrendingUp,
  BookOpen,
  Target,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface StoryModuleProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Story {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  readTime: number;
  reactions: {
    helpful: number;
    support: number;
    thanks: number;
  };
  tags: string[];
  publishedAt: string;
  isFeatured: boolean;
  hasContentWarning: boolean;
  content: string;
}

interface Exercise {
  id: string;
  title: string;
  duration: string;
  type: string;
}

const stories: Story[] = [
  {
    id: 'stress-story-1',
    title: 'How I Overcame Exam Stress',
    excerpt: 'Last semester was tough, but these techniques helped me stay calm during finals...',
    author: 'Anonymous',
    avatar: 'A',
    readTime: 5,
    reactions: { helpful: 24, support: 18, thanks: 12 },
    tags: ['Stress', 'Exams', 'Sleep'],
    publishedAt: '2 weeks ago',
    isFeatured: true,
    hasContentWarning: false,
    content: `During my final exams, I felt completely overwhelmed. The syllabus seemed endless, and the constant pressure made it impossible to focus. I would sit with my books but my mind was racing with "what if" scenarios.

**What truly helped me was breaking things down into small, achievable goals.** Instead of trying to study everything at once, I created a schedule that gave time for both revision and rest. This small shift gave me back a sense of control.

Another powerful technique was **deep breathing**. Before I started a study session, I would close my eyes, take a few deep breaths, and calm my racing thoughts. It's amazing how this small practice reduced my stress levels instantly.

## The turning point

Talking to peers also reminded me that I wasn't alone. We all shared the same fears, and supporting each other made the experience far less scary. It also gave me new study techniques that I hadn't thought of.

By the time exams started, I wasn't stress-free, but I was prepared, calmer, and confident. Looking back, I realize that stress is natural, but it doesn't have to control us.

*If you're struggling with exam stress — take a deep breath, break your goals down, and remember you're not alone. You've got this.*`
  },
  {
    id: 'sleep-story',
    title: 'Finding My Sleep Rhythm',
    excerpt: 'After months of sleepless nights, I discovered what worked for me...',
    author: 'Student_127',
    avatar: 'S',
    readTime: 4,
    reactions: { helpful: 16, support: 22, thanks: 8 },
    tags: ['Sleep', 'Routine', 'Health'],
    publishedAt: '1 week ago',
    isFeatured: false,
    hasContentWarning: false,
    content: 'Sleep story content here...'
  }
];

const exercises: Exercise[] = [
  { id: 'box-breathing', title: 'Box Breathing', duration: '2 min', type: 'Breathing' },
  { id: 'grounding', title: '5-4-3-2-1 Grounding', duration: '3 min', type: 'Mindfulness' },
  { id: 'progressive', title: 'Progressive Relaxation', duration: '5 min', type: 'Relaxation' }
];

const moduleStats = {
  storiesCount: 125,
  activeReaders: 347,
  weeklyFeatured: 'Anonymous'
};

export function StoryModule({ onBack, currentLanguage }: StoryModuleProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentView, setCurrentView] = useState<'module' | 'story' | 'compose'>('module');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOverview, setExpandedOverview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [messageText, setMessageText] = useState('');
  const [showContentWarning, setShowContentWarning] = useState(false);
  const [userReactions, setUserReactions] = useState<{[key: string]: string[]}>({});
  const [savedStories, setSavedStories] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<string[]>([]);
  
  // Compose state
  const [composeTitle, setComposeTitle] = useState('');
  const [composeContent, setComposeContent] = useState('');
  const [composeTags, setComposeTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);
  const [composeProgress, setComposeProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 300 + 300);

    return () => clearTimeout(timer);
  }, []);

  const handleReaction = (storyId: string, reactionType: string) => {
    setUserReactions(prev => {
      const storyReactions = prev[storyId] || [];
      const hasReaction = storyReactions.includes(reactionType);
      
      if (hasReaction) {
        return {
          ...prev,
          [storyId]: storyReactions.filter(r => r !== reactionType)
        };
      } else {
        return {
          ...prev,
          [storyId]: [...storyReactions, reactionType]
        };
      }
    });
  };

  const handleSaveStory = (storyId: string) => {
    setSavedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const handleSaveQuote = (quote: string) => {
    setQuotes(prev => [...prev, quote]);
  };

  const handleTTS = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
    } else if (selectedStory) {
      const utterance = new SpeechSynthesisUtterance(selectedStory.content);
      utterance.rate = playbackSpeed[0];
      speechSynthesis.speak(utterance);
    }
    setIsPlaying(!isPlaying);
  };

  const submitStory = async () => {
    setComposeProgress(0);
    
    const interval = setInterval(() => {
      setComposeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentView('module');
          // Show success message
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (currentView === 'compose') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('module')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Share Your Story</h2>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <HelpCircle className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#AED6D2] rounded-full flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-[#2E2E2E]" />
                </div>
                <div>
                  <h3 className="text-[#2E2E2E] font-semibold">Share your experience</h3>
                  <p className="text-[#5C5C5C] text-sm">Help others by sharing your journey</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[#2E2E2E] font-semibold">Title (optional)</label>
              <input
                type="text"
                value={composeTitle}
                onChange={(e) => setComposeTitle(e.target.value)}
                placeholder="Add a short title"
                className="w-full p-3 bg-[#F4F7FA] rounded-lg border-0 focus:ring-2 focus:ring-[#657FA4] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#2E2E2E] font-semibold">Your Story</label>
              <Textarea
                value={composeContent}
                onChange={(e) => setComposeContent(e.target.value)}
                placeholder="Share your experience, what helped you, and advice for others..."
                className="min-h-48 bg-[#F4F7FA] border-0 focus:ring-2 focus:ring-[#657FA4]"
                maxLength={3000}
              />
              <div className="text-right text-xs text-[#5C5C5C]">
                {composeContent.length}/3000
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#2E2E2E] font-semibold">Tags</label>
              <div className="flex flex-wrap gap-2">
                {['Stress', 'Exams', 'Sleep', 'Anxiety', 'Focus', 'Support'].map((tag) => (
                  <Button
                    key={tag}
                    variant={composeTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (composeTags.includes(tag)) {
                        setComposeTags(prev => prev.filter(t => t !== tag));
                      } else {
                        setComposeTags(prev => [...prev, tag]);
                      }
                    }}
                    className={composeTags.includes(tag) ? "bg-[#657FA4]" : ""}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4 p-4 bg-[#F4F7FA] rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#657FA4]" />
                  <span className="text-[#2E2E2E]">Publish anonymously</span>
                </div>
                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-[#2E2E2E] cursor-pointer">
                  I confirm I'll not share other people's private info and understand this will be reviewed before publishing.
                </label>
              </div>
            </div>

            {composeProgress > 0 && (
              <Card className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#657FA4]"></div>
                    <span className="text-[#2E2E2E]">Submitting for review...</span>
                  </div>
                  <Progress value={composeProgress} className="w-full" />
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={submitStory}
                disabled={!composeContent.trim() || !hasConsent || composeProgress > 0}
                className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'story' && selectedStory) {
    return (
      <div className="min-h-screen bg-white">
        {/* Content Warning Modal */}
        <AnimatePresence>
          {showContentWarning && selectedStory.hasContentWarning && (
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
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Content Warning</h3>
                  <p className="text-sm text-[#5C5C5C]">
                    This story mentions anxiety and stress. Please proceed with care.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentView('module')} className="flex-1">
                    Exit
                  </Button>
                  <Button onClick={() => setShowContentWarning(false)} className="flex-1 bg-[#657FA4]">
                    Continue
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Bar */}
        <div className="sticky top-0 z-40 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('module')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold line-clamp-1">
            {selectedStory.title}
          </h2>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Languages className="w-4 h-4 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Translation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show translation</span>
                    <Switch checked={showTranslation} onCheckedChange={setShowTranslation} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSaveStory(selectedStory.id)}
              className={`w-8 h-8 p-0 ${savedStories.includes(selectedStory.id) ? 'text-[#AED6D2]' : 'text-white'}`}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <MoreHorizontal className="w-4 h-4 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[300px]">
                <SheetHeader>
                  <SheetTitle>Story Options</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" className="justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Share Story
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Story Header */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 bg-[#8BAAC6]">
                  <AvatarFallback className="text-white font-semibold">
                    {selectedStory.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#2E2E2E]">{selectedStory.author}</span>
                    {selectedStory.isFeatured && (
                      <Badge className="bg-[#AED6D2] text-[#2E2E2E]">Featured</Badge>
                    )}
                  </div>
                  <p className="text-[#5C5C5C] text-sm">{selectedStory.publishedAt} • {selectedStory.readTime} min read</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedStory.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTTS}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Listen'}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#5C5C5C]">Speed:</span>
                    <Slider
                      value={playbackSpeed}
                      onValueChange={setPlaybackSpeed}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-20"
                    />
                    <span className="text-sm text-[#5C5C5C] w-8">{playbackSpeed[0]}x</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Story Content */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-6">
              <div className="prose prose-gray max-w-none">
                <div 
                  className="text-[#2E2E2E] leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedStory.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/##\s(.*)/g, '<h3 class="text-lg font-semibold text-[#2E2E2E] mt-6 mb-3">$1</h3>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }}
                />
              </div>
              
              {showTranslation && (
                <div className="mt-6 pt-6 border-t border-[#8BAAC6]/20">
                  <h4 className="font-semibold text-[#2E2E2E] mb-3">Translation (Hindi)</h4>
                  <p className="text-[#5C5C5C] text-sm italic">
                    Translated by Machine — may be imperfect.
                  </p>
                  <div className="mt-3 p-4 bg-white rounded-lg">
                    <p className="text-[#2E2E2E]">
                      [Hindi translation would appear here]
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Tools */}
          <Card className="bg-gradient-to-r from-[#AED6D2]/10 to-[#8BAAC6]/10 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#657FA4]" />
                <h4 className="font-semibold text-[#2E2E2E]">AI Summary</h4>
              </div>
              <p className="text-[#2E2E2E] text-sm mb-3">
                The author overcame exam stress through structured planning, breathing techniques, and peer support.
              </p>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[#657FA4] p-0">
                    Read detailed takeaways <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#AED6D2] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#2E2E2E]">Break large goals into smaller, manageable tasks</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#AED6D2] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#2E2E2E]">Use deep breathing to calm racing thoughts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#AED6D2] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#2E2E2E]">Connect with peers for emotional support</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add all to Routine
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Reactions & Actions */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {[
                    { type: 'helpful', icon: Heart, count: selectedStory.reactions.helpful, color: 'text-red-500' },
                    { type: 'support', icon: ThumbsUp, count: selectedStory.reactions.support, color: 'text-blue-500' },
                    { type: 'thanks', icon: Star, count: selectedStory.reactions.thanks, color: 'text-yellow-500' }
                  ].map(({ type, icon: Icon, count, color }) => (
                    <Button
                      key={type}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(selectedStory.id, type)}
                      className={`flex items-center gap-1 ${
                        userReactions[selectedStory.id]?.includes(type) ? color : 'text-[#5C5C5C]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{count}</span>
                    </Button>
                  ))}
                </div>
                
                <Separator orientation="vertical" className="h-6" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSaveQuote("Break large goals into smaller, manageable tasks")}
                  className="text-[#5C5C5C]"
                >
                  <Quote className="w-4 h-4 mr-1" />
                  Save quote
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-[#2E2E2E]">Send anonymous message to author</h4>
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Share your thoughts or ask a question..."
                  className="bg-white border-[#8BAAC6]/20"
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5C5C5C]">{messageText.length}/500</span>
                  <Button 
                    size="sm" 
                    disabled={!messageText.trim()}
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Exercises */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Try These Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#AED6D2]/20">
                    <div>
                      <h4 className="font-semibold text-[#2E2E2E]">{exercise.title}</h4>
                      <p className="text-[#5C5C5C] text-sm">{exercise.type} • {exercise.duration}</p>
                    </div>
                    <Button size="sm" className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
        
        <h2 className="flex-1 text-white text-center font-semibold">How I Overcame My Stress</h2>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Globe className="w-4 h-4 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Bookmark className="w-4 h-4 text-white" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[200px]">
              <SheetHeader>
                <SheetTitle>Module Options</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="outline" className="justify-start text-red-600">
                  <Flag className="w-4 h-4 mr-2" />
                  Report Module
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share Module
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-30 h-30 flex-shrink-0">
                  {isLoading ? (
                    <Skeleton className="w-30 h-30 rounded-lg" />
                  ) : (
                    <motion.div
                      className="w-30 h-30 bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] rounded-lg flex items-center justify-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-4xl">📈</div>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[#2E2E2E] mb-2">Real stories & practical steps from students who overcame stress</h3>
                  <p className="text-[#5C5C5C] text-sm mb-3">Read short, honest stories. Try proven actions.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Stress', 'Exams', 'Time Management', 'Sleep'].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E] flex-1"
                  onClick={() => setCurrentView('compose')}
                >
                  Share Your Story
                </Button>
                <Button variant="outline" size="sm">
                  Save Module
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Languages className="w-4 h-4 mr-2" />
              Translate
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Add to Routine
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap text-red-600">
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
          <p className="text-[#5C5C5C] text-xs mt-2">All submissions are anonymous by default.</p>
        </motion.div>

        {/* Module Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Collapsible open={expandedOverview} onOpenChange={setExpandedOverview}>
            <Card className="bg-[#F4F7FA] border-0">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F4F7FA]/80 transition-colors">
                  <CardTitle className="flex items-center justify-between text-[#2E2E2E]">
                    Module Overview
                    {expandedOverview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-[#2E2E2E] mb-4">
                    Stress affects everyone differently, but many successful strategies can be learned from peers who've overcome similar challenges.
                  </p>
                  <p className="text-[#5C5C5C] text-sm">
                    This module combines personal experiences with evidence-based techniques including cognitive behavioral strategies, mindfulness practices, and practical time management approaches that have helped students succeed academically while maintaining mental wellbeing.
                  </p>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </motion.div>

        {/* What This Module Contains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">What this module contains</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: BookOpen, title: 'Knowledge & Wisdom', desc: 'Short lessons and 2 recommended reads', color: 'bg-blue-100 text-blue-800' },
              { icon: Target, title: 'Practical Steps', desc: 'Numbered checklist with time estimates', color: 'bg-green-100 text-green-800' },
              { icon: Zap, title: 'Exercises', desc: 'Linked Mental Gym items (Box Breathing, Grounding)', color: 'bg-purple-100 text-purple-800' }
            ].map((item, index) => (
              <Card key={index} className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2E2E2E]">{item.title}</h4>
                      <p className="text-[#5C5C5C] text-sm">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Featured Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#2E2E2E]">Featured Stories</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="helpful">Most helpful</SelectItem>
                <SelectItem value="shortest">Shortest read</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card 
                  className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedStory(story);
                    if (story.hasContentWarning) {
                      setShowContentWarning(true);
                    }
                    setCurrentView('story');
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 bg-[#8BAAC6] flex-shrink-0">
                        <AvatarFallback className="text-white font-semibold">
                          {story.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-[#2E2E2E] line-clamp-2">{story.title}</h4>
                          {story.isFeatured && (
                            <Badge className="ml-2 bg-[#AED6D2] text-[#2E2E2E] flex-shrink-0">Featured</Badge>
                          )}
                        </div>
                        
                        <p className="text-[#5C5C5C] text-sm mb-3 line-clamp-2">{story.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {story.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            <div className="flex items-center gap-1 text-[#5C5C5C]">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{story.readTime} min</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-[#5C5C5C]">{story.reactions.helpful}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveStory(story.id);
                              }}
                              className={`w-8 h-8 p-0 ${savedStories.includes(story.id) ? 'text-[#AED6D2]' : 'text-[#5C5C5C]'}`}
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Exercises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-[#2E2E2E] mb-3">Related Exercises</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="min-w-[180px] bg-[#F4F7FA] border-0 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#AED6D2] rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-[#2E2E2E]" />
                    </div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">{exercise.title}</h4>
                    <p className="text-[#5C5C5C] text-sm mb-3">{exercise.type} • {exercise.duration}</p>
                    <Button size="sm" className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Community Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-[#AED6D2]/10 to-[#8BAAC6]/10 border-[#AED6D2]/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#657FA4]">{moduleStats.storiesCount}</div>
                    <div className="text-[#5C5C5C] text-sm">stories published</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#657FA4]">{moduleStats.activeReaders}</div>
                    <div className="text-[#5C5C5C] text-sm">active readers</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-[#657FA4]">{moduleStats.weeklyFeatured}</span>
                    </div>
                    <div className="text-[#5C5C5C] text-sm">weekly featured</div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                onClick={() => setCurrentView('compose')}
              >
                <Users className="w-4 h-4 mr-2" />
                Join the conversation — Share anonymously
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center space-x-4 text-xs text-[#5C5C5C] pb-20"
        >
          <button className="hover:text-[#657FA4]">Privacy</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Moderation policy</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Report module</button>
          <span>•</span>
          <button className="hover:text-[#657FA4]">Help</button>
        </motion.div>
      </div>
    </div>
  );
}