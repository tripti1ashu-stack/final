import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle, Phone, MessageCircle, Globe, Copy, Check } from "lucide-react";

const helplineNumbers = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support and suicide prevention",
    type: "Emergency",
    country: "USA"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text",
    type: "Text Support",
    country: "USA"
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Treatment referral and information service",
    type: "Information",
    country: "USA"
  },
  {
    name: "Teen Line",
    number: "1-800-852-8336",
    description: "Peer support for teens by teens",
    type: "Peer Support",
    country: "USA"
  },
  {
    name: "National Child Abuse Hotline",
    number: "1-800-4-A-CHILD (1-800-422-4453)",
    description: "24/7 support for children and families",
    type: "Child Protection",
    country: "USA"
  },
  {
    name: "LGBTQ National Hotline",
    number: "1-888-843-4564",
    description: "Support for LGBTQ+ youth and adults",
    type: "LGBTQ+ Support",
    country: "USA"
  },
  {
    name: "National Domestic Violence Hotline",
    number: "1-800-799-7233",
    description: "24/7 support for domestic violence survivors",
    type: "Domestic Violence",
    country: "USA"
  },
  {
    name: "NAMI Helpline",
    number: "1-800-950-6264",
    description: "National Alliance on Mental Illness support",
    type: "Mental Health",
    country: "USA"
  }
];

const internationalHelplines = [
  {
    name: "Samaritans",
    number: "116 123",
    description: "Free emotional support",
    country: "UK"
  },
  {
    name: "Lifeline",
    number: "13 11 14",
    description: "24/7 crisis support",
    country: "Australia"
  },
  {
    name: "Kids Help Phone",
    number: "1-800-668-6868",
    description: "Support for children and teens",
    country: "Canada"
  },
  {
    name: "AASRA",
    number: "91-9820466726",
    description: "Suicide prevention helpline",
    country: "India"
  }
];

interface UrgentHelpModalProps {
  children: React.ReactNode;
}

export function UrgentHelpModal({ children }: UrgentHelpModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch (err) {
      console.error('Failed to copy number:', err);
    }
  };

  const makeCall = (number: string) => {
    const cleanNumber = number.replace(/[^\d]/g, '');
    window.open(`tel:${cleanNumber}`, '_self');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[90vh] bg-white border-t border-[#F4F7FA]">
        <SheetHeader className="text-center pb-4 border-b border-[#F4F7FA]">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <SheetTitle className="text-[#0F1722] text-xl">Urgent Help Resources</SheetTitle>
          <p className="text-[#55707F] text-sm">
            If you're in immediate danger, call emergency services (911) right away.
            <br />
            These resources provide free, confidential support 24/7.
          </p>
        </SheetHeader>

        <div className="py-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-red-800 font-semibold text-sm mb-1">Immediate Emergency</h4>
                <p className="text-red-700 text-xs">
                  If you're having thoughts of suicide or self-harm, please call 911 or go to your nearest emergency room immediately.
                </p>
              </div>
            </div>
          </motion.div>

          {/* US Helplines */}
          <div>
            <h3 className="text-[#0F1722] mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              US Crisis Helplines
            </h3>
            <div className="space-y-3">
              {helplineNumbers.map((helpline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#F4F7FA] border-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-[#0F1722] text-sm font-semibold">{helpline.name}</h4>
                            <span className="bg-[#AED6D2] text-[#0F1722] text-xs px-2 py-1 rounded-full">
                              {helpline.type}
                            </span>
                          </div>
                          <p className="text-[#55707F] text-xs mb-3">{helpline.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[#0F1722] font-mono text-sm bg-white px-3 py-1 rounded border">
                              {helpline.number}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => makeCall(helpline.number)}
                            className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white px-3 py-1 h-8"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(helpline.number)}
                            className="px-3 py-1 h-8"
                          >
                            {copiedNumber === helpline.number ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* International Helplines */}
          <div>
            <h3 className="text-[#0F1722] mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              International Helplines
            </h3>
            <div className="space-y-3">
              {internationalHelplines.map((helpline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (helplineNumbers.length + index) * 0.1 }}
                >
                  <Card className="bg-[#F4F7FA] border-0">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-[#0F1722] text-sm font-semibold">{helpline.name}</h4>
                            <span className="bg-[#8BAAC6] text-white text-xs px-2 py-1 rounded-full">
                              {helpline.country}
                            </span>
                          </div>
                          <p className="text-[#55707F] text-xs mb-3">{helpline.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[#0F1722] font-mono text-sm bg-white px-3 py-1 rounded border">
                              {helpline.number}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => makeCall(helpline.number)}
                            className="bg-[#657FA4] hover:bg-[#8BAAC6] text-white px-3 py-1 h-8"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(helpline.number)}
                            className="px-3 py-1 h-8"
                          >
                            {copiedNumber === helpline.number ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-[#F4F7FA] rounded-lg p-4">
            <h4 className="text-[#0F1722] font-semibold text-sm mb-2">Additional Resources</h4>
            <ul className="text-[#55707F] text-xs space-y-1">
              <li>• Crisis Text Line: Text HOME to 741741</li>
              <li>• National Suicide Prevention Lifeline Chat: suicidepreventionlifeline.org</li>
              <li>• SAMHSA Treatment Locator: findtreatment.samhsa.gov</li>
              <li>• Mental Health America: mhanational.org</li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="min-w-32"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}