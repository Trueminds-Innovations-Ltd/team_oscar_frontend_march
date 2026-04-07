import { useCourses } from '../../../contexts/CourseContext';
import { useNavigate } from "react-router-dom";

function LearningModuleCard() {
  const { getLatestIncomplete, openStudySessionModal, studySessions, studySessionProgress } = useCourses();
  const navigate = useNavigate();
  
  const latestSession = getLatestIncomplete();
  const latestProgress = latestSession ? studySessionProgress[latestSession._id] : null;

  if (!latestSession) {
    return (
      <section className="w-full rounded-lg border border-gray-300 p-4 flex flex-col gap-4 lg:flex-row">
        <section className="h-[180px] w-full rounded-lg bg-gray-200 sm:h-[220px] lg:h-[200px] lg:max-w-[500px] flex items-center justify-center">
          <p className="text-gray-400">No active study session</p>
        </section>

        <section className="w-full leading-7 sm:leading-8 min-w-0 flex flex-col justify-center">
          <p className="text-md font-bold text-stone-400 uppercase">
            Start Learning
          </p>

          <p className="font-medium break-words text-gray-500">
            Select a study session from Study Sessions to begin
          </p>
        </section>
      </section>
    );
  }

  const progressValue = latestProgress?.progress || 0;

  const handleResume = () => {
    openStudySessionModal(latestSession);
  };

  return (
    <section className="w-full rounded-lg border border-gray-300 p-4 flex flex-col gap-4 lg:flex-row">
      <section className="h-[180px] w-full rounded-lg bg-black sm:h-[220px] lg:h-[200px] lg:max-w-[500px] flex items-center justify-center">
        <p className="text-white/50 text-sm">{latestSession.course?.title || 'Study Session'}</p>
      </section>

      <section className="w-full leading-7 sm:leading-8 min-w-0">
        <p className="text-md font-bold text-stone-400 uppercase">
          Study Session: {latestSession.subTopic}
        </p>

        <p className="font-medium break-words">{latestSession.course?.title || 'Study Session'}</p>
        <p className="font-medium break-words">
          Tutor: {latestSession.tutor?.name || 'Tutor'}
        </p>

        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-900 transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <p className="text-md font-medium text-blue-900 mt-1">
            {progressValue}% complete
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button 
            onClick={handleResume}
            className="w-full sm:w-auto px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition duration-300 text-sm"
          >
            {progressValue > 0 ? 'Resume Study' : 'Start Study'}
          </button>
          
          <button 
            className="w-full sm:w-auto px-5 py-3 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition duration-300 text-sm"
            onClick={() => navigate("/courses")}
          >
            View All Sessions
          </button>
        </div>
      </section>
    </section>
  );
}

export default LearningModuleCard;