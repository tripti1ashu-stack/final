import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  PlayCircle,
  MessageCircle,
  Target,
  BookOpen,
  Video,
  Headphones,
  Star,
  Award,
  Download,
  Share,
  Bookmark,
  Lightbulb,
  AlertTriangle,
  Brain,
  RefreshCw,
  Mic,
  Send,
  Phone,
  Globe,
  Accessibility
} from "lucide-react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface TeenCommunicationEnhancedProps {
  onBack: () => void;
  currentLanguage: string;
}

// Sample roleplay scenarios
const roleplayScenarios = [
  {
    id: '1',
    title: 'Failed Grade Discussion',
    description: 'Your teen got a failing grade and is hiding it',
    difficulty: 'Medium',
    category: 'Academic',
    prompt: 'Your teen got a failing grade and is hiding it. They are irritable and avoidant — how do you respond?'
  },
  {
    id: '2',
    title: 'Mental Health Crisis',
    description: 'Teen expresses thoughts of self-harm',
    difficulty: 'Hard',
    category: 'Crisis',
    prompt: 'Your teen has just said "I can\'t take this anymore" and you\'re worried about their mental state. How do you respond?'
  }
];

// Message templates
const messageTemplates = [
  {
    category: 'Validation',
    title: 'Acknowledging Feelings',
    template: 'I can see that you\'re [feeling]. That must be [difficult/frustrating/scary].',
    example: 'I can see that you\'re really stressed about this exam. That must be overwhelming.',
    effectiveness: 92,
    culturalNote: 'Universal approach, culturally sensitive'
  },
  {
    category: 'I-Statements',
    title: 'For Conflict Resolution',
    template: 'I feel [emotion] when [situation] because [reason]. I need [request].',
    example: 'I feel worried when you don\'t answer my texts because I care about your safety. I need to know you\'re okay.',
    effectiveness: 85,
    culturalNote: 'Works well in direct communication cultures'
  }
];

export function TeenCommunicationEnhanced({ onBack, currentLanguage }: TeenCommunicationEnhancedProps) {
  const [showRoleplay, setShowRoleplay] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [userResponse, setUserResponse] = useState('');
  const [aiCoachFeedback, setAiCoachFeedback] = useState<any>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const startRoleplay = (scenario: any) => {
    setSelectedScenario(scenario);
    setShowRoleplay(true);
    setUserResponse('');
    setAiCoachFeedback(null);
  };

  const submitRoleplayResponse = () => {
    if (!userResponse.trim()) return;

    // Check for crisis indicators
    if (selectedScenario?.category === 'Crisis') {
      setShowCrisisModal(true);
      return;
    }

    // Simulate AI feedback
    const hasValidation = userResponse.toLowerCase().includes('understand') || userResponse.toLowerCase().includes('feel');
    const hasBlaming = userResponse.toLowerCase().includes('why') || userResponse.toLowerCase().includes('should');
    
    let score = 60;
    let tone = 'neutral';
    let improvements = [];

    if (hasValidation) {
      score += 20;
      tone = 'empathetic';
    }
    
    if (hasBlaming) {
      score -= 15;
      tone = 'blaming';
      improvements.push('Avoid "why" questions that can sound accusatory');
    }

    if (!hasValidation) {
      improvements.push('Try starting with validation of their feelings');
    }

    setAiCoachFeedback({
      score: Math.min(100, Math.max(0, score)),
      tone,
      improvements,
      refinedScript: hasBlaming 
        ? userResponse.replace(/Why did you/g, 'I can see that you\'re upset, and I\'d like to understand what happened')
        : userResponse,
      suggestedNext: 'Ask an open-ended question to encourage them to share more'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100'; 
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
                <h2 className="font-semibold">Teen Communication</h2>
                <p className="text-xs text-white/80">Evidence-Based Training</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Globe className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Accessibility className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#F4F7FA] border-0 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#657FA4] to-[#8BAAC6] relative">
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-lg font-bold">Speak. Listen. Connect.</h1>
                <p className="text-sm text-white/90">Practical, research-backed guidance to support your teen.</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex gap-3 mb-4">
                <Button 
                  className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                  onClick={() => startRoleplay(roleplayScenarios[0])}
                >
                  Start Practice
                </Button>
                <Button variant="outline" className="flex-1">
                  Take Quick Course
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="font-semibold text-[#2E2E2E]">8–15 min</div>
                  <div className="text-[#5C5C5C]">modules</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2E2E2E]">Lessons, Roleplay</div>
                  <div className="text-[#5C5C5C]">format</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2E2E2E]">Certificate</div>
                  <div className="text-[#5C5C5C]">on completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Live Roleplay Practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-[#657FA4] bg-gradient-to-r from-[#F4F7FA] to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#657FA4]" />
                Live Roleplay Practice
                <Badge className="bg-[#AED6D2] text-[#2E2E2E]">Core Feature</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#5C5C5C] mb-4">
                Practice real conversations, get AI feedback, and refine your approach until you feel confident.
              </p>
              <div className="grid gap-3 mb-4">
                {roleplayScenarios.map((scenario) => (
                  <Card 
                    key={scenario.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-0 bg-white"
                    onClick={() => startRoleplay(scenario)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {scenario.category}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-[#2E2E2E] text-sm mb-1">{scenario.title}</h4>
                      <p className="text-xs text-[#5C5C5C]">{scenario.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                className="w-full bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                onClick={() => startRoleplay(roleplayScenarios[0])}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Practice Session
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Message Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 bg-[#F4F7FA]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#657FA4]" />
                Message Templates & Scripts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {messageTemplates.map((template, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow bg-white border-0"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowTemplateModal(true);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-[#2E2E2E]">{template.title}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-[#657FA4]">
                            {template.effectiveness}% effective
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-[#5C5C5C]">Recommended</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#5C5C5C] mb-2 italic">
                        "{template.example}"
                      </p>
                      <p className="text-xs text-[#657FA4]">
                        Cultural note: {template.culturalNote}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Roleplay Practice Modal */}
      <Dialog open={showRoleplay} onOpenChange={setShowRoleplay}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Roleplay Practice: {selectedScenario?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedScenario && (
            <div className="space-y-4">
              {/* Scenario Context */}
              <Card className="bg-[#F4F7FA] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                      {selectedScenario.difficulty}
                    </Badge>
                    <Badge variant="outline">{selectedScenario.category}</Badge>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-l-4 border-l-[#657FA4]">
                    <p className="text-sm text-[#2E2E2E] font-medium">
                      {selectedScenario.prompt}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Response Input */}
              <div>
                <Label className="text-sm font-semibold text-[#2E2E2E] mb-2 block">
                  Your Response
                </Label>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="How would you respond to your teen in this situation?"
                  className="min-h-24"
                />
              </div>

              {/* AI Coach Feedback */}
              {aiCoachFeedback && (
                <Card className="border-0 bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Coach Feedback
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{aiCoachFeedback.score}/100</div>
                          <div className="text-xs text-green-600">Score</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            aiCoachFeedback.tone === 'empathetic' ? 'text-green-700' :
                            aiCoachFeedback.tone === 'blaming' ? 'text-red-700' : 'text-orange-700'
                          }`}>
                            {aiCoachFeedback.tone}
                          </div>
                          <div className="text-xs text-green-600">Tone</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-lg">
                        <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Refined Script</h5>
                        <p className="text-sm text-[#5C5C5C] italic">"{aiCoachFeedback.refinedScript}"</p>
                      </div>

                      {aiCoachFeedback.improvements.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-[#2E2E2E] mb-2">Areas to Improve</h5>
                          <ul className="space-y-1">
                            {aiCoachFeedback.improvements.map((improvement: string, index: number) => (
                              <li key={index} className="text-sm text-[#5C5C5C] flex items-start gap-2">
                                <Lightbulb className="w-3 h-3 mt-1 text-[#657FA4] flex-shrink-0" />
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowRoleplay(false)}>
                  Close
                </Button>
                <Button 
                  onClick={submitRoleplayResponse}
                  disabled={!userResponse.trim()}
                  className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Feedback
                </Button>
                {aiCoachFeedback && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setUserResponse('');
                      setAiCoachFeedback(null);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message Template</DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#2E2E2E] mb-2">{selectedTemplate.title}</h4>
                <Badge variant="outline">{selectedTemplate.category}</Badge>
              </div>
              
              <div className="p-3 bg-[#F4F7FA] rounded-lg">
                <h5 className="text-sm font-semibold text-[#2E2E2E] mb-1">Template</h5>
                <p className="text-sm text-[#5C5C5C] font-mono">{selectedTemplate.template}</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h5 className="text-sm font-semibold text-green-800 mb-1">Example</h5>
                <p className="text-sm text-green-700 italic">"{selectedTemplate.example}"</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="text-sm font-semibold text-blue-800 mb-1">Cultural Note</h5>
                <p className="text-sm text-blue-700">{selectedTemplate.culturalNote}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Save Template
                </Button>
                <Button className="flex-1 bg-[#657FA4] hover:bg-[#8BAAC6] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send via App
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Crisis Modal */}
      <Dialog open={showCrisisModal} onOpenChange={setShowCrisisModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Crisis Support Needed
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-[#2E2E2E]">
              This scenario involves serious mental health concerns. If there is immediate danger, please call emergency services.
            </p>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-800 mb-2">Immediate Actions</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Stay calm and listen without judgment</li>
                  <li>• Do not leave them alone</li>
                  <li>• Remove any means of self-harm</li>
                  <li>• Contact a mental health professional immediately</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Services
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect to Crisis Expert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}