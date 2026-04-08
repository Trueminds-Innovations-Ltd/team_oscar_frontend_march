import { FiChevronLeft, FiChevronRight, FiLock } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

const calendarDays = [
  "30",
  "31",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

const upcomingLessons = [
  {
    id: 1,
    title: "UX Design Fundamentals",
    time: "5:30pm",
  },
  {
    id: 2,
    title: "Interaction Design",
    time: "9:00pm",
  },
];

function LessonSidebarPanel() {
  return (
    <section className="space-y-4">
      <article className="rounded-[14px] border border-[#d5dae5] bg-white p-4 shadow-[0_8px_18px_rgba(12,20,45,0.08)]">
        <header className="mb-3 flex items-center justify-between">
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f2f8] text-[#59637a]"
            aria-label="Previous month"
          >
            <FiChevronLeft />
          </button>

          <h3 className="text-[14px] font-bold text-[#1f2740]">March 2026</h3>

          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f2f8] text-[#59637a]"
            aria-label="Next month"
          >
            <FiChevronRight />
          </button>
        </header>

        <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold uppercase text-[#9aa2b4]">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center text-[12px] font-medium text-[#2b344b]">
          {calendarDays.map((day, index) => {
            const isSunday = index % 7 === 0;
            const isCurrentDay = day === "29";

            return (
              <span
                key={`${day}-${index}`}
                className={`mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full ${
                  isCurrentDay
                    ? "bg-[#1c88d5] text-white"
                    : isSunday
                      ? "text-[#df4b4b]"
                      : "text-[#2b344b]"
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#d5dae5] bg-white shadow-[0_8px_18px_rgba(12,20,45,0.08)]">
        <header className="border-b border-[#e2e6ef] px-4 py-3">
          <h3 className="text-[15px] font-bold text-[#1f2740]">
            Upcoming Lesson
          </h3>
        </header>

        <div className="divide-y divide-[#eceff6] px-4">
          {upcomingLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-2">
                <GoDotFill className="text-[14px] text-[#1f2740]" />
                <div>
                  <p className="text-[12px] font-semibold text-[#28324b]">
                    {lesson.title}
                  </p>
                  <p className="text-[12px] text-[#6f7790]">{lesson.time}</p>
                </div>
              </div>

              <FiLock className="text-[#77809a]" />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default LessonSidebarPanel;
