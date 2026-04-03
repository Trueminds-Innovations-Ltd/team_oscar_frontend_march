function Statistics() {
  return (
    <section className="w-full rounded-lg border border-gray-300 p-4 sm:p-6">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <section className="min-w-0">
          <p className="font-semibold">Statistics</p>
          <p className="text-xs font-medium text-stone-400">March 2026</p>

          <section className="mt-5">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-gray-300 py-3">
              <img src="person.png" alt="absence" />
              <div>
                <p className="text-sm text-stone-400 sm:text-base">Absence</p>
                <p className="font-semibold">90%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border-b border-gray-300 py-3">
              <img src="task.png" alt="task" />
              <div>
                <p className="text-sm text-stone-400 sm:text-base">Tasks & Exam</p>
                <p className="font-semibold">70%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 py-3">
              <img src="time.png" alt="quiz" />
              <div>
                <p className="text-sm text-stone-400 sm:text-base">Quiz</p>
                <p className="font-semibold">85%</p>
              </div>
            </div>
          </section>
        </section>

        <section className="flex justify-center lg:justify-end">
          <img src="progress.png" alt="progress-indicator" className="h-auto max-w-[180px] w-full sm:max-w-[220px]" />
        </section>
      </section>
    </section>
  );
}

export default Statistics;
