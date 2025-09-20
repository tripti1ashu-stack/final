import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Globe, GraduationCap, Building, UserCheck, Users } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import mindMitraLogo from "figma:asset/64ccc0b9526d810feec7a1792dd57a4eb5c8d2cf.png";

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'official' | 'professional' | 'parent') => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const roles = [
  {
    id: 'student' as const,
    icon: GraduationCap,
    title: 'Student',
    subtitle: 'Academic support & wellness',
    color: 'from-[#AED6D2] to-[#8BAAC6]'
  },
  {
    id: 'official' as const,
    icon: Building,
    title: 'Official',
    subtitle: 'Institution management',
    color: 'from-[#657FA4] to-[#8BAAC6]'
  },
  {
    id: 'professional' as const,
    icon: UserCheck,
    title: 'Certified Professional',
    subtitle: 'Provide expert guidance',
    color: 'from-[#8BAAC6] to-[#657FA4]'
  },
  {
    id: 'parent' as const,
    icon: Users,
    title: 'Parent/Guardian',
    subtitle: 'Support your loved ones',
    color: 'from-[#AED6D2] to-[#657FA4]'
  }
];

export function RoleSelection({ onRoleSelect, currentLanguage, onLanguageChange }: RoleSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
            <img src={mindMitraLogo} alt="Mind Mitra Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-[#0F1722]">MindMitra</span>
        </div>
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          variant="compact"
        />
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-[#0F1722] mb-2">Choose Your Role</h1>
          <p className="text-[#55707F] text-sm">Choose how you'd like to enter</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#AED6D2] bg-[#F4F7FA]"
                onClick={() => onRoleSelect(role.id)}
              >
                <div className="text-center space-y-3">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center shadow-md`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-[#0F1722] mb-1">{role.title}</h3>
                    <p className="text-[#55707F] text-xs leading-relaxed">{role.subtitle}</p>
                  </div>
                  
                  {/* CTA */}
                  <Button 
                    size="sm" 
                    className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#0F1722] text-xs"
                  >
                    Select
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Accessibility Note */}
        <div className="mt-8 text-center">
          <p className="text-[#55707F] text-xs max-w-xs mx-auto leading-relaxed">
            Your privacy is our priority. All interactions can be kept anonymous.
          </p>
        </div>
      </div>
    </motion.div>
  );
}