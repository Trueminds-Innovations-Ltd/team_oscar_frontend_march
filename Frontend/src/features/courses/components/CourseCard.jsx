import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../../../shared/utils/dateUtils";
import { API_URL } from "../../../shared/api";

function CourseCard({
  title,
  completion,
  progress,
  timeLeft,
  actionLabel,
  disabled = false,
  subTopic,
  tutorName,
  isTutor = false,
  fileUrl,
  linkUrl,
  sessionId,
  onCardClick,
  lastVisited,
  showButton = false,
}) {
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (onCardClick) {
      onCardClick();
      return;
    }

    const baseUrl = API_URL.replace('/api', '');
    const sessionData = encodeURIComponent(
      JSON.stringify({
        title,
        subTopic,
        tutorName,
        fileUrl: fileUrl?.startsWith("/") ? baseUrl + fileUrl : fileUrl,
        linkUrl,
        sessionId,
      }),
    );

    navigate(`/active-courses?session=${sessionData}`);
  };
  return (
    <article
      className={`rounded-[10px] border border-[#d4d8e3] bg-white p-2.5 shadow-[0_2px_0_rgba(0,0,0,0.02)] ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
      onClick={handleAction}
    >
      <div className="h-23 w-full rounded-[9px] bg-[#111825]" />

      <div className="mt-3 space-y-2">
        <p className="text-[10px] font-semibold text-[#252c3d]">{title}</p>

        {subTopic && (
          <p className="text-[9px] font-medium text-[#636e85]">{subTopic}</p>
        )}

        {tutorName && (
          <p className="text-[8px] font-medium text-[#667085]">
            Tutor: {tutorName}
          </p>
        )}

        <div className="flex items-center justify-between text-[9px] font-medium text-[#636e85]">
          <span>{completion}</span>
          <span>{timeLeft}</span>
        </div>

        {!isTutor && (
          <div className="h-0.75 w-full rounded-full bg-[#dde1ec]">
            <div
              className="h-full rounded-full bg-[#243f9f]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          {isTutor ? (
            <p className="flex items-center gap-1 text-[8px] font-medium text-[#667085]">
              <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#20bf55]" />
              Students enrolled
            </p>
          ) : (
            <p className="flex items-center gap-1 text-[8px] font-medium text-[#667085]">
              <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#20bf55]" />
              {lastVisited && progress > 0
                ? `opened ${formatTimeAgo(lastVisited)}`
                : "Not started"}
            </p>
          )}

          {(showButton || actionLabel) && (
          <button
            type="button"
            disabled={disabled}
            className={`w-full sm:w-auto inline-flex items-center justify-center rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-[9px] sm:text-[9px] font-semibold transition-colors cursor-pointer ${
              disabled
                ? "cursor-not-allowed bg-[#d5d9e2] text-[#f5f7fb]"
                : "bg-[#2542a1] text-white hover:bg-[#1e3580]"
            }`}
            onClick={handleAction}
          >
            {actionLabel}
            {!disabled && showButton && <FiChevronRight className="ml-1" />}
          </button>
        )}
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
