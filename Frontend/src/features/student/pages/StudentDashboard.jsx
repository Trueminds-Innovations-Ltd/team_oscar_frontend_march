import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import SummaryCard from "../../../shared/ui/SummaryCard";
import DashboardMetrics from "../../dashboard/components/DashboardMetrics";
import WelcomeUser from "../../dashboard/components/WelcomeUser";
import LearningModuleCard from "../../dashboard/components/LearningModuleCard";
import UrgentTasks from "../../dashboard/components/UrgentTasks";
import Statistics from "../../dashboard/components/Statistics";
import { useEffect, useState, useContext } from "react";
import LMSContext from "../../../contexts/LMSContext";

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useContext(LMSContext);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#f8f9ff] lg:flex">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <section className="flex w-full flex-col min-h-screen lg:ml-[250px]">
        <NavBar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="mt-3 w-full px-4 py-6 sm:px-6 lg:px-7">
          <WelcomeUser />

          <section>
            <DashboardMetrics>
              <SummaryCard>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>

                <div>
                  <p className="font-medium">Progress</p>
                  <p className="font-medium">10% Complete</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>

                <div>
                  <p className="font-medium">Courses</p>
                  <p className="font-medium">5</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <div className="min-w-0">
                  <p className="truncate font-medium">Completed Courses</p>
                  <p className="font-medium">2/5</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>

                <div>
                  <p className="font-medium">Task</p>
                  <p className="font-medium">2/5</p>
                </div>
              </SummaryCard>
            </DashboardMetrics>
          </section>

          <section className="mt-7 w-full">
            <LearningModuleCard />
          </section>

          <section className="mt-6 grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
            <UrgentTasks />
            <Statistics />
          </section>
        </main>
      </section>
    </section>
  );
}

export default StudentDashboard;
