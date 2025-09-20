import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Info, 
  Shield, 
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Eye,
  AlertTriangle,
  Clock,
  FileText,
  Send,
  Save,
  HelpCircle,
  CheckCircle2,
  Copy,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Skeleton } from "./ui/skeleton";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";

interface AnonymousFeedbackProps {
  onBack: () => void;
  currentLanguage: string;
}

interface Institution {
  id: string;
  name: string;
  departments: Department[];
}

interface Department {
  id: string;
  name: string;
  units: string[];
}

interface FeedbackForm {
  institution: string;
  department: string;
  unit: string;
  category: string;
  customCategory: string;
  relatedModule: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  impact: string[];
  dateTime: string;
  attachments: File[];
  isAnonymous: boolean;
  shareWithRoles: string[];
  allowFollowUp: boolean;
  consent: boolean;
}

const institutions: Institution[] = [
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    departments: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering',
        units: ['Faculty Office', 'Lab Coordinator', 'Department Admin']
      },
      {
        id: 'hostels',
        name: 'Hostels',
        units: ['Hostel A Warden', 'Hostel B Warden', 'Hostel Committee']
      },
      {
        id: 'counseling',
        name: 'Counseling Services',
        units: ['Counseling Center', 'Mental Health Team', 'Peer Support']
      }
    ]
  }
];

const categories = [
  { id: 'academic-stress', label: 'Academic Stress', icon: '📚' },
  { id: 'exam-anxiety', label: 'Exam Anxiety', icon: '📝' },
  { id: 'course-load', label: 'Course Load Issues', icon: '📊' },
  { id: 'faculty-relations', label: 'Faculty Relations', icon: '👨‍🏫' },
  { id: 'academic-policy', label: 'Academic Policy', icon: '📋' },
  { id: 'grading-concerns', label: 'Grading Concerns', icon: '📈' },
  { id: 'institutional-support', label: 'Institutional Support', icon: '🏛️' }
];

const modules = [
  { id: 'stress-story', title: 'How I Overcame My Stress', summary: 'Personal journey of managing exam anxiety' },
  { id: 'sleep-module', title: 'Better Sleep Habits', summary: 'Tips for improving sleep quality' },
  { id: 'focus-guide', title: 'Focus & Productivity', summary: 'Techniques for better concentration' }
];

const roleOptions = [
  { id: 'admin', label: 'Institution Admin' },
  { id: 'dean', label: 'Dean' },
  { id: 'counseling', label: 'Counseling Team' },
  { id: 'security', label: 'Security' }
];

export function AnonymousFeedback({ onBack, currentLanguage }: AnonymousFeedbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<'form' | 'preview' | 'success'>('form');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    institution: true,
    category: true,
    details: true
  });
  
  const [form, setForm] = useState<FeedbackForm>({
    institution: '',
    department: '',
    unit: '',
    category: '',
    customCategory: '',
    relatedModule: '',
    description: '',
    severity: 'medium',
    impact: [],
    dateTime: new Date().toISOString().slice(0, 16),
    attachments: [],
    isAnonymous: true,
    shareWithRoles: ['admin'],
    allowFollowUp: false,
    consent: false
  });

  const [previewData, setPreviewData] = useState<any>(null);
  const [trackingId, setTrackingId] = useState('');
  const [submitProgress, setSubmitProgress] = useState(0);

  useEffect(() => {
    // Simulate loading institutions and modules
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 200 + 200);

    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateForm = (field: keyof FeedbackForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAttachmentUpload = (files: FileList | null) => {
    if (files && form.attachments.length + files.length <= 3) {
      const newFiles = Array.from(files).filter(file => file.size <= 10 * 1024 * 1024);
      updateForm('attachments', [...form.attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    updateForm('attachments', form.attachments.filter((_, i) => i !== index));
  };

  const generatePreview = () => {
    // Simulate anonymization process
    const anonymizedDescription = form.description
      .replace(/\b\d{10}\b/g, '[REDACTED_PHONE]')
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]')
      .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[REDACTED_NAME]');

    setPreviewData({
      institution: form.institution,
      category: form.category,
      severity: form.severity,
      dateTime: form.dateTime,
      description: anonymizedDescription,
      attachments: form.attachments.map((file, index) => ({
        name: `Attachment_${String(index + 1).padStart(2, '0')}.${file.name.split('.').pop()}`,
        redacted: file.name.toLowerCase().includes('id') || file.name.toLowerCase().includes('personal')
      }))
    });
    setCurrentStep('preview');
  };

  const submitFeedback = async () => {
    setSubmitProgress(0);
    
    // Simulate submission progress
    const interval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTrackingId(`FB${Date.now().toString().slice(-6)}`);
          setCurrentStep('success');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const selectedInstitution = institutions.find(inst => inst.id === form.institution);
  const selectedDepartment = selectedInstitution?.departments.find(dept => dept.id === form.department);

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Feedback Submitted</h2>
        </div>

        <div className="p-6 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 bg-[#AED6D2] rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#2E2E2E]" />
            </motion.div>
            
            <h3 className="text-[#2E2E2E] mb-2">Thanks — your feedback has been sent anonymously</h3>
            <p className="text-[#5C5C5C] text-sm mb-6">
              Your report will be reviewed by the appropriate authorities. You've earned 10 XP for contributing to campus improvement.
            </p>
          </motion.div>

          <Card className="bg-[#F4F7FA] border-0 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-[#2E2E2E]">Tracking ID</Label>
                  <p className="text-lg font-mono font-bold text-[#657FA4]">{trackingId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(trackingId)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              
              <p className="text-[#5C5C5C] text-sm mb-4">
                You can edit this report for 15 minutes from submission. Officials will see anonymized text and attachments.
              </p>
              
              {form.allowFollowUp && (
                <div className="bg-[#AED6D2]/20 p-3 rounded-lg">
                  <p className="text-[#2E2E2E] text-sm">
                    Officials may request clarifying info via anonymous channel. You may choose to respond.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]">
              <Save className="w-4 h-4 mr-2" />
              Save to My Reports
            </Button>
            
            <Button variant="outline" className="w-full">
              Submit Another Report
            </Button>
            
            <Button variant="ghost" onClick={onBack} className="w-full text-[#5C5C5C]">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'preview') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 h-14 bg-[#657FA4] flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('form')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 p-0 mr-3"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <h2 className="flex-1 text-white text-center font-semibold">Anonymized Preview</h2>
        </div>

        <div className="p-4 space-y-6">
          <Card className="border-[#657FA4] border-2">
            <CardHeader className="bg-[#657FA4] text-white">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Anonymized Preview — This is what authorities will see
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-[#5C5C5C]">Institution</Label>
                  <p className="text-[#2E2E2E]">{selectedInstitution?.name}</p>
                </div>
                <div>
                  <Label className="text-[#5C5C5C]">Category</Label>
                  <p className="text-[#2E2E2E]">{categories.find(c => c.id === form.category)?.label}</p>
                </div>
                <div>
                  <Label className="text-[#5C5C5C]">Severity</Label>
                  <Badge variant={form.severity === 'emergency' ? 'destructive' : 'secondary'}>
                    {form.severity}
                  </Badge>
                </div>
                <div>
                  <Label className="text-[#5C5C5C]">Date</Label>
                  <p className="text-[#2E2E2E]">{new Date(form.dateTime).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-[#5C5C5C]">Description</Label>
                <div className="mt-2 p-3 bg-[#F4F7FA] rounded-lg">
                  <p className="text-[#2E2E2E] text-sm leading-relaxed whitespace-pre-wrap">
                    {previewData?.description}
                  </p>
                </div>
              </div>
              
              {previewData?.attachments?.length > 0 && (
                <div>
                  <Label className="text-[#5C5C5C]">Attachments</Label>
                  <div className="mt-2 space-y-2">
                    {previewData.attachments.map((attachment: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-[#657FA4]" />
                        <span className="text-[#2E2E2E]">{attachment.name}</span>
                        {attachment.redacted && (
                          <Badge variant="outline" className="text-xs">redacted</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {submitProgress > 0 && (
            <Card className="bg-[#F4F7FA] border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#657FA4]"></div>
                  <span className="text-[#2E2E2E]">Submitting...</span>
                </div>
                <Progress value={submitProgress} className="w-full" />
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('form')}
              className="flex-1"
              disabled={submitProgress > 0}
            >
              Edit
            </Button>
            <Button
              onClick={submitFeedback}
              className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
              disabled={submitProgress > 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Confirm & Submit
            </Button>
          </div>
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
        
        <h2 className="flex-1 text-white text-center font-semibold">Anonymous Feedback</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Info className="w-4 h-4 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Privacy & Anonymization</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <p>Your identity is hidden by default. We automatically remove:</p>
              <ul className="list-disc list-inside space-y-1 text-[#5C5C5C]">
                <li>Phone numbers and email addresses</li>
                <li>Personal names and identifiers</li>
                <li>Location data from attachments</li>
                <li>Any other personally identifying information</li>
              </ul>
              <p className="text-[#5C5C5C]">
                Only anonymized content reaches the authorities. You can track your report using the tracking ID we provide.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#AED6D2] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#2E2E2E]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#2E2E2E] mb-2">Share feedback anonymously with your college authorities</h3>
                  <p className="text-[#5C5C5C] text-sm mb-4">
                    Use this to report issues that affect student mental health, safety, or campus facilities. You can attach files or link to a module.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                      size="sm"
                      onClick={() => document.getElementById('form-start')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Start Feedback
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#657FA4]">
                      View anonymization policy
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Sections */}
        <div id="form-start" className="space-y-4">
          {/* Institution Selection */}
          <Collapsible 
            open={expandedSections.institution} 
            onOpenChange={() => toggleSection('institution')}
          >
            <Card className="bg-[#F4F7FA] border-0">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F4F7FA]/80 transition-colors">
                  <CardTitle className="flex items-center justify-between text-[#2E2E2E]">
                    <div className="flex items-center gap-2">
                      <span>Select Institution / Unit</span>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                    {expandedSections.institution ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Select value={form.institution} onValueChange={(value) => updateForm('institution', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Institution" />
                          </SelectTrigger>
                          <SelectContent>
                            {institutions.map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>{inst.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedInstitution && (
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Select value={form.department} onValueChange={(value) => updateForm('department', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedInstitution.departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {selectedDepartment && (
                        <div className="space-y-2">
                          <Label>Unit</Label>
                          <Select value={form.unit} onValueChange={(value) => updateForm('unit', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedDepartment.units.map((unit) => (
                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Category Selection */}
          <Collapsible 
            open={expandedSections.category} 
            onOpenChange={() => toggleSection('category')}
          >
            <Card className="bg-[#F4F7FA] border-0">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F4F7FA]/80 transition-colors">
                  <CardTitle className="flex items-center justify-between text-[#2E2E2E]">
                    <div className="flex items-center gap-2">
                      <span>Category</span>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                    {expandedSections.category ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={form.category === cat.id ? "default" : "outline"}
                        className={`h-auto p-3 flex flex-col gap-2 ${
                          form.category === cat.id 
                            ? "bg-[#657FA4] hover:bg-[#657FA4]/90" 
                            : "hover:bg-[#F4F7FA]"
                        }`}
                        onClick={() => updateForm('category', cat.id)}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm">{cat.label}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {form.category === 'other' && (
                    <div className="space-y-2">
                      <Label>Please specify</Label>
                      <Input
                        value={form.customCategory}
                        onChange={(e) => updateForm('customCategory', e.target.value)}
                        placeholder="Describe the category"
                      />
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Related Module */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                Related Module / Page
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={form.relatedModule} onValueChange={(value) => updateForm('relatedModule', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Link to a module (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {form.relatedModule && (
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="text-[#2E2E2E] text-sm font-semibold mb-1">
                    {modules.find(m => m.id === form.relatedModule)?.title}
                  </h4>
                  <p className="text-[#5C5C5C] text-xs">
                    {modules.find(m => m.id === form.relatedModule)?.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Collapsible 
            open={expandedSections.details} 
            onOpenChange={() => toggleSection('details')}
          >
            <Card className="bg-[#F4F7FA] border-0">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F4F7FA]/80 transition-colors">
                  <CardTitle className="flex items-center justify-between text-[#2E2E2E]">
                    <div className="flex items-center gap-2">
                      <span>Details / Description</span>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                    {expandedSections.details ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      value={form.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Describe the issue, when it occurred, who it affected (no personal names), and what you want the authorities to do."
                      className="min-h-32"
                      maxLength={3000}
                    />
                    <div className="flex justify-between text-xs text-[#5C5C5C]">
                      <p>Tip: do not include names, emails, phone numbers — your report will be anonymized.</p>
                      <p>{form.description.length}/3000</p>
                    </div>
                  </div>

                  {/* Severity */}
                  <div className="space-y-3">
                    <Label>Severity</Label>
                    <RadioGroup value={form.severity} onValueChange={(value: any) => updateForm('severity', value)}>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
                          { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
                          { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
                          { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
                        ].map((severity) => (
                          <div key={severity.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={severity.value} id={severity.value} />
                            <Label 
                              htmlFor={severity.value}
                              className={`flex-1 p-2 rounded-lg cursor-pointer ${severity.color}`}
                            >
                              {severity.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Impact */}
                  <div className="space-y-3">
                    <Label>Impact (select all that apply)</Label>
                    <div className="space-y-2">
                      {[
                        'Student wellbeing',
                        'Safety risk',
                        'Academic disruption',
                        'Policy gap',
                        'Other'
                      ].map((impact) => (
                        <div key={impact} className="flex items-center space-x-2">
                          <Checkbox
                            id={impact}
                            checked={form.impact.includes(impact)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateForm('impact', [...form.impact, impact]);
                              } else {
                                updateForm('impact', form.impact.filter(i => i !== impact));
                              }
                            }}
                          />
                          <Label htmlFor={impact} className="cursor-pointer">
                            {impact}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-2">
                    <Label>Date & Time (optional)</Label>
                    <Input
                      type="datetime-local"
                      value={form.dateTime}
                      onChange={(e) => updateForm('dateTime', e.target.value)}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Attachments */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E] flex items-center gap-2">
                Attachments
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-[#8BAAC6] rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-[#8BAAC6] mx-auto mb-3" />
                <p className="text-[#2E2E2E] mb-2">Upload images, documents, or audio</p>
                <p className="text-[#5C5C5C] text-sm mb-4">
                  Max 3 items, 10MB each. JPG, PNG, PDF, MP4, M4A
                </p>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.mp4,.m4a"
                  onChange={(e) => handleAttachmentUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={form.attachments.length >= 3}
                >
                  Choose Files
                </Button>
              </div>

              {form.attachments.length > 0 && (
                <div className="space-y-2">
                  {form.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#657FA4]" />
                        <div>
                          <p className="text-[#2E2E2E] text-sm">{file.name}</p>
                          <p className="text-[#5C5C5C] text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-[#AED6D2]/20 p-3 rounded-lg">
                <p className="text-[#2E2E2E] text-sm">
                  <Shield className="w-4 h-4 inline mr-1" />
                  We will screen and redact obvious personal identifiers from attachments. 
                  Please avoid uploading IDs or private documents.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Controls */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardHeader>
              <CardTitle className="text-[#2E2E2E]">Visibility & Anonymity Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#657FA4]" />
                  <div>
                    <p className="text-[#2E2E2E]">Stay anonymous</p>
                    <p className="text-[#5C5C5C] text-sm">Your identity will be hidden from authorities</p>
                  </div>
                </div>
                <Switch 
                  checked={form.isAnonymous} 
                  onCheckedChange={(checked) => updateForm('isAnonymous', checked)} 
                />
              </div>

              <div className="space-y-3">
                <Label>Share with specific roles</Label>
                <div className="space-y-2">
                  {roleOptions.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={role.id}
                        checked={form.shareWithRoles.includes(role.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateForm('shareWithRoles', [...form.shareWithRoles, role.id]);
                          } else {
                            updateForm('shareWithRoles', form.shareWithRoles.filter(r => r !== role.id));
                          }
                        }}
                      />
                      <Label htmlFor={role.id} className="cursor-pointer">
                        {role.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="followup"
                  checked={form.allowFollowUp}
                  onCheckedChange={(checked) => updateForm('allowFollowUp', checked)}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor="followup" className="cursor-pointer">
                    Allow follow-up?
                  </Label>
                  <p className="text-[#5C5C5C] text-sm">
                    Allow a responsible official to request clarifying info via anonymized channel
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent & Submit */}
          <Card className="bg-[#F4F7FA] border-0">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={(checked) => updateForm('consent', checked)}
                  required
                  className="mt-1"
                />
                <Label htmlFor="consent" className="cursor-pointer text-sm">
                  I confirm I'll not share other people's private info and that this report is anonymous.
                </Label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Save draft functionality
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={generatePreview}
                  disabled={!form.institution || !form.category || !form.description || !form.consent}
                  className="flex-1 bg-[#AED6D2] hover:bg-[#8BAAC6] text-[#2E2E2E]"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Anonymized Report
                </Button>
              </div>

              <p className="text-[#5C5C5C] text-xs text-center">
                By submitting, you confirm that this report is anonymous. You will receive a tracking ID to refer to it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}