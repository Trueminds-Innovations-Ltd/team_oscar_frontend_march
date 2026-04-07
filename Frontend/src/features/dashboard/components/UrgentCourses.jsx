import { useCourses } from '../../../contexts/CourseContext';
import { formatCourseCountdown, isCourseAvailable } from '../../../shared/utils/dateUtils';
import { useContext } from 'react';
import LMSContext from '../../../contexts/LMSContext';

function UrgentCourses() {
  const { studySessions, studySessionProgress, openStudySessionModal } = useCourses();
  const { user } = useContext(LMSContext);

  const now = new Date();
  
  const unopenedSessions = studySessions
    .filter(session => {
      const progress = studySessionProgress[session._id]?.progress || 0;
      return progress === 0;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  const activeUnopened = unopenedSessions.filter(s => new Date(s.startDate) <= now);
  const upcomingUnopened = unopenedSessions.filter(s => new Date(s.startDate) > now);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    const diff = date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diff <= 0) return 'Started';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `In ${days} days`;
    return formatDate(dateString);
  };

  return (
    <section className="h-full w-full rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">Study Sessions</p>
        {unopenedSessions.length > 3 && (
          <button className="text-sm text-blue-900 font-medium">
            View all {unopenedSessions.length} →
          </button>
        )}
      </div>

      <section className="flex flex-col">
        {unopenedSessions.length === 0 && (
          <p className="text-gray-500 text-sm py-4">No upcoming study sessions</p>
        )}

        {unopenedSessions.slice(0, 3).map((session) => {
          const isActive = new Date(session.startDate) <= now;
          
          return (
            <div 
              key={session._id}
              className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors -mx-4 px-4 cursor-pointer"
              onClick={() => openStudySessionModal(session)}
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-blue-900 flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {session.course?.title || 'Study Session'}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {session.subTopic} • {session.tutor?.name || 'Tutor'}
                </p>
              </div>

              <div className="flex-shrink-0">
                <p className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-green-600' : 'text-blue-900'}`}>
                  {formatStartDate(session.startDate)}
                </p>
              </div>

              <button 
                className="flex-shrink-0 px-3 py-1.5 bg-blue-900 text-white text-xs rounded-lg hover:bg-blue-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  openStudySessionModal(session);
                }}
              >
                {isActive ? 'Join' : 'Start'}
              </button>
            </div>
          );
        })}
      </section>

      {unopenedSessions.some(s => new Date(s.startDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 font-medium">
            New sessions available this week!
          </p>
        </div>
      )}
    </section>
  );
}

export default UrgentCourses;
