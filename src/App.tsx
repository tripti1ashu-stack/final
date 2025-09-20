import { useState } from "react";
import { AvatarIntro } from "./components/AvatarIntro";
import { RoleSelection } from "./components/RoleSelection";
import { AuthScreen } from "./components/AuthScreen";
import { StudentHome } from "./components/StudentHome";
import { OfficialHome } from "./components/OfficialHome";
import { ProfessionalHome } from "./components/ProfessionalHome";
import { ParentHome } from "./components/ParentHome";
import { BottomNavigation } from "./components/BottomNavigation";
import { ChatbotFAB } from "./components/ChatbotFAB";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { MindBodyConnection } from "./components/MindBodyConnection";
import { BreathingExercises } from "./components/BreathingExercises";
import { AnonymousFeedback } from "./components/AnonymousFeedback";
import { StoryModule } from "./components/StoryModule";
import { MentalGym } from "./components/MentalGym";
import { SleepBetter } from "./components/SleepBetter";
import { QuickCheckIn } from "./components/QuickCheckIn";
import { AnalyticsHub } from "./components/AnalyticsHub";
import { AcademicStressReports } from "./components/AcademicStressReports";
import { EventScheduler } from "./components/EventScheduler";
import { SessionInterface } from "./components/SessionInterface";
import { SessionRequests } from "./components/SessionRequests";
import { ClientContext } from "./components/ClientContext";
import { TeenCommunication } from "./components/TeenCommunication";
import { MindfulnessWorkshop } from "./components/MindfulnessWorkshop";
import { ConnectToExpert } from "./components/ConnectToExpert";
import { WellnessRoutine } from "./components/WellnessRoutine";

type AppState =
  | "intro"
  | "roleSelection"
  | "auth"
  | "home"
  | "mindBody"
  | "breathing"
  | "anonymousFeedback"
  | "storyModule"
  | "mentalGym"
  | "sleepBetter"
  | "quickCheckIn"
  | "analyticsHub"
  | "academicStressReports"
  | "eventScheduler"
  | "sessionInterface"
  | "sessionRequests"
  | "clientContext"
  | "teenCommunication"
  | "mindfulnessWorkshop"
  | "connectToExpert"
  | "wellnessRoutine";
type UserRole =
  | "student"
  | "official"
  | "professional"
  | "parent"
  | null;

export default function App() {
  const [appState, setAppState] = useState<AppState>("intro");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState("home");

  const handleIntroComplete = () => {
    setAppState("roleSelection");
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setAppState("auth");
  };

  const handleAuthComplete = () => {
    setAppState("home");
  };

  const handleBackToRoleSelection = () => {
    setAppState("roleSelection");
    setUserRole(null);
  };

  const handleNavigateToMindBody = () => {
    setAppState("mindBody");
  };

  const handleNavigateToBreathing = () => {
    setAppState("breathing");
  };

  const handleNavigateToAnonymousFeedback = () => {
    setAppState("anonymousFeedback");
  };

  const handleNavigateToStory = () => {
    setAppState("storyModule");
  };

  const handleNavigateToMentalGym = () => {
    setAppState("mentalGym");
  };

  const handleNavigateToSleepBetter = () => {
    setAppState("sleepBetter");
  };

  const handleNavigateToQuickCheckIn = () => {
    setAppState("quickCheckIn");
  };

  const handleNavigateToAnalytics = () => {
    setAppState("analyticsHub");
  };

  const handleNavigateToAcademicStressReports = () => {
    setAppState("academicStressReports");
  };

  const handleNavigateToEventScheduler = () => {
    setAppState("eventScheduler");
  };

  const handleNavigateToSession = () => {
    setAppState("sessionInterface");
  };

  const handleNavigateToSessionRequests = () => {
    setAppState("sessionRequests");
  };

  const handleNavigateToClientContext = () => {
    setAppState("clientContext");
  };

  const handleNavigateToTeenCommunication = () => {
    setAppState("teenCommunication");
  };

  const handleNavigateToMindfulnessWorkshop = () => {
    setAppState("mindfulnessWorkshop");
  };

  const handleNavigateToConnectToExpert = () => {
    setAppState("connectToExpert");
  };

  const handleNavigateToWellnessRoutine = () => {
    setAppState("wellnessRoutine");
  };

  const handleScheduleSession = (requestId: string) => {
    // Handle session scheduling logic
    console.log("Scheduled session for request:", requestId);
    setAppState("home");
  };

  const handleBackToHome = () => {
    setAppState("home");
    setActiveTab("home"); // Also reset the active tab
  };

  const renderContent = () => {
    switch (appState) {
      case "intro":
      

      case "roleSelection":
        return (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        );

      case "auth":
        return userRole ? (
          <AuthScreen
            userRole={userRole}
            onAuthComplete={handleAuthComplete}
            onBack={handleBackToRoleSelection}
          />
        ) : null;

      case "mindBody":
        return (
          <MindBodyConnection
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "breathing":
        return (
          <BreathingExercises
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "anonymousFeedback":
        return (
          <AnonymousFeedback
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "storyModule":
        return (
          <StoryModule
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "mentalGym":
        return (
          <MentalGym
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "sleepBetter":
        return (
          <SleepBetter
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "quickCheckIn":
        return (
          <QuickCheckIn
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "analyticsHub":
        return (
          <AnalyticsHub
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "academicStressReports":
        return (
          <AcademicStressReports
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "eventScheduler":
        return (
          <EventScheduler
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "sessionInterface":
        return (
          <SessionInterface
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
            showClientContext={false}
          />
        );

      case "sessionRequests":
        return (
          <SessionRequests
            onBack={handleBackToHome}
            onScheduleSession={handleScheduleSession}
            onViewClientContext={handleNavigateToClientContext}
            currentLanguage={currentLanguage}
          />
        );

      case "clientContext":
        return (
          <ClientContext
            onBack={handleNavigateToSessionRequests}
            onContinue={handleNavigateToSession}
            currentLanguage={currentLanguage}
          />
        );

      case "teenCommunication":
        return (
          <TeenCommunication
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "mindfulnessWorkshop":
        return (
          <MindfulnessWorkshop
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "connectToExpert":
        return (
          <ConnectToExpert
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "wellnessRoutine":
        return (
          <WellnessRoutine
            onBack={handleBackToHome}
            currentLanguage={currentLanguage}
          />
        );

      case "home":
        return (
          <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 overflow-auto">
              {activeTab === "home" && (
                <>
                  {userRole === "student" && (
                    <StudentHome
                      currentLanguage={currentLanguage}
                      onLanguageChange={setCurrentLanguage}
                      onBackToRoleSelection={handleBackToRoleSelection}
                      onNavigateToMindBody={
                        handleNavigateToMindBody
                      }
                      onNavigateToBreathing={
                        handleNavigateToBreathing
                      }
                      onNavigateToAnonymousFeedback={
                        handleNavigateToAnonymousFeedback
                      }
                      onNavigateToStory={handleNavigateToStory}
                      onNavigateToMentalGym={
                        handleNavigateToMentalGym
                      }
                      onNavigateToSleepBetter={
                        handleNavigateToSleepBetter
                      }
                      onNavigateToQuickCheckIn={
                        handleNavigateToQuickCheckIn
                      }
                      onNavigateToMindfulnessWorkshop={
                        handleNavigateToMindfulnessWorkshop
                      }
                      onNavigateToConnectToExpert={
                        handleNavigateToConnectToExpert
                      }
                      onNavigateToWellnessRoutine={
                        handleNavigateToWellnessRoutine
                      }
                    />
                  )}
                  {userRole === "official" && (
                    <OfficialHome
                      currentLanguage={currentLanguage}
                      onLanguageChange={setCurrentLanguage}
                      onBackToRoleSelection={
                        handleBackToRoleSelection
                      }
                      onNavigateToAnalytics={
                        handleNavigateToAnalytics
                      }
                      onNavigateToEventScheduler={
                        handleNavigateToEventScheduler
                      }
                      onNavigateToAcademicStressReports={
                        handleNavigateToAcademicStressReports
                      }
                    />
                  )}
                  {userRole === "professional" && (
                    <ProfessionalHome
                      currentLanguage={currentLanguage}
                      onLanguageChange={setCurrentLanguage}
                      onBackToRoleSelection={
                        handleBackToRoleSelection
                      }
                      onStartSession={handleNavigateToSession}
                      onViewSessionRequests={
                        handleNavigateToSessionRequests
                      }
                    />
                  )}
                  {userRole === "parent" && (
                    <ParentHome
                      currentLanguage={currentLanguage}
                      onLanguageChange={setCurrentLanguage}
                      onBackToRoleSelection={
                        handleBackToRoleSelection
                      }
                      onNavigateToTeenCommunication={
                        handleNavigateToTeenCommunication
                      }
                    />
                  )}
                </>
              )}

              {activeTab === "progress" && (
                <ProgressDashboard
                  currentLanguage={currentLanguage}
                  onBack={handleBackToHome}
                />
              )}
            </div>

            {/* Only show BottomNavigation and ChatbotFAB for students */}
            {userRole === "student" && (
              <>
                {/* <BottomNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                /> */}
                // Example inside StudentHome (at the bottom of return)
<BottomNavigation
  currentTab="home"
  onTabChange={(tab) => {
    console.log("Tab changed to:", tab);
  }}
  onNavigateToWellnessRoutine={() => {
    console.log("Navigate to Wellness Routine!");
    handleNavigateToWellnessRoutine(); // calls the prop if provided
  }}
  />

 

                <ChatbotFAB />
              </>
            )}
          </div>
        );

      default:
        return <AvatarIntro onComplete={handleIntroComplete} />;
    }
  };

  return renderContent();
}