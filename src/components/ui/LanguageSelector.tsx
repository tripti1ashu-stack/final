import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  variant?: "compact" | "full";
}

const languages = ["EN", "HI", "ES", "FR"];

function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => setOpen(!open)}
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage}</span>
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-24 z-20">
          {languages.map(lang => (
            <div 
              key={lang} 
              onClick={() => { onLanguageChange(lang); setOpen(false); }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${lang === currentLanguage ? "font-semibold text-blue-600" : ""}`}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
