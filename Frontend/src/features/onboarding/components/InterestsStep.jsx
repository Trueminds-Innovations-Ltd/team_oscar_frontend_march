import { FaCheck, FaChartSimple, FaCode, FaUserGroup, FaServer, FaCloud, FaNetworkWired, FaShieldHalved } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const interests = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    sub: "Wireframes, prototypes, user research, design systems.",
    icon: <FaCode />,
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
    id: "backend",
    title: "Backend Development",
    sub: "Node.js, Python, Java, databases, and APIs.",
    icon: <FaServer />,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
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
  {
    id: "cloud",
    title: "Cloud Engineering",
    sub: "AWS, Azure, Docker, Kubernetes, DevOps.",
    icon: <FaCloud />,
    iconBg: "#F0F9FF",
    iconColor: "#0EA5E9",
  },
  {
    id: "networking",
    title: "Networking",
    sub: "CCNA, network security, routing, firewalls.",
    icon: <FaNetworkWired />,
    iconBg: "#FEF2F2",
    iconColor: "#DC2626",
  },
  {
    id: "security",
    title: "Cyber Security",
    sub: "Penetration testing, ethical hacking, security+.",
    icon: <FaShieldHalved />,
    iconBg: "#ECFDF5",
    iconColor: "#059669",
  },
];

const subTopicsByInterest = {
  "ui-ux": [
    { id: "wireframing", title: "Wireframing", desc: "Learn to create wireframes and low-fidelity prototypes" },
    { id: "prototyping", title: "Prototyping", desc: "Build interactive prototypes with Figma, Sketch" },
    { id: "user-research", title: "User Research", desc: "Conduct interviews, surveys, and usability testing" },
    { id: "figma", title: "Figma", desc: "Master the industry-standard design tool" },
    { id: "design-systems", title: "Design Systems", desc: "Create scalable and consistent design components" },
  ],
  "frontend": [
    { id: "react", title: "React", desc: "Build modern UIs with React and hooks" },
    { id: "javascript", title: "JavaScript", desc: "Master the language of the web" },
    { id: "typescript", title: "TypeScript", desc: "Add type safety to your JavaScript" },
    { id: "css", title: "CSS & Styling", desc: "Create beautiful responsive layouts" },
    { id: "vue", title: "Vue.js", desc: "Learn the progressive JavaScript framework" },
    { id: "nextjs", title: "Next.js", desc: "Build full-stack apps with React" },
  ],
  "backend": [
    { id: "nodejs", title: "Node.js", desc: "Build server-side applications with Node.js" },
    { id: "python", title: "Python", desc: "Backend development with Python" },
    { id: "java", title: "Java", desc: "Enterprise Java development" },
    { id: "golang", title: "Go", desc: "Modern backend with Go" },
    { id: "express", title: "Express.js", desc: "Build APIs with Express" },
    { id: "database", title: "Database Design", desc: "Design and manage databases" },
  ],
  "data": [
    { id: "python", title: "Python", desc: "Data analysis with Python and Pandas" },
    { id: "sql", title: "SQL", desc: "Query and analyze relational databases" },
    { id: "excel", title: "Excel", desc: "Master spreadsheets and data visualization" },
    { id: "visualization", title: "Data Visualization", desc: "Create charts and dashboards with Tableau, Power BI" },
    { id: "statistics", title: "Statistics", desc: "Statistical analysis and hypothesis testing" },
  ],
  "product": [
    { id: "roadmaps", title: "Product Roadmaps", desc: "Plan and communicate product strategy" },
    { id: "okrs", title: "OKRs", desc: "Set and track objectives and key results" },
    { id: "user-interviews", title: "User Interviews", desc: "Conduct and analyze user interviews" },
    { id: "gtm", title: "Go-to-Market", desc: "Launch products successfully" },
    { id: "agile", title: "Agile/Scrum", desc: "Manage products with agile methodologies" },
  ],
  "cloud": [
    { id: "aws", title: "AWS", desc: "Amazon Web Services" },
    { id: "azure", title: "Azure", desc: "Microsoft Azure cloud" },
    { id: "gcp", title: "Google Cloud", desc: "Google Cloud Platform" },
    { id: "docker", title: "Docker", desc: "Containerization with Docker" },
    { id: "kubernetes", title: "Kubernetes", desc: "Container orchestration" },
    { id: "devops", title: "DevOps", desc: "DevOps practices and CI/CD" },
  ],
  "networking": [
    { id: "ccna", title: "CCNA", desc: "Cisco Certified Network Associate" },
    { id: "network-security", title: "Network Security", desc: "Secure network infrastructure" },
    { id: "routing", title: "Routing & Switching", desc: "Network routing protocols" },
    { id: "firewalls", title: "Firewalls", desc: "Configure and manage firewalls" },
    { id: "voip", title: "VoIP", desc: "Voice over IP technologies" },
  ],
  "security": [
    { id: "penetration", title: "Penetration Testing", desc: "Ethical penetration testing" },
    { id: "ethical-hacking", title: "Ethical Hacking", desc: "White hat hacking techniques" },
    { id: "network-security", title: "Network Security", desc: "Secure network infrastructure" },
    { id: "security-plus", title: "Security+", desc: "CompTIA Security+ certification" },
    { id: "cissp", title: "CISSP", desc: "Certified Information Systems Security Professional" },
  ],
};

function InterestsStep({ selectedInterests, onToggleInterest, onBack, onNext }) {
  const getSubTopicsForInterest = (interestId) => {
    return subTopicsByInterest[interestId] || [];
  };

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

      {selectedInterests.length > 0 && (
        <div className="mt-6">
          <StepHeader
            eyebrow="Select Technologies"
            title="What specific topics within"
            highlight="these areas?"
            sub="Choose all that apply to customize your learning path."
          />
          
          <div className="flex flex-wrap gap-3 mt-4">
            {selectedInterests.map((interestId) => {
              const interest = interests.find(i => i.id === interestId);
              const subTopics = getSubTopicsForInterest(interestId);
              
              if (!interest) return null;
              
              return (
                <div key={interestId} className="w-full">
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <span style={{ color: interest.iconColor }}>{interest.icon}</span>
                    {interest.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subTopics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedInterests.includes(topic.id)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        onClick={() => onToggleInterest(topic.id)}
                      >
                        {selectedInterests.includes(topic.id) && <FaCheck className="inline mr-1" size={12} />}
                        {topic.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <StepActions
        onBack={onBack}
        onNext={onNext}
        hint="Select all that apply · You can change this later"
      />
    </>
  );
}

export default InterestsStep;