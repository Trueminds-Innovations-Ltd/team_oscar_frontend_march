import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import SummaryCard from "../../../shared/ui/SummaryCard";
import DashboardMetrics from "../../dashboard/components/DashboardMetrics";
import { useEffect, useState, useContext } from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import LearningModuleCard from "../../../shared/layout/LearningModuleCard";
import UrgentTasks from "../../dashboard/components/UrgentTasks";
import Statistics from "../../dashboard/components/Statistics";
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

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
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="bean text-2xl font-extrabold sm:text-3xl lg:text-[35px] break-words">
                {getGreeting()}, {user?.name || "Student"} <span>👋</span>
              </h1>
              <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
                Student | Level: {user?.levelName || "Beginner"}
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

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
                  <p className="font-medium">My Courses</p>
                  <p className="font-medium">0</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <TbNotes size={20} />
                <div className="min-w-0">
                  <p className="truncate font-medium">Completed Lessons</p>
                  <p className="font-medium">0</p>
                </div>
              </SummaryCard>

              <SummaryCard>
                <GoTasklist size={20} />
                <div>
                  <p className="font-medium">Assignments</p>
                  <p className="font-medium">0</p>
                </div>
              </SummaryCard>
            </DashboardMetrics>
          </section>

          <section className="mt-7 w-full">
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
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
