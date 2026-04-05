import { FaBolt, FaClock, FaStar } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    sub: "I'm new to this area and want to build foundational skills from scratch.",
    icon: <FaClock />,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    bars: ["#60A5FA", "", ""],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    sub: "I know the basics and want to deepen my skills and work on real projects.",
    icon: <FaBolt />,
    iconBg: "#F0FDF4",
    iconColor: "#10B981",
    bars: ["#10B981", "#10B981", ""],
  },
  {
    id: "advanced",
    title: "Advanced",
    sub: "I'm experienced and looking for challenging, expert-level content and peer challenges.",
    icon: <FaStar />,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    bars: ["#7C3AED", "#7C3AED", "#7C3AED"],
  },
];

function ExperienceStep({ selectedLevel, onSelectLevel, onBack, onNext }) {
  return (
    <>
      <StepHeader
        eyebrow="Calibrate"
        title="What's your"
        highlight="experience level?"
        sub="This helps us pitch content at the right level and connect you with the right cohort."
      />

      <div className="level-list">
        {levels.map((level) => {
          const selected = selectedLevel === level.id;

          return (
            <button
              key={level.id}
              type="button"
              className={`level-card ${selected ? "selected" : ""}`}
              onClick={() => onSelectLevel(level.id)}
            >
              <div className="level-icon" style={{ background: level.iconBg, color: level.iconColor }}>
                {level.icon}
              </div>

              <div className="level-body">
                <div className="level-title">{level.title}</div>
                <div className="level-sub">{level.sub}</div>
              </div>

              <div className="level-bars">
                {level.bars.map((color, index) => (
                  <div
                    key={`${level.id}-bar-${index + 1}`}
                    className="level-bar"
                    style={{
                      height: `${10 + index * 6}px`,
                      background: color || undefined,
                    }}
                  />
                ))}
              </div>

              <div className="level-radio" />
            </button>
          );
        })}
      </div>

      <StepActions onBack={onBack} onNext={onNext} />
    </>
  );
}

export default ExperienceStep;
