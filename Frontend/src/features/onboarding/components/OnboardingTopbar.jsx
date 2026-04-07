import { FaLayerGroup } from "react-icons/fa6";

function OnboardingTopbar({ onSkip }) {
  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-mark">
          <FaLayerGroup />
        </div>
        <div className="logo-name">TalentFlow</div>
      </div>

      <button type="button" className="skip-btn" onClick={onSkip}>
        Skip for now
      </button>
    </div>
  );
}

export default OnboardingTopbar;
