import { FaBookOpen, FaCheck, FaChartSimple, FaCode, FaRegClock, FaStar } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const courses = [
  {
    id: "course-1",
    title: "UX Fundamentals & Design Thinking",
    desc: "Master user research, wireframing, prototyping, and usability testing. Build a portfolio-ready project by the end.",
    tag: "UI/UX Design",
    tagColor: "#2563EB",
    icon: <FaBookOpen />,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    meta: ["14 hours", "32 lessons", "4.9"],
    featured: true,
  },
  {
    id: "course-2",
    title: "React & TypeScript — From Zero to Production",
    desc: "Build real-world apps with React 18, TypeScript, and modern state management. Ship a full-stack project.",
    tag: "Frontend Dev",
    tagColor: "#10B981",
    icon: <FaCode />,
    iconBg: "#F0FDF4",
    iconColor: "#10B981",
    meta: ["28 hours", "64 lessons", "4.8"],
  },
  {
    id: "course-3",
    title: "Data Analytics with Python & Pandas",
    desc: "From raw data to business insights — clean, analyse, visualise, and present findings with confidence.",
    tag: "Data Analysis",
    tagColor: "#D97706",
    icon: <FaChartSimple />,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    meta: ["20 hours", "48 lessons", "4.7"],
  },
];

function CoursesStep({ enrolledCourses, onToggleEnroll, onBack, onNext }) {
  return (
    <>
      <StepHeader
        eyebrow="Recommended for you"
        title="Your"
        highlight="curated starting point"
        sub="Based on your interests and experience, we picked these to get you moving fast. Enroll in one or all."
      />

      <div className="courses-grid">
        {courses.map((course) => {
          const enrolled = enrolledCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className={`course-card ${course.featured ? "featured" : ""} ${enrolled ? "enrolled" : ""}`}
              style={{ position: "relative" }}
            >
              {course.featured ? <div className="featured-badge">Best match</div> : null}

              <div className="course-thumb" style={{ background: course.iconBg, color: course.iconColor }}>
                {course.icon}
              </div>

              <div className="course-body">
                <div className="course-tag" style={{ color: course.tagColor }}>
                  {course.tag}
                </div>
                <div className="course-title">{course.title}</div>
                <div className="course-desc">{course.desc}</div>

                <div className="course-meta">
                  <div className="cmeta">
                    <FaRegClock />
                    {course.meta[0]}
                  </div>
                  <div className="cmeta">
                    <FaBookOpen />
                    {course.meta[1]}
                  </div>
                  <div className="cmeta">
                    <FaStar />
                    {course.meta[2]}
                  </div>
                </div>
              </div>

              <button type="button" className="course-enroll" onClick={() => onToggleEnroll(course.id)}>
                <FaCheck />
                {enrolled ? "Enrolled" : "Enroll"}
              </button>
            </div>
          );
        })}
      </div>

      <StepActions
        onBack={onBack}
        onNext={onNext}
        hint="You can explore more courses from your dashboard"
      />
    </>
  );
}

export default CoursesStep;
