import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import ActiveCourseTabs from "../components/ActiveCourseTabs";
import LessonOverviewPanel from "../components/LessonOverviewPanel";
import LessonSidebarPanel from "../components/LessonSidebarPanel";
import MaterialsDownloadsPanel from "../components/MaterialsDownloadsPanel";
import { useNavigate } from "react-router-dom";
import useSidebarOpen from "../../../shared/hooks/useSidebarOpen";

function ActiveCourses() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarOpen();
  const [activeTab, setActiveTab] = useState("lesson");


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

      <section className="flex min-h-screen w-full flex-col lg:ml-62.5">
        <NavBar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="w-full px-4 py-5 sm:px-6 lg:px-7">
          <div className="mx-auto w-full max-w-7xl">
            <button
              type="button"
              className="mb-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#4f586e] hover:text-[#2e3650] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/courses");
              }}
            >
              <FiChevronLeft className="text-[14px]" />
              Back To Courses
            </button>

            <ActiveCourseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === "lesson" ? (
              <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                <LessonOverviewPanel />
                <LessonSidebarPanel />
              </section>
            ) : (
              <MaterialsDownloadsPanel />
            )}
          </div>
        </main>
      </section>
    </section>
  );
}

export default ActiveCourses;
