import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function StepActions({
  onBack,
  onNext,
  nextLabel = "Continue",
  hint,
  hintRight = true,
  showBack = true,
  showBackToProfile = false,
  onBackToProfile,
  centered = false,
}) {
  const navigate = useNavigate();
  
  return (
    <div className="cta-section">
      <div
        className="cta-row"
        style={centered ? { justifyContent: "center", flexDirection: "column", alignItems: "center" } : undefined}
      >
        {showBackToProfile ? (
          <button type="button" className="back-btn" onClick={onBackToProfile || (() => navigate("/profile"))}>
            <HiArrowLongLeft />
            Back to Profile
          </button>
        ) : showBack ? (
          <button type="button" className="back-btn" onClick={onBack}>
            <HiArrowLongLeft />
            Back
          </button>
        ) : (
          <div />
        )}

        <button type="button" className="btn-primary" onClick={onNext}>
          {nextLabel}
          <HiArrowLongRight />
        </button>
      </div>

      {hint ? <div className={`cta-hint ${hintRight ? "right-hint" : ""}`}>{hint}</div> : null}
    </div>
  );
}

export default StepActions;
