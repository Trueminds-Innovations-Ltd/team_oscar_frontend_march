import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import { useEffect, useState, useContext } from "react";
import LMSContext from "../../../contexts/LMSContext";

function TutorDashboardd() {
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
                {getGreeting()}, {user?.name || "Tutor"} <span>👨‍🏫</span>
              </h1>
              <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
                Tutor | Expertise: {user?.interests?.join(", ") || "Not set"}
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">My Courses</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Pending Assignments</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Notifications</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Courses</h2>
              <button className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-blue-600">
                + Create Course
              </button>
            </div>
            <p className="text-gray-500">
              No courses created yet. Start by creating your first course!
            </p>
          </section>
        </main>
      </section>
    </section>
  );
}

export default TutorDashboardd;
