import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

interface AvatarIntroProps {
  onComplete: () => void;
}

const introLines = [
  "Hi — I'm Mind Mitra, your friendly wellness buddy.",
  "I can listen, suggest exercises, and connect you anonymously to help.",
  "Tap a role below to get started — your privacy is our priority.",
  "Tip: You can always tap the chat button to talk anytime."
];

export function AvatarIntro({ onComplete }: AvatarIntroProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTextOnly, setShowTextOnly] = useState(false);

  useEffect(() => {
    if (currentLine >= introLines.length) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentLine(prev => prev + 1);
    }, 2000); // Each line shows for 2 seconds

    return () => clearTimeout(timer);
  }, [currentLine]);

  const handleSkip = () => {
    setIsComplete(true);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-40"
        onAnimationComplete={handleComplete}
      >
        <motion.div
          animate={{ y: -100, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-55 h-55 mx-auto mb-6 bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] rounded-full flex items-center justify-center text-6xl">
            😊
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="text-center max-w-sm">
        {/* Skip button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="absolute top-6 right-6 text-[#55707F]"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>

        {/* Controls */}
        <div className="absolute top-6 left-6 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#55707F]"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTextOnly(!showTextOnly)}
            className="text-[#55707F] text-xs"
          >
            Text Only
          </Button>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-55 h-55 mx-auto mb-6 bg-gradient-to-br from-[#AED6D2] to-[#8BAAC6] rounded-full flex items-center justify-center text-6xl shadow-lg">
            <motion.div
              animate={{ 
                scale: currentLine < introLines.length ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 0.6, 
                repeat: currentLine < introLines.length ? Infinity : 0,
                repeatDelay: 1.4 
              }}
            >
              😊
            </motion.div>
          </div>

          {/* Speech bubble */}
          {currentLine < introLines.length && (
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#AED6D2] relative"
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-[#AED6D2] rotate-45"></div>
              <p className="text-[#0F1722] leading-relaxed">
                {introLines[currentLine]}
              </p>
            </motion.div>
          )}

          {/* Text-only mode */}
          {showTextOnly && (
            <div className="mt-6 space-y-2">
              {introLines.map((line, index) => (
                <p 
                  key={index} 
                  className={`text-sm ${index <= currentLine ? 'text-[#0F1722]' : 'text-[#55707F]'}`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {introLines.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index <= currentLine ? 'bg-[#AED6D2]' : 'bg-[#8BAAC6]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}