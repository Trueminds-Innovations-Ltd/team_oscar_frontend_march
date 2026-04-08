import { FaLayerGroup } from "react-icons/fa6";
import { HiArrowLongLeft } from "react-icons/hi2";

function OnboardingTopbar({ onSkip, showBackToProfile, onBackToProfile }) {
  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-mark">
          <FaLayerGroup />
        </div>
        <div className="logo-name">TalentFlow</div>
      </div>

      <div className="flex items-center gap-3">
        {showBackToProfile && (
          <button 
            type="button" 
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
            onClick={onBackToProfile}
          >
            <HiArrowLongLeft />
            Back to Profile
          </button>
        )}
        <button type="button" className="skip-btn" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default OnboardingTopbar;
