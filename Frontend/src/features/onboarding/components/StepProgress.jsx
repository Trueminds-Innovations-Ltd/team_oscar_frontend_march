function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="progress-wrap">
      <div className="progress-steps">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const stateClass = step < currentStep ? "done" : step === currentStep ? "active" : "";

          return <div key={step} className={`progress-seg ${stateClass}`} />;
        })}
      </div>

      <div className="progress-label">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}

export default StepProgress;
