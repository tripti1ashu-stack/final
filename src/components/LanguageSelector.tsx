import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' }
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  variant?: 'default' | 'compact';
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'default' 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-[#55707F] hover:text-[#0F1722]">
          <Globe className="w-4 h-4 mr-1" />
          {variant === 'compact' ? currentLang?.code.toUpperCase() : currentLang?.code.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 max-h-80 overflow-y-auto bg-white border border-[#F4F7FA] shadow-lg"
      >
        <div className="p-2">
          <p className="text-xs text-[#55707F] mb-2 px-2">Select Language</p>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#F4F7FA] rounded-md"
            >
              <div className="flex flex-col">
                <span className="text-sm text-[#0F1722]">{language.name}</span>
                <span className="text-xs text-[#55707F]">{language.nativeName}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-[#657FA4]" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}