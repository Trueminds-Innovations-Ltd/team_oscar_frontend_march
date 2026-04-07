import Sidebar from "../../../shared/layout/Sidebar";
import useSidebarOpen  from "../../../shared/hooks/useSidebarOpen";
import CoursesContent from "../components/CoursesContent";
import NavBar from "../../../shared/layout/NavBar";

function Courses() {
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarOpen();

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

      <section className="w-full min-h-screen lg:ml-62.5">
        <NavBar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />

        <CoursesContent
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />
      </section>
    </section>
  );
}

export default Courses;
