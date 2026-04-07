import { FiMenu } from "react-icons/fi";
import CourseCard from "./CourseCard";
import CourseSection from "./CourseSection";
import CoursesControlBar from "./CoursesControlBar";

const activeCourses = [
  {
    id: 1,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "16h left",
    actionLabel: "Resume Course",
  },
  {
    id: 2,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "14h left",
    actionLabel: "Resume Course",
  },
];

const allCourses = [
  {
    id: 1,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "16h left",
    actionLabel: "Start Course",
  },
  {
    id: 2,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "14h left",
    actionLabel: "Start Course",
  },
  {
    id: 3,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "14h left",
    actionLabel: "Start Course",
  },
  {
    id: 4,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "10h left",
    actionLabel: "Start Course",
  },
  {
    id: 5,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "9h left",
    actionLabel: "Start Course",
  },
  {
    id: 6,
    title: "UX Fundamentals & Design Thinking",
    completion: "60% Complete",
    progress: 60,
    timeLeft: "8h left",
    actionLabel: "Start Course",
  },
];

function CoursesContent() {
  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-265">
        <header className="mb-3">
          <h1 className="text-[34px] font-extrabold tracking-[-0.5px] text-[#181f33]">
            Enrolled Courses
          </h1>
          <p className="text-[13px] font-medium text-[#7b8191]">
            master your concepts with level wise tests.
          </p>
        </header>

        <CoursesControlBar />

        <div className="space-y-4">
          <CourseSection title="Active Courses">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {activeCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  completion={course.completion}
                  progress={course.progress}
                  timeLeft={course.timeLeft}
                  actionLabel={course.actionLabel}
                />
              ))}
            </div>
          </CourseSection>

          <CourseSection title="All Courses" actionLabel="View all">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {allCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  completion={course.completion}
                  progress={course.progress}
                  timeLeft={course.timeLeft}
                  actionLabel={course.actionLabel}
                  disabled
                />
              ))}
            </div>
          </CourseSection>
        </div>
      </div>
    </main>
  );
}

export default CoursesContent;
