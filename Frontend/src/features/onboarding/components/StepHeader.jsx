function StepHeader({ eyebrow, title, highlight, sub, centered = false }) {
  return (
    <>
      <div className={`step-eyebrow ${centered ? "center-eyebrow" : ""}`}>{eyebrow}</div>
      <h1 className="step-title">
        {title} <em>{highlight}</em>
      </h1>
      <p className={`step-sub ${centered ? "center-sub" : ""}`}>{sub}</p>
    </>
  );
}

export default StepHeader;
