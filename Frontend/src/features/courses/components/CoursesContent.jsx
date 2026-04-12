import { useContext } from "react";
import dayjs from "dayjs";
import { FiMenu } from "react-icons/fi";
import CourseCard from "./CourseCard";
import CourseSection from "./CourseSection";
import CoursesControlBar from "./CoursesControlBar";
import LMSContext from "../../../contexts/LMSContext";
import { useCourses } from "../../../contexts/CourseContext";
import { formatTimeAgo } from "../../../shared/utils/dateUtils";

const programTitles = {
  "UI/UX": "UI/UX Design",
  Frontend: "Frontend Development",
  "Modern React Development": "Frontend Development",
  Backend: "Backend Development",
  "Data Analysis": "Data Analysis",
  "Product Management": "Product Management",
  "Cloud Engineering": "Cloud Engineering",
  Networking: "Networking",
  "Cyber Security": "Cyber Security",
};

function getProgramTitle(title) {
  if (!title) return "Study Session";
  return programTitles[title] || title;
}

function CoursesContent({ isTutor }) {
  const { token } = useContext(LMSContext);
  const { studySessions, studySessionProgress, studySessionsLoading, openStudySessionModal } =
    useCourses();

  const now = dayjs();

  const activeSessions = studySessions
    .filter((session) => {
      const startDate = new Date(session.startDate);
      const progress = studySessionProgress[session._id]?.progress || 0;
      return startDate <= now && progress === 0;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const upcomingSessions = studySessions
    .filter((session) => {
      const startDate = new Date(session.startDate);
      return startDate > now;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const completedSessions = studySessions
    .filter((session) => {
      const progress = studySessionProgress[session._id]?.progress || 0;
      return progress >= 100;
    })
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const inProgressSessions = studySessions
    .filter((session) => {
      const progress = studySessionProgress[session._id]?.progress || 0;
      return progress > 0 && progress < 100;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const formatTimeLeft = (startDate) => {
    const start = dayjs(startDate);
    const nowLocal = dayjs();
    const diffMs = start.diff(nowLocal);

    if (diffMs <= 0) return "In progress";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    if (minutes > 0) return `${minutes}m left`;
    return "Starting soon";
  };

  const getProgress = (session) => {
    const progress = studySessionProgress[session._id];
    const validProgress = typeof progress?.progress === 'number' && !isNaN(progress.progress) ? progress.progress : 0;
    return Math.min(100, Math.max(0, validProgress));
  };

  const getCompletion = (progress) => {
    return `${progress}% Complete`;
  };

  const getStudentCount = (session) => {
    return session.completedStudents || 0;
  };

  const getLastVisited = (session) => {
    const progress = studySessionProgress[session._id];
    if (!progress || typeof progress !== 'object') return null;
    return progress.updatedAt || progress.createdAt;
  };

  const isUpcoming = (session) => {
    const startDate = new Date(session.startDate);
    return startDate > now;
  };

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-265">
        <header className="mb-3">
          <h1 className="text-[34px] font-extrabold tracking-[-0.5px] text-[#181f33]">
            {isTutor ? "My Study Sessions" : "Study Sessions"}
          </h1>
          <p className="text-[13px] font-medium text-[#7b8191]">
            {isTutor
              ? "Manage your created study sessions."
              : "Join live sessions with your tutors."}
          </p>
        </header>

        <CoursesControlBar />

        {studySessionsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
              <span>Loading study sessions...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
          <CourseSection
            title={isTutor ? "Active Sessions" : "Active Sessions"}
          >
            {activeSessions.length === 0 ? (
              <p className="text-gray-500 py-4">No active sessions</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {activeSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={getProgramTitle(session.course?.title)}
                    completion={
                      isTutor
                        ? `${getStudentCount(session)} students completed`
                        : getCompletion(getProgress(session))
                    }
                    progress={isTutor ? 0 : getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel={
                      isTutor
                        ? "View Details"
                        : getProgress(session) > 0
                          ? "Resume"
                          : "Start"
                    }
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={
                      !isTutor ? () => openStudySessionModal(session) : null
                    }
                    lastVisited={getLastVisited(session)}
                  />
                ))}
              </div>
            )}
          </CourseSection>

          <CourseSection
            title={isTutor ? "Upcoming Sessions" : "Upcoming Sessions"}
            actionLabel="View all"
          >
            {upcomingSessions.length === 0 ? (
              <p className="text-gray-500 py-4">No upcoming sessions</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {upcomingSessions.map((session) => (
                  <CourseCard
                    key={session._id}
                    title={getProgramTitle(session.course?.title)}
                    completion={
                      isTutor
                        ? `${getStudentCount(session)} students completed`
                        : getCompletion(getProgress(session))
                    }
                    progress={isTutor ? 0 : getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel={isTutor ? "View Details" : "Starts Soon"}
                    disabled={!isTutor && isUpcoming(session)}
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={
                      !isTutor && !isUpcoming(session) ? () => openStudySessionModal(session) : null
                    }
                    lastVisited={getLastVisited(session)}
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
                    title={getProgramTitle(session.course?.title)}
                    completion={getCompletion(getProgress(session))}
                    progress={getProgress(session)}
                    timeLeft={formatTimeLeft(session.startDate)}
                    actionLabel="Resume Study"
                    subTopic={session.subTopic}
                    tutorName={isTutor ? null : session.tutor?.name}
                    isTutor={isTutor}
                    fileUrl={session.fileUrl}
                    linkUrl={session.linkUrl}
                    sessionId={session._id}
                    onCardClick={
                      !isTutor ? () => openStudySessionModal(session) : null
                    }
                    lastVisited={getLastVisited(session)}
                    showButton={true}
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
                    title={getProgramTitle(session.course?.title)}
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
                    onCardClick={
                      !isTutor ? () => openStudySessionModal(session) : null
                    }
                    lastVisited={getLastVisited(session)}
                  />
                ))}
              </div>
            </CourseSection>
          )}
        </div>
        )}
      </div>
    </main>
  );
}

export default CoursesContent;
