import { FaCheck, FaRegCommentDots, FaRobot, FaUserGraduate } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import StepHeader from "./StepHeader";

function AiSupportStep({ onFinish, loading }) {
  return (
    <>
      <div className="ai-center">
        <StepHeader
          eyebrow="AI support"
          title="Need help while"
          highlight="learning?"
          sub="Our AI assistant is always available — ask questions, get explanations, and escalate to a human tutor anytime."
          centered
        />

        <div className="ai-orb">
          <FaRobot size={36} />
        </div>

        <div className="ai-capabilities">
          <div className="ai-cap">
            <div className="ai-cap-icon" style={{ background: "#EFF6FF", color: "#2563EB" }}>
              <FaRegCommentDots />
            </div>
            <div className="ai-cap-text">Instant Q&amp;A</div>
            <div className="ai-cap-sub">Ask anything about your course content, 24/7.</div>
          </div>

          <div className="ai-cap">
            <div className="ai-cap-icon" style={{ background: "#EDE9FE", color: "#7C3AED" }}>
              <FaCheck />
            </div>
            <div className="ai-cap-text">Assignment help</div>
            <div className="ai-cap-sub">Get guided feedback without just being given answers.</div>
          </div>

          <div className="ai-cap">
            <div className="ai-cap-icon" style={{ background: "#F0FDF4", color: "#10B981" }}>
              <FaUserGraduate />
            </div>
            <div className="ai-cap-text">Tutor escalation</div>
            <div className="ai-cap-sub">Connect to a real tutor with one tap when you need it.</div>
          </div>
        </div>

        <div className="ai-chat-preview">
          <div className="chat-msg out">
            <div className="chat-av" style={{ background: "#DBEAFE", color: "#1E40AF" }}>
              JD
            </div>
            <div className="chat-bubble">Why does nav hierarchy matter in my wireframe?</div>
          </div>

          <div className="chat-msg in">
            <div className="chat-av" style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", color: "#fff" }}>
              AI
            </div>
            <div className="chat-bubble">
              Great question! Nav hierarchy guides users through your interface without friction. When it&apos;s unclear,
              users abandon tasks. In your wireframe, think about...
            </div>
          </div>

          <div className="chat-msg in">
            <div className="chat-av" style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", color: "#fff" }}>
              AI
            </div>
            <div className="typing-dots">
              <div className="td" />
              <div className="td" />
              <div className="td" />
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-row" style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ minWidth: "220px", justifyContent: "center" }} 
            onClick={onFinish}
            disabled={loading}
          >
            {loading ? "Setting up..." : "Go to dashboard"}
            {!loading && <HiArrowLongRight />}
          </button>

          <div className="cta-hint">All features available from day one · Settings are always editable</div>
        </div>
      </div>
    </>
  );
}

export default AiSupportStep;
