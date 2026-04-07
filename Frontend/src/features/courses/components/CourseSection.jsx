function CourseSection({ title, actionLabel = "", children }) {
  return (
    <section className="rounded-[12px] border border-[#d7dce8] bg-[#fbfcff] p-3">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[#151b2c]">{title}</h2>

        {actionLabel && (
          <button
            type="button"
            className="text-[13px] font-semibold text-[#2440a0] transition-colors hover:text-[#1e3580]"
          >
            {actionLabel}
          </button>
        )}
      </header>

      {children}
    </section>
  );
}

export default CourseSection;
