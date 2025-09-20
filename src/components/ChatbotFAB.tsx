import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./ui/sheet";
import { MessageCircle, Mic, Send, Volume2, VolumeX, AlertTriangle, Globe, Shield } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { LanguageSelector } from "./LanguageSelector";

const quickMoods = [
  { icon: '😰', label: 'Stressed', color: 'bg-red-100 text-red-700' },
  { icon: '😔', label: 'Lonely', color: 'bg-blue-100 text-blue-700' },
  { icon: '😴', label: 'Tired', color: 'bg-purple-100 text-purple-700' },
  { icon: '😠', label: 'Angry', color: 'bg-orange-100 text-orange-700' },
  { icon: '😕', label: 'Confused', color: 'bg-yellow-100 text-yellow-700' },
  { icon: '😊', label: 'Fine', color: 'bg-green-100 text-green-700' }
];

const quickActions = [
  { label: '2-min breathing', action: 'breathing' },
  { label: 'Journal', action: 'journal' },
  { label: 'Call Volunteer', action: 'volunteer' },
  { label: 'Play calming music', action: 'music' }
];

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  mood?: string;
}

interface ChatbotFABProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export function ChatbotFAB({ currentLanguage = 'en', onLanguageChange }: ChatbotFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);

  const handleMoodSelect = (mood: string) => {
    setShowInitialPrompt(false);
    const newMessage: Message = {
      id: Date.now().toString(),
      content: `I'm feeling ${mood.toLowerCase()}`,
      isBot: false,
      timestamp: new Date(),
      mood
    };
    
    setMessages([newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're feeling ${mood.toLowerCase()}. That's completely valid. Would you like to talk about what's making you feel this way, or would you prefer I suggest some helpful exercises?`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setShowInitialPrompt(false);
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to listen and help. Can you tell me more about what's on your mind today?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    // Handle quick actions
    console.log('Quick action:', action);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] shadow-lg border-4 border-white"
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl border-0 bg-white">
            <SheetHeader className="border-b border-[#F4F7FA] pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] flex items-center justify-center text-2xl">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      😊
                    </motion.div>
                  </div>
                  <div>
                    <SheetTitle className="text-[#0F1722] text-lg">Mind Mitra</SheetTitle>
                    <SheetDescription className="text-[#55707F] text-sm">Your wellness buddy</SheetDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-[#AED6D2] text-[#0F1722]">
                    <Shield className="w-3 h-3 mr-1" />
                    Anonymous
                  </Badge>
                  {onLanguageChange && (
                    <LanguageSelector 
                      currentLanguage={currentLanguage}
                      onLanguageChange={onLanguageChange}
                      variant="compact"
                    />
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button variant="destructive" size="sm">
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SheetHeader>

            {/* Chat Content */}
            <div className="flex flex-col h-full">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {showInitialPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="bg-[#F4F7FA] rounded-2xl p-4">
                      <p className="text-[#0F1722] mb-4">Hi! I'm Mind Mitra — want to tell me what's on your mind?</p>
                      <p className="text-[#55707F] text-sm mb-4">What's on your mind today?</p>
                      
                      {/* Mood Selection */}
                      <div className="grid grid-cols-3 gap-2">
                        {quickMoods.map((mood) => (
                          <Button
                            key={mood.label}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoodSelect(mood.label)}
                            className={`${mood.color} h-auto py-2 px-3 flex flex-col items-center gap-1`}
                          >
                            <span className="text-lg">{mood.icon}</span>
                            <span className="text-xs">{mood.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Chat Messages */}
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-[#F4F7FA] text-[#0F1722]'
                            : 'bg-[#657FA4] text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isBot ? 'text-[#55707F]' : 'text-white/70'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-[#F4F7FA]">
                <div className="flex gap-2 overflow-x-auto">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="whitespace-nowrap text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#F4F7FA]">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button variant="ghost" size="sm">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722]"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
}