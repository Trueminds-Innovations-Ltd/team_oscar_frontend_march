function UrgentTasks() {
  const taskRowClass =
    "flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-300";

  return (
    <section className="h-full w-full rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">Urgent Tasks</p>
        <button className="text-sm text-blue-900 font-medium">View All</button>
      </div>

      <section className="flex flex-col">
        <div className={taskRowClass}>
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black flex-shrink-0"></div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Wireframe Prototype — Mod 3</p>
            <p className="truncate text-xs">UX Fundamentals</p>
          </div>

          <div className="flex-shrink-0 rounded-2xl border border-orange-400 p-2">
            <p className="text-xs font-medium text-orange-400">In Review</p>
          </div>

          <p className="hidden text-xs font-medium sm:block flex-shrink-0">Tomorrow</p>
        </div>

        <div className={taskRowClass}>
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black flex-shrink-0"></div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              Information Architecture — Mod 3
            </p>
            <p className="truncate text-xs">UX Fundamentals</p>
          </div>

          <div className="flex-shrink-0 rounded-2xl border border-orange-400 p-2">
            <p className="text-xs font-medium text-orange-400">Overdue</p>
          </div>

          <p className="hidden text-xs font-medium sm:block flex-shrink-0">Mar 13th</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 py-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black flex-shrink-0"></div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">User Personal — Mod 2</p>
            <p className="truncate text-xs">UX Fundamentals</p>
          </div>

          <div className="flex-shrink-0 rounded-2xl border border-orange-400 p-2">
            <p className="text-xs font-medium text-orange-400">Completed</p>
          </div>

          <p className="hidden text-xs font-medium sm:block flex-shrink-0">Tomorrow</p>
        </div>
      </section>
    </section>
  );
}

export default UrgentTasks;
