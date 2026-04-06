import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function CoursesControlBar() {
  return (
    <section className="mb-4 flex items-center justify-between gap-3">
      <div className="h-[44px] w-full max-w-[320px] rounded-[11px] bg-[#b8bdc7] p-1">
        <div className="h-full w-[30%] rounded-[9px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef0f5] text-[#586074] transition-colors hover:bg-[#dfe4ef]"
          aria-label="Previous courses"
        >
          <FiChevronLeft size={14} />
        </button>

        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef0f5] text-[#586074] transition-colors hover:bg-[#dfe4ef]"
          aria-label="Next courses"
        >
          <FiChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}

export default CoursesControlBar;
