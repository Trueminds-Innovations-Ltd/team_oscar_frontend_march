import { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AiSupportStep from "./AiSupportStep";
import BackgroundDecor from "./BackgroundDecor";
import CoursesStep from "./CoursesStep";
import ExperienceStep from "./ExperienceStep";
import InterestsStep from "./InterestsStep";
import OnboardingTopbar from "./OnboardingTopbar";
import StepProgress from "./StepProgress";
import ToastMessage from "./ToastMessage";
import WelcomeStep from "./WelcomeStep";
import LMSContext from "../../../contexts/LMSContext";

const totalSteps = 5;

// Map frontend interest IDs to backend values
const interestMap = {
  "ui-ux": "UI/UX",
  "frontend": "Frontend",
  "data": "Data Analysis",
  "product": "Product Management"
};

// Map frontend level to backend values
const levelMap = {
  "beginner": 1,
  "intermediate": 2,
  "advanced": 3
};

function OnboardingFlow() {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useContext(LMSContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [confetti, setConfetti] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!toast.show) return undefined;

    const timer = setTimeout(
      () => setToast((prev) => ({ ...prev, show: false })),
      3000,
    );
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleFinish = async () => {
    setLoading(true);
    
    try {
      // Convert frontend values to backend values
      const backendInterests = selectedInterests.map(id => interestMap[id] || id);
      const backendLevel = levelMap[selectedLevel] || 1;

      await completeOnboarding(backendInterests, backendLevel);

      const colors = [
        "#2563EB",
        "#10B981",
        "#F59E0B",
        "#7C3AED",
        "#EC4899",
        "#60A5FA",
      ];
      const particles = Array.from({ length: 60 }).map((_, index) => ({
        id: `confetti-${index}-${Date.now()}`,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 1.2 + Math.random() * 1.8,
        delay: Math.random() * 0.8,
        radius: Math.random() > 0.5 ? "50%" : "2px",
      }));

      setConfetti(particles);
      setTimeout(() => setConfetti([]), 3200);
      setToast({
        show: true,
        message: "Welcome to TalentFlow! Redirecting to your dashboard…",
      });

      setTimeout(() => navigate("/dashboard"), 1400);
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const activeStep = useMemo(
    () =>
      ({
        1: (
          <WelcomeStep
            onNext={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ),
        2: (
          <InterestsStep
            selectedInterests={selectedInterests}
            onToggleInterest={(interestId) =>
              setSelectedInterests((prev) =>
                prev.includes(interestId)
                  ? prev.filter((item) => item !== interestId)
                  : [...prev, interestId],
              )
            }
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        ),
        3: (
          <ExperienceStep
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        ),
        4: (
          <CoursesStep
            enrolledCourses={enrolledCourses}
            onToggleEnroll={(courseId) =>
              setEnrolledCourses((prev) => {
                const exists = prev.includes(courseId);
                const next = exists
                  ? prev.filter((item) => item !== courseId)
                  : [...prev, courseId];

                if (!exists) {
                  setToast({
                    show: true,
                    message: "Enrolled! Course added to your dashboard.",
                  });
                }

                return next;
              })
            }
            onBack={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
          />
        ),
        5: (
          <AiSupportStep
            onFinish={handleFinish}
            loading={loading}
          />
        ),
      })[currentStep],
    [currentStep, enrolledCourses, selectedInterests, selectedLevel, loading],
  );

  return (
    <div className="onboarding-page">
      <BackgroundDecor />

      <div className="app">
        <OnboardingTopbar onSkip={() => handleFinish()} />
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        <div className="card">
          <div className="step active">{activeStep}</div>
        </div>
      </div>

      <ToastMessage show={toast.show} message={toast.message} />

      {confetti.map((piece) => (
        <span
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}vw`,
            top: "-10px",
            background: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            borderRadius: piece.radius,
          }}
        />
      ))}
    </div>
  );
}

export default OnboardingFlow;
