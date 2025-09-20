import { Button } from "./ui/button";
import { Calendar, TrendingUp, Home } from "lucide-react";

interface BottomNavigationProps {
  currentTab: 'home' | 'routine' | 'progress';
  onTabChange: (tab: 'home' | 'routine' | 'progress') => void;
   onNavigateToWellnessRoutine?: () => void;
}

export function BottomNavigation({ currentTab,onNavigateToWellnessRoutine}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F4F7FA] z-20">
      <div className="flex items-center justify-around py-2 px-4 h-18">
        {/* Routine Manager */}
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
            currentTab === 'routine' ? 'text-[#657FA4]' : 'text-[#55707F]'
          }`}
          onClick={() => onNavigateToWellnessRoutine?.()}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Routine</span>
        </Button>

        {/* Home - placeholder for FAB space */}
        <div className="w-16"></div>

        {/* Trends & Progress */}
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
            currentTab === 'progress' ? 'text-[#657FA4]' : 'text-[#55707F]'
          }`}
          onClick={() => onTabChange('progress')}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs">Progress</span>
        </Button>
      </div>
    </div>
  );
}
