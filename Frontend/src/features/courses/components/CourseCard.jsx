import { FiChevronRight } from "react-icons/fi";

function CourseCard({
  title,
  completion,
  progress,
  timeLeft,
  actionLabel,
  disabled = false,
}) {
  return (
    <article className="rounded-[10px] border border-[#d4d8e3] bg-white p-2.5 shadow-[0_2px_0_rgba(0,0,0,0.02)]">
      <div className="h-23 w-full rounded-[9px] bg-[#111825]" />

      <div className="mt-3 space-y-2">
        <p className="text-[10px] font-semibold text-[#252c3d]">{title}</p>

        <div className="flex items-center justify-between text-[9px] font-medium text-[#636e85]">
          <span>{completion}</span>
          <span>{timeLeft}</span>
        </div>

        <div className="h-0.75 w-full rounded-full bg-[#dde1ec]">
          <div
            className="h-full rounded-full bg-[#243f9f]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="flex items-center gap-1 text-[8px] font-medium text-[#667085]">
            <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#20bf55]" />
            last visited 2h ago
          </p>

          <button
            type="button"
            disabled={disabled}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-[9px] font-semibold transition-colors ${
              disabled
                ? "cursor-not-allowed bg-[#d5d9e2] text-[#f5f7fb]"
                : "bg-[#2542a1] text-white hover:bg-[#1e3580]"
            }`}
          >
            {actionLabel}
            {!disabled && <FiChevronRight className="ml-1" />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
