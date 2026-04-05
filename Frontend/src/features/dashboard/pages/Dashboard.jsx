import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import SummaryCard from "../../../shared/ui/SummaryCard";
import DashboardMetrics from "../components/DashboardMetrics";
import { useEffect, useState } from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import WelcomeUser from "../components/WelcomeUser";
import LearningModuleCard from "../components/LearningModuleCard";
import UrgentTasks from "../components/UrgentTasks";
import Statistics from "../components/Statistics";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

      {/* Main dashboard */}
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
                <FaGraduationCap size={20} />

                <div>
                  <p className="font-medium">Progress</p>
                  <p className="font-medium">10% Complete</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <HiOutlineBookOpen size={20} />

                <div>
                  <p className="font-medium">Courses</p>
                  <p className="font-medium">5</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <TbNotes size={20} />

                <div className="min-w-0">
                  <p className="truncate font-medium">Completed Courses</p>
                  <p className="font-medium">2/5</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <GoTasklist size={20} />

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

export default Dashboard;
