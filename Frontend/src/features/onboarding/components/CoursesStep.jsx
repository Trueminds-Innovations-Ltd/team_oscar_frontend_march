import { FaCheck, FaBookOpen, FaRocket } from "react-icons/fa6";
import StepActions from "./StepActions";
import StepHeader from "./StepHeader";

const mainInterests = [
  { id: "ui-ux", title: "UI/UX Design", color: "#2563EB", bg: "#EFF6FF" },
  { id: "frontend", title: "Frontend Development", color: "#10B981", bg: "#F0FDF4" },
  { id: "data", title: "Data Analysis", color: "#D97706", bg: "#FEF3C7" },
  { id: "product", title: "Product Management", color: "#DB2777", bg: "#FDF2F8" },
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
};

function CoursesStep({ selectedInterests, onToggleEnroll, onBack, onNext }) {
  const selectedMainInterests = mainInterests.filter(m => selectedInterests.includes(m.id));
  const selectedSubTopics = selectedInterests.filter(id => 
    Object.values(subTopicsByInterest).flat().some(t => t.id === id)
  );

  return (
    <>
      <StepHeader
        eyebrow="Your Learning Path"
        title="Topics you want to"
        highlight="master"
        sub="Based on your interests, here are the technologies and skills you'll learn. Select all you want to explore."
      />

      <div className="courses-grid">
        {selectedMainInterests.map((interest) => {
          const subTopics = subTopicsByInterest[interest.id] || [];
          const selectedCount = subTopics.filter(t => selectedInterests.includes(t.id)).length;
          const isInterestFullySelected = subTopics.length > 0 && selectedCount === subTopics.length;

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
                </div>
                
                <div className="mt-4 space-y-2">
                  {subTopics.map((topic) => {
                    const isSelected = selectedInterests.includes(topic.id);
                    
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                        onClick={() => onToggleEnroll(topic.id)}
                      >
                        <span className="text-lg">{topic.icon}</span>
                        <span className={`flex-1 text-left text-sm font-medium ${
                          isSelected ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {topic.title}
                        </span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <FaCheck size={12} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                type="button" 
                className="course-enroll"
                onClick={() => {
                  const allSelected = subTopics.every(t => selectedInterests.includes(t.id));
                  subTopics.forEach(topic => {
                    if (allSelected) {
                      onToggleEnroll(topic.id);
                    } else if (!selectedInterests.includes(topic.id)) {
                      onToggleEnroll(topic.id);
                    }
                  });
                }}
              >
                <FaCheck />
                {isInterestFullySelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Selected: {selectedSubTopics.length} topics</strong>
          <br />
          <span className="text-blue-600">
            When tutors create courses matching these topics, they'll appear in your dashboard!
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
