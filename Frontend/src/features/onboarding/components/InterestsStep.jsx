import { FaCheck, FaChartSimple, FaCode, FaDesktop, FaUserGroup } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const interests = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    sub: "Wireframes, prototypes, user research, design systems.",
    icon: <FaDesktop />,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    sub: "React, TypeScript, CSS, and modern web tooling.",
    icon: <FaCode />,
    iconBg: "#F0FDF4",
    iconColor: "#10B981",
  },
  {
    id: "data",
    title: "Data Analysis",
    sub: "Python, SQL, dashboards, and data storytelling.",
    icon: <FaChartSimple />,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "product",
    title: "Product Management",
    sub: "Roadmaps, OKRs, user interviews, and go-to-market.",
    icon: <FaUserGroup />,
    iconBg: "#FDF2F8",
    iconColor: "#DB2777",
  },
];

function InterestsStep({ selectedInterests, onToggleInterest, onBack, onNext }) {
  return (
    <>
      <StepHeader
        eyebrow="Personalize"
        title="What do you want to"
        highlight="learn?"
        sub="Choose one or more topics. We'll tailor your course recommendations and AI suggestions to match."
      />

      <div className="interest-grid">
        {interests.map((interest) => {
          const selected = selectedInterests.includes(interest.id);

          return (
            <button
              key={interest.id}
              type="button"
              className={`interest-card ${selected ? "selected" : ""}`}
              onClick={() => onToggleInterest(interest.id)}
            >
              <div className="interest-check">{selected ? <FaCheck size={10} /> : null}</div>

              <div className="ic-icon" style={{ background: interest.iconBg, color: interest.iconColor }}>
                {interest.icon}
              </div>

              <div className="ic-title">{interest.title}</div>
              <div className="ic-sub">{interest.sub}</div>
            </button>
          );
        })}
      </div>

      <StepActions
        onBack={onBack}
        onNext={onNext}
        hint="Select all that apply · You can change this later"
      />
    </>
  );
}

export default InterestsStep;
