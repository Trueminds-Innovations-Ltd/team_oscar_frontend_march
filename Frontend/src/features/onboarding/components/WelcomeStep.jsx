import { FaBookOpen, FaLaptopCode, FaUsers } from "react-icons/fa";
import { HiMiniSignal } from "react-icons/hi2";
import { MdOutlineInsertPhoto } from "react-icons/md";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const features = [
  {
    id: "curated",
    icon: <FaBookOpen />,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Curated courses",
    sub: "Industry-aligned content built with experts and updated regularly.",
  },
  {
    id: "collaboration",
    icon: <FaUsers />,
    iconBg: "#F0FDF4",
    iconColor: "#10B981",
    title: "Team collaboration",
    sub: "Work alongside peers and get feedback from your cohort.",
  },
  {
    id: "tutors",
    icon: <FaLaptopCode />,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    title: "AI + human tutors",
    sub: "Get answers instantly from AI, or escalate to a real tutor.",
  },
];

function WelcomeStep({ onNext }) {
  return (
    <>
      <StepHeader
        eyebrow="Getting started"
        title="Welcome to"
        highlight="TalentFlow 👋"
        sub="Let's take 60 seconds to personalize your learning experience. We'll get you set up and ready to grow."
      />

      <div className="welcome-body">
        <div className="welcome-features">
          {features.map((feature) => (
            <div key={feature.id} className="feature-row">
              <div className="feature-icon" style={{ background: feature.iconBg, color: feature.iconColor }}>
                {feature.icon}
              </div>

              <div>
                <div className="ft-title">{feature.title}</div>
                <div className="ft-sub">{feature.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="welcome-visual">
          <div className="wv-card">
            <div className="wv-thumb">
              <MdOutlineInsertPhoto size={28} />
            </div>
            <div className="wv-title">UX Fundamentals</div>
            <div className="wv-sub">Module 3 of 8 · In progress</div>
            <div className="wv-bar">
              <div className="wv-fill" />
            </div>
          </div>

          <div className="wv-badge">
            <div className="badge-dot" />3 online now
          </div>

          <div className="wv-badge-2">
            <HiMiniSignal /> 68% complete
          </div>
        </div>
      </div>

      <StepActions
        showBack={false}
        onNext={onNext}
        nextLabel="Get started"
        hint="Takes less than 60 seconds · No credit card required"
      />
    </>
  );
}

export default WelcomeStep;
