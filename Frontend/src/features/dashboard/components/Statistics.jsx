import { useCourses } from '../../../contexts/CourseContext';
import { formatTimeAgo } from '../../../shared/utils/dateUtils';

const programTitles = {
  "UI/UX": "UI/UX Design",
  "Frontend": "Frontend Development",
  "Modern React Development": "Frontend Development",
  "Backend": "Backend Development",
  "Data Analysis": "Data Analysis",
  "Product Management": "Product Management",
  "Cloud Engineering": "Cloud Engineering",
  "Networking": "Networking",
  "Cyber Security": "Cyber Security"
};

function getProgramTitle(title) {
  if (!title) return 'Study Session';
  return programTitles[title] || title;
}

function Statistics() {
  const { inProgressCourses, studySessions, studySessionProgress } = useCourses();

  const incompleteCourses = inProgressCourses.filter(c => c.progress < 100);
  
  const incompleteSessions = studySessions
    .filter(session => {
      const progress = studySessionProgress[session._id];
      return progress && progress.progress > 0 && progress.progress < 100;
    })
    .sort((a, b) => {
      const progressA = studySessionProgress[a._id]?.lastPosition || 0;
      const progressB = studySessionProgress[b._id]?.lastPosition || 0;
      return progressB - progressA;
    });

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-800';
    if (progress >= 61) return 'bg-green-400';
    if (progress >= 31) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progress) => {
    if (progress >= 100) return 'text-green-800';
    if (progress >= 61) return 'text-green-600';
    if (progress >= 31) return 'text-yellow-600';
    return 'text-red-600';
  };

  const hasInProgress = incompleteCourses.length > 0 || incompleteSessions.length > 0;

  return (
    <section className="w-full rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">In Progress</p>
        <button className="text-sm text-blue-900 font-medium">View All</button>
      </div>

      <section className="flex flex-col">
        {!hasInProgress ? (
          <p className="text-gray-500 text-sm py-4">No courses or study sessions in progress</p>
        ) : (
          <>
            {incompleteSessions.map((session) => {
              const progress = studySessionProgress[session._id];
              return (
                <div 
                  key={session._id}
                  className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200"
                >
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-blue-900 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs">SS</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {getProgramTitle(session.course?.title)}
                    </p>
                    <p className="truncate text-xs text-gray-500">{session.subTopic}</p>
                    
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${getProgressColor(progress?.progress || 0)}`}
                          style={{ width: `${progress?.progress || 0}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs font-medium ${getProgressTextColor(progress?.progress || 0)}`}>
                        {progress?.progress || 0}% complete
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500">
                      {progress?.updatedAt ? formatTimeAgo(progress.updatedAt) : 'Not started'}
                    </p>
                  </div>
                </div>
              );
            })}
            {incompleteCourses.map((course) => (
              <div 
                key={course._id}
                className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200"
              >
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black flex-shrink-0"></div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {course.title}
                  </p>
                  <p className="truncate text-xs text-gray-500">{course.category}</p>
                  
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs font-medium ${getProgressTextColor(course.progress)}`}>
                      {course.progress}% complete
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-500">
                    {course.lastVisited ? formatTimeAgo(course.lastVisited) : 'Not started'}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {(incompleteCourses.length >= 3 || incompleteSessions.length >= 3) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-700 font-medium">
            Complete at least one course to unlock new ones
          </p>
        </div>
      )}
    </section>
  );
}

export default Statistics;
