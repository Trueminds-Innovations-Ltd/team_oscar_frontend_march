import { useContext } from 'react';
import { FiMenu } from "react-icons/fi";
import CourseCard from "./CourseCard";
import CourseSection from "./CourseSection";
import CoursesControlBar from "./CoursesControlBar";
import LMSContext from '../../../contexts/LMSContext';
import { useCourses } from '../../../contexts/CourseContext';

function CoursesContent({ onOpenSidebar, isSidebarOpen, isTutor }) {
  const { token } = useContext(LMSContext);
  const { studySessions, studySessionProgress, openStudySessionModal } = useCourses();

  const now = new Date();
  
  const activeSessions = studySessions
    .filter(session => {
      const startDate = new Date(session.startDate);
      const progress = studySessionProgress[session._id]?.progress || 0;
      return startDate <= now && progress === 0;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  const upcomingSessions = studySessions
    .filter(session => {
      const startDate = new Date(session.startDate);
      const progress = studySessionProgress[session._id]?.progress || 0;
      return startDate > now && progress === 0;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const completedSessions = studySessions
    .filter(session => {
      const progress = studySessionProgress[session._id]?.progress || 0;
      return progress >= 100;
    })
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const inProgressSessions = studySessions
    .filter(session => {
      const progress = studySessionProgress[session._id]?.progress || 0;
      return progress > 0 && progress < 100;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const formatTimeLeft = (startDate) => {
    const start = new Date(startDate);
    const diff = start - now;
    
    if (diff <= 0) return 'In progress';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getProgress = (session) => {
    const progress = studySessionProgress[session._id];
    return progress?.progress || 0;
  };

  const getCompletion = (progress) => {
    return `${progress}% Complete`;
  };

  const getStudentCount = (session) => {
    return session.completedStudents || 0;
  };

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-265">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="mb-4 inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
          aria-expanded={isSidebarOpen}
          aria-controls="dashboard-sidebar"
        >
          <FiMenu size={18} />
        </button>

        <header className="mb-3">
          <h1 className="text-[34px] font-extrabold tracking-[-0.5px] text-[#181f33]">
            {isTutor ? 'My Study Sessions' : 'Study Sessions'}
          </h1>
          <p className="text-[13px] font-medium text-[#7b8191]">
            {isTutor ? 'Manage your created study sessions.' : 'Join live sessions with your tutors.'}
          </p>
        </header>

        <CoursesControlBar />

        <div className="space-y-4">
          <CourseSection title={isTutor ? "Active Sessions" : "Active Sessions"}>
            {activeSessions.length === 0 ? (
              <p className="text-gray-500 py-4">No active sessions</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {activeSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={session.course?.title || 'Study Session'}
                    completion={isTutor ? `${getStudentCount(session)} students completed` : getCompletion(getProgress(session))}
                    progress={isTutor ? 0 : getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel={isTutor ? "View Details" : getProgress(session) > 0 ? "Resume" : "Start"}
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={!isTutor ? () => openStudySessionModal(session) : null}
                  />
                ))}
              </div>
            )}
          </CourseSection>

          <CourseSection title={isTutor ? "Upcoming Sessions" : "Upcoming Sessions"} actionLabel="View all">
            {upcomingSessions.length === 0 ? (
              <p className="text-gray-500 py-4">No upcoming sessions</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {upcomingSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={session.course?.title || 'Study Session'}
                    completion={isTutor ? `${getStudentCount(session)} students completed` : getCompletion(getProgress(session))}
                    progress={isTutor ? 0 : getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel={isTutor ? "View Details" : "Start Course"}
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={!isTutor ? () => openStudySessionModal(session) : null}
                  />
                ))}
              </div>
            )}
          </CourseSection>

          {inProgressSessions.length > 0 && (
            <CourseSection title="In Progress">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {inProgressSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={session.course?.title || 'Study Session'}
                    completion={getCompletion(getProgress(session))}
                    progress={getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel="Resume"
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={!isTutor ? () => openStudySessionModal(session) : null}
                  />
                ))}
              </div>
            </CourseSection>
          )}

          {completedSessions.length > 0 && (
            <CourseSection title="Completed">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {completedSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={session.course?.title || 'Study Session'}
                    completion="Completed"
                    progress={100}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel="View"
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={!isTutor ? () => openStudySessionModal(session) : null}
                  />
                ))}
              </div>
            </CourseSection>
          )}
        </div>
      </div>
    </main>
  );
}

export default CoursesContent;