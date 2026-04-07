import { FiPlayCircle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function LessonOverviewPanel() {
  return (
    <article className="rounded-[14px] border border-[#d5dae5] bg-white p-4 sm:p-5">
      <header>
        <h2 className="text-[30px] font-bold text-[#1b2236] sm:text-[34px]">
          1. UX Fundamentals & Design Thinking
        </h2>
        <p className="mt-1 text-[11px] font-medium text-[#98a1b3]">
          Start : 28/03/2026 &nbsp;&nbsp; 12:00pm
        </p>
      </header>

      <div className="relative mt-4 overflow-hidden rounded-[14px] bg-[#2a3244]">
        <img
          src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80"
          alt="Course media"
          className="h-[230px] w-full object-cover opacity-55 sm:h-[270px]"
        />

        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play lesson"
        >
          <FiPlayCircle className="text-[64px] text-white/90" />
        </button>
      </div>

      <section className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-[#586178]">
          <p>
            Progress: <span className="text-[#313a52]">80% Complete</span>
          </p>
          <p>10h Left</p>
        </div>

        <div className="h-1.5 rounded-full bg-[#d9deeb]">
          <div className="h-full w-4/5 rounded-full bg-[#4c62be]" />
        </div>
      </section>

      <section className="mt-5">
        <h3 className="text-[22px] font-bold text-[#26304a]">
          Lesson Description And Plan
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium">
          <p className="flex items-center gap-1 text-[#62b86f]">
            <IoCheckmarkDoneSharp /> Emphatize
          </p>
          <p className="flex items-center gap-1 text-[#62b86f]">
            <IoCheckmarkDoneSharp /> Ideate
          </p>
          <p className="text-[#8f97aa]">Test</p>
          <p className="flex items-center gap-1 text-[#62b86f]">
            <IoCheckmarkDoneSharp /> Define
          </p>
          <p className="text-[#8f97aa]">Prototype</p>
        </div>

        <p className="mt-4 text-[13px] leading-6 text-[#727b8f]">
          User Experience (UX) Fundamentals And Design Thinking Are The Twin
          Engines Of Modern Product Development. While UX Focuses On The
          Holistic Journey And Satisfaction Of The User, Design Thinking
          Provides The Structured, Human-Centered Framework To Solve The Complex
          Problems That Arise During That Journey.
        </p>
      </section>
    </article>
  );
}

export default LessonOverviewPanel;
