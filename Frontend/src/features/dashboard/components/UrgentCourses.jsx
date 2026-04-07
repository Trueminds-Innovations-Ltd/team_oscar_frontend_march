import { useCourses } from '../../../contexts/CourseContext';
import { formatCourseCountdown, isCourseAvailable } from '../../../shared/utils/dateUtils';
import { useContext } from 'react';
import LMSContext from '../../../contexts/LMSContext';

function UrgentCourses() {
  const { studySessions, loadStudySessions } = useCourses();
  const { user } = useContext(LMSContext);

  const studentInterests = user?.interests || [];
  const studentSubTopics = user?.subTopics || [];

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
    const now = new Date();
    const diff = date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `In ${days} days`;
    return formatDate(dateString);
  };

  return (
    <section className="h-full w-full rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">Study Sessions</p>
        {studySessions.length > 3 && (
          <button className="text-sm text-blue-900 font-medium">
            View all {studySessions.length} →
          </button>
        )}
      </div>

      <section className="flex flex-col">
        {studySessions.length === 0 && (
          <p className="text-gray-500 text-sm py-4">No upcoming study sessions</p>
        )}

        {studySessions.slice(0, 3).map((session) => {
          const isUpcoming = new Date(session.startDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          
          return (
            <div 
              key={session._id}
              className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors -mx-4 px-4"
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
                <p className="text-xs font-medium text-blue-900 whitespace-nowrap">
                  {formatStartDate(session.startDate)}
                </p>
              </div>

              <button 
                className="flex-shrink-0 px-3 py-1.5 bg-blue-900 text-white text-xs rounded-lg hover:bg-blue-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Join
              </button>
            </div>
          );
        })}
      </section>

      {studySessions.some(s => new Date(s.startDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) && (
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
