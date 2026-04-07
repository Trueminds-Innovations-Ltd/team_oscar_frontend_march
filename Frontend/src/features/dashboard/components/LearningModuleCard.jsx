import { BsFillPlayFill } from 'react-icons/bs'
import { useCourses } from '../../../contexts/CourseContext';
import { formatTimeAgo } from '../../../shared/utils/dateUtils';

function LearningModuleCard() {
  const { activeCourse, openReadingModal } = useCourses();

  if (!activeCourse) {
    return (
      <section className="w-full rounded-lg border border-gray-300 p-4 flex flex-col gap-4 lg:flex-row">
        <section className="h-[180px] w-full rounded-lg bg-gray-200 sm:h-[220px] lg:h-[200px] lg:max-w-[500px] flex items-center justify-center">
          <p className="text-gray-400">No active course</p>
        </section>

        <section className="w-full leading-7 sm:leading-8 min-w-0 flex flex-col justify-center">
          <p className="text-md font-bold text-stone-400 uppercase">
            Start Learning
          </p>

          <p className="font-medium break-words text-gray-500">
            Select a course from Urgent Courses to begin
          </p>
        </section>
      </section>
    );
  }

  const handleResume = () => {
    openReadingModal(activeCourse);
  };

  return (
    <section className="w-full rounded-lg border border-gray-300 p-4 flex flex-col gap-4 lg:flex-row">
      <section className="h-[180px] w-full rounded-lg bg-black sm:h-[220px] lg:h-[200px] lg:max-w-[500px] flex items-center justify-center">
        <p className="text-white/50 text-sm">{activeCourse.category}</p>
      </section>

      <section className="w-full leading-7 sm:leading-8 min-w-0">
        <p className="text-md font-bold text-stone-400 uppercase">
          {activeCourse.category}: module {activeCourse.moduleNumber || 1} of {activeCourse.totalModules || 8}
        </p>

        <p className="font-medium break-words">{activeCourse.title}</p>

        <p className="text-sm font-medium break-words">
          Next up: {activeCourse.nextUp || 'Continue learning'}
        </p>

        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-900 transition-all duration-500"
              style={{ width: `${activeCourse.progress || 0}%` }}
            />
          </div>
          <p className="text-md font-medium text-blue-900 mt-1">
            {activeCourse.progress || 0}% complete
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button 
            onClick={handleResume}
            className="w-full sm:w-auto px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition duration-300 text-sm"
          >
            {activeCourse.progress > 0 ? 'Resume Course' : 'Start Course'}
            <BsFillPlayFill className="inline-block ml-2" />
          </button>
        </div>
      </section>
    </section>
  );
}

export default LearningModuleCard;
