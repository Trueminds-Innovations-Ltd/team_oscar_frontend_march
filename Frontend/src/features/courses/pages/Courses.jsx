import Sidebar from "../../../shared/layout/Sidebar";
import { useEffect, useState, useContext } from "react";
import CoursesContent from "../components/CoursesContent";
import LMSContext from "../../../contexts/LMSContext";
import { CourseProvider } from "../../../contexts/CourseContext";
import NavBar from "../../../shared/layout/NavBar";

function CoursesContentWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(LMSContext);
  const isTutor = user?.role === 2;

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

        <CoursesContent
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
          isTutor={isTutor}
        />
      </section>
    </section>
  );
}

function Courses() {
  return (
    <CourseProvider>
      <CoursesContentWrapper />
    </CourseProvider>
  );
}

export default Courses;