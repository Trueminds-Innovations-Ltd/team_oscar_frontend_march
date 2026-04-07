import React, { useEffect, useState } from "react";
import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";

const ProfileShell = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="border-r border-slate-200 bg-white xl:block xl:w-[280px]">
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
          </section>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <NavBar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            isSidebarOpen={isSidebarOpen}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileShell;
