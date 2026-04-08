import { FaCheck, FaRocket } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";
import { useContext } from "react";
import LMSContext from "../../../contexts/LMSContext";

const mainInterests = [
  { id: "ui-ux", title: "UI/UX Design", color: "#2563EB", bg: "#EFF6FF" },
  { id: "frontend", title: "Frontend Development", color: "#10B981", bg: "#F0FDF4" },
  { id: "backend", title: "Backend Development", color: "#7C3AED", bg: "#F5F3FF" },
  { id: "data", title: "Data Analysis", color: "#D97706", bg: "#FEF3C7" },
  { id: "product", title: "Product Management", color: "#DB2777", bg: "#FDF2F8" },
  { id: "cloud", title: "Cloud Engineering", color: "#0EA5E9", bg: "#F0F9FF" },
  { id: "networking", title: "Networking", color: "#DC2626", bg: "#FEF2F2" },
  { id: "security", title: "Cyber Security", color: "#059669", bg: "#ECFDF5" },
];

const subTopicsByInterest = {
  "ui-ux": [
    { id: "wireframing", title: "Wireframing", icon: "📐" },
    { id: "prototyping", title: "Prototyping", icon: "🎨" },
    { id: "user-research", title: "User Research", icon: "👥" },
    { id: "figma", title: "Figma", icon: "✏️" },
    { id: "design-systems", title: "Design Systems", icon: "🧩" },
  ],
  "frontend": [
    { id: "react", title: "React", icon: "⚛️" },
    { id: "javascript", title: "JavaScript", icon: "📜" },
    { id: "typescript", title: "TypeScript", icon: "📘" },
    { id: "css", title: "CSS & Styling", icon: "🎨" },
    { id: "vue", title: "Vue.js", icon: "💚" },
    { id: "nextjs", title: "Next.js", icon: "▲" },
  ],
  "backend": [
    { id: "nodejs", title: "Node.js", icon: "🟢" },
    { id: "python", title: "Python", icon: "🐍" },
    { id: "java", title: "Java", icon: "☕" },
    { id: "golang", title: "Go", icon: "🔵" },
    { id: "express", title: "Express.js", icon: "🚀" },
    { id: "database", title: "Database Design", icon: "🗄️" },
  ],
  "data": [
    { id: "python", title: "Python", icon: "🐍" },
    { id: "sql", title: "SQL", icon: "🗄️" },
    { id: "excel", title: "Excel", icon: "📊" },
    { id: "visualization", title: "Data Visualization", icon: "📈" },
    { id: "statistics", title: "Statistics", icon: "📉" },
  ],
  "product": [
    { id: "roadmaps", title: "Product Roadmaps", icon: "🗺️" },
    { id: "okrs", title: "OKRs", icon: "🎯" },
    { id: "user-interviews", title: "User Interviews", icon: "💬" },
    { id: "gtm", title: "Go-to-Market", icon: "🚀" },
    { id: "agile", title: "Agile/Scrum", icon: "🔄" },
  ],
  "cloud": [
    { id: "aws", title: "AWS", icon: "☁️" },
    { id: "azure", title: "Azure", icon: "🌐" },
    { id: "gcp", title: "Google Cloud", icon: "🌍" },
    { id: "docker", title: "Docker", icon: "🐳" },
    { id: "kubernetes", title: "Kubernetes", icon: "☸️" },
    { id: "devops", title: "DevOps", icon: "⚙️" },
  ],
  "networking": [
    { id: "ccna", title: "CCNA", icon: "🔗" },
    { id: "network-security", title: "Network Security", icon: "🔒" },
    { id: "routing", title: "Routing & Switching", icon: "➡️" },
    { id: "firewalls", title: "Firewalls", icon: "🧱" },
    { id: "voip", title: "VoIP", icon: "📞" },
  ],
  "security": [
    { id: "penetration", title: "Penetration Testing", icon: "🎯" },
    { id: "ethical-hacking", title: "Ethical Hacking", icon: "🕵️" },
    { id: "network-security", title: "Network Security", icon: "🔐" },
    { id: "security-plus", title: "Security+", icon: "🛡️" },
    { id: "cissp", title: "CISSP", icon: "📜" },
  ],
};

function CoursesStep({ selectedInterests, onToggleEnroll, onBack, onNext }) {
  const { user } = useContext(LMSContext);
  
  const enrolledSubTopics = user?.subTopics || [];
  
  // Get sub-topics selected in this session (by IDs)
  const sessionSelectedSubTopicIds = selectedInterests.filter(id => 
    Object.values(subTopicsByInterest).flat().some(t => t.id === id)
  );
  
  // Map IDs to titles for comparison
  const allSubTopicTitles = Object.values(subTopicsByInterest).flat();
  const sessionSelectedTitles = sessionSelectedSubTopicIds
    .map(id => allSubTopicTitles.find(t => t.id === id)?.title)
    .filter(Boolean);
  
  // All enrolled titles (from user profile + current session)
  const allEnrolledTitles = [...new Set([...enrolledSubTopics, ...sessionSelectedTitles])];
  
  // Check if returning user (has existing enrollments)
  const isReturningUser = enrolledSubTopics.length > 0;
  
  // Show ALL programs for returning users, only selected for new users
  const programsToShow = isReturningUser 
    ? mainInterests 
    : mainInterests.filter(m => selectedInterests.includes(m.id));

  const isSubTopicEnrolled = (subTopicTitle) => {
    return allEnrolledTitles.includes(subTopicTitle);
  };

  const isProgramFullyEnrolled = (programId) => {
    const subTopics = subTopicsByInterest[programId] || [];
    if (subTopics.length === 0) return false;
    return subTopics.every(t => isSubTopicEnrolled(t.title));
  };

  const handleToggleProgram = (programId) => {
    const subTopics = subTopicsByInterest[programId] || [];
    const allSelected = subTopics.every(t => sessionSelectedSubTopicIds.includes(t.id));
    
    subTopics.forEach(topic => {
      const isEnrolled = enrolledSubTopics.includes(topic.title);
      if (!isEnrolled) {
        if (allSelected) {
          // Deselect all
        } else {
          if (!selectedInterests.includes(topic.id)) {
            onToggleEnroll(topic.id);
          }
        }
      }
    });
  };

  return (
    <>
      <StepHeader
        eyebrow="Your Learning Path"
        title="Topics you want to"
        highlight="master"
        sub={isReturningUser 
          ? "Add more programs to your learning path. Already enrolled topics are marked."
          : "Based on your interests, here are the technologies and skills you'll learn. Select all you want to explore."
        }
      />

      {programsToShow.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No topics selected yet.</p>
          <p className="text-sm mt-2">Go back to select your learning areas first.</p>
        </div>
      ) : (
        <div className="courses-grid">
          {programsToShow.map((interest) => {
            const subTopics = subTopicsByInterest[interest.id] || [];
            const isFullyEnrolled = isProgramFullyEnrolled(interest.id);
            const selectedCount = subTopics.filter(t => sessionSelectedSubTopicIds.includes(t.id)).length;

            return (
              <div key={interest.id} className="course-card">
                <div 
                  className="course-thumb" 
                  style={{ background: interest.bg, color: interest.color }}
                >
                  <FaRocket />
                </div>

                <div className="course-body">
                  <div className="course-tag" style={{ color: interest.color }}>
                    {interest.title}
                    {isFullyEnrolled && <span className="ml-2 text-xs">(Enrolled)</span>}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {subTopics.map((topic) => {
                      const isSelected = sessionSelectedSubTopicIds.includes(topic.id);
                      const isAlreadyEnrolled = enrolledSubTopics.includes(topic.title);
                      
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          disabled={isAlreadyEnrolled}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isAlreadyEnrolled 
                              ? 'border-green-500 bg-green-50 cursor-not-allowed opacity-75'
                              : isSelected 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                          onClick={() => !isAlreadyEnrolled && onToggleEnroll(topic.id)}
                        >
                          <span className="text-lg">{topic.icon}</span>
                          <span className={`flex-1 text-left text-sm font-medium ${
                            isAlreadyEnrolled ? 'text-green-700' : isSelected ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {topic.title}
                            {isAlreadyEnrolled && ' ✓ Enrolled'}
                          </span>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isAlreadyEnrolled
                              ? 'bg-green-500 border-green-500 text-white'
                              : isSelected 
                                ? 'bg-blue-500 border-blue-500 text-white' 
                                : 'border-gray-300'
                          }`}>
                            {(isAlreadyEnrolled || isSelected) && <FaCheck size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!isFullyEnrolled && subTopics.length > 0 && (
                  <button 
                    type="button" 
                    className="course-enroll"
                    onClick={() => handleToggleProgram(interest.id)}
                  >
                    <FaCheck />
                    {selectedCount === subTopics.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Selected: {sessionSelectedSubTopicIds.length} new topics</strong>
          <br />
          <span className="text-blue-600">
            {isReturningUser 
              ? "Already enrolled topics are marked. Select new topics to expand your learning!"
              : "When tutors create courses matching these topics, they'll appear in your dashboard!"
            }
          </span>
        </p>
      </div>

      <StepActions
        onBack={onBack}
        onNext={onNext}
        hint="You can update your preferences anytime from settings"
      />
    </>
  );
}

export default CoursesStep;