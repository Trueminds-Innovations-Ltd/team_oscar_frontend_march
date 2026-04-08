import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
// import Sidebar from "../../../shared/layout/Sidebar";
// import NavBar from "../../../shared/layout/NavBar";

const NavbarShell = ({ children }) => {
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

      <section className="flex w-full flex-col min-h-screen lg:ml-[250px]">
        <NavBar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </section>
    </section>
  );
};

export default NavbarShell;
