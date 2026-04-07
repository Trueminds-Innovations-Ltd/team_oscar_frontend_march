function ActiveCourseTabs({ activeTab, onTabChange }) {
  return (
    <section className="border-b border-[#d8dce8]">
      <div className="flex items-end gap-10">
        <button
          type="button"
          onClick={() => onTabChange("lesson")}
          className={`border-b-[3px] px-1 pb-2 text-[14px] font-semibold capitalize transition-colors cursor-pointer ${
            activeTab === "lesson"
              ? "border-[#f6aa1c] text-[#1b2236]"
              : "border-transparent text-[#525c71] hover:text-[#1b2236]"
          }`}
        >
          lesson
        </button>

        <button
          type="button"
          onClick={() => onTabChange("materials")}
          className={`border-b-[3px] px-1 pb-2 text-[14px] font-semibold capitalize transition-colors cursor-pointer ${
            activeTab === "materials"
              ? "border-[#f6aa1c] text-[#1b2236]"
              : "border-transparent text-[#525c71] hover:text-[#1b2236]"
          }`}
        >
          materials
        </button>
      </div>
    </section>
  );
}

export default ActiveCourseTabs;
