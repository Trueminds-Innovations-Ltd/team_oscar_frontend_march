import React, { useEffect, useState } from "react";
import styles from "../dashboard.module.css";

import TopBar from "../components/TopBar";
import Greeting from "../components/Greeting";
import SummaryCards from "../components/SummaryCards";
import CourseCard from "../components/CourseCard";
import PendingReviews from "../components/PendingReviews";
import TutorInsights from "../components/TutorInsights";
import Sidebar from "../../../shared/layout/Sidebar";

const TutorDashboard = () => {
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
        <div className={styles["tf-main"]}>
          <TopBar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            isSidebarOpen={isSidebarOpen}
          />

          <div className={styles["tf-content"]}>
            <Greeting name="Maria" taskCount={8} />
            <SummaryCards />
            <CourseCard />

            <div className={styles["tf-bottom-grid"]}>
              <PendingReviews />
              <TutorInsights />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TutorDashboard;
