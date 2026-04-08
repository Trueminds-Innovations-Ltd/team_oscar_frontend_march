import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LMSContext from "../../../contexts/LMSContext";
import { CourseProvider, useCourses } from "../../../contexts/CourseContext";
import ProfileHeroCard from "../components/ProfileHeroCard";
import ProfileShell from "../components/ProfileShell";
import ProfileTabsCard from "../components/ProfileTabsCard";

const programTitles = {
  "ui-ux": "UI/UX Design",
  "frontend": "Frontend Development",
  "backend": "Backend Development",
  "data": "Data Analysis",
  "product": "Product Management",
  "cloud": "Cloud Engineering",
  "networking": "Networking",
  "security": "Cyber Security"
};

function ProfileContent() {
  const navigate = useNavigate();
  const { user } = useContext(LMSContext);
  const { enrolledCourses, studySessions, studySessionProgress } = useCourses();
  
  const completedSessions = useMemo(() => {
    return studySessions.filter(session => {
      const progress = studySessionProgress[session._id];
      return progress && progress.progress >= 100;
    }).map(session => {
      const progress = studySessionProgress[session._id];
      return {
        id: session._id,
        title: session.course?.title || session.subTopic || 'Study Session',
        academy: 'Talentflow Academy',
        completedOn: `Completed on ${progress?.completedAt ? new Date(progress.completedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`,
        grade: `${progress?.progress || 100}%`,
        theme: 'indigo'
      };
    });
  }, [studySessions, studySessionProgress]);

  const profileUser = useMemo(() => {
    const roleLabel = user?.role === 2 ? 'Tutor' : 'Student';
    return {
      fullName: user?.name || 'User',
      role: `${roleLabel}`,
      bio: user?.bio || 'Learning at TalentFlow Academy',
      socials: []
    };
  }, [user]);

  const personalInformation = useMemo(() => [
    { label: "Full name", value: user?.name || 'N/A' },
    { label: "Email", value: user?.email || 'N/A' },
    { label: "Phone", value: user?.phone || 'N/A' },
    { label: "Country", value: user?.country || 'N/A' },
    { label: "State", value: user?.state || 'N/A' },
    { label: "City", value: user?.city || 'N/A' },
  ], [user]);

  const learningPreferences = useMemo(() => {
    // Group user's subTopics by their program
    const userInterests = user?.interests || [];
    const userSubTopics = user?.subTopics || [];
    
    if (userInterests.length === 0 && userSubTopics.length === 0) {
      return [];
    }

    // Map sub-topics to their program
    const subTopicToProgram = {
      // UI/UX
      "Wireframing": "ui-ux", "Prototyping": "ui-ux", "User Research": "ui-ux", "Figma": "ui-ux", "Design Systems": "ui-ux",
      // Frontend
      "React": "frontend", "JavaScript": "frontend", "TypeScript": "frontend", "CSS": "frontend", "Vue.js": "frontend", "Next.js": "frontend",
      // Backend
      "Node.js": "backend", "Python": "backend", "Java": "backend", "Go": "backend", "Express.js": "backend", "Database Design": "backend",
      // Data
      "SQL": "data", "Excel": "data", "Data Visualization": "data", "Statistics": "data",
      // Product
      "Product Roadmaps": "product", "OKRs": "product", "User Interviews": "product", "Go-to-Market": "product", "Agile/Scrum": "product",
      // Cloud
      "AWS": "cloud", "Azure": "cloud", "Google Cloud": "cloud", "Docker": "cloud", "Kubernetes": "cloud", "DevOps": "cloud",
      // Networking
      "CCNA": "networking", "Network Security": "networking", "Routing & Switching": "networking", "Firewalls": "networking", "VoIP": "networking",
      // Security
      "Penetration Testing": "security", "Ethical Hacking": "security", "Security+": "security", "CISSP": "security",
    };

    // Group subTopics by program
    const grouped = {};
    
    userSubTopics.forEach(subTopic => {
      const programId = subTopicToProgram[subTopic] || 'other';
      if (!grouped[programId]) {
        grouped[programId] = [];
      }
      grouped[programId].push(subTopic);
    });

    // Convert to array format for display
    return Object.entries(grouped).map(([programId, subTopics]) => ({
      program: programTitles[programId] || programId,
      subTopics: subTopics,
      value: `${subTopics.length} topic${subTopics.length > 1 ? 's' : ''} enrolled`
    }));
  }, [user]);

  const profileSections = useMemo(() => ({
    personalInformation,
    learningPreferences,
    achievements: completedSessions
  }), [personalInformation, learningPreferences, completedSessions]);

  const showEditButton = true;
  const isTutor = user?.role === 2;

  return (
    <ProfileShell>
      <div className="space-y-6 lg:space-y-8">
        <ProfileHeroCard user={profileUser} />
        <ProfileTabsCard 
          sections={profileSections} 
          showEditButton={showEditButton}
          isTutor={isTutor}
        />
      </div>
    </ProfileShell>
  );
}

const ProfileOverviewPage = () => {
  return (
    <CourseProvider>
      <ProfileContent />
    </CourseProvider>
  );
};

export default ProfileOverviewPage;