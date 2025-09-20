import { useEffect, useState } from "react";
import { motion } from "motion/react";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 350); // Wait for fade out
    }, 1600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 bg-[#657FA4] flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.35 }}
          className="w-30 h-30 bg-white rounded-3xl flex items-center justify-center p-2"
        >
          <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#657FA4] flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-30 h-30 bg-white rounded-3xl flex items-center justify-center shadow-lg p-2"
      >
        <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
      </motion.div>
    </div>
  );
}