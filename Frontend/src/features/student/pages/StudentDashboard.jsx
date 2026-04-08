import { useState, useEffect, useContext, useMemo } from "react";
import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import SummaryCard from "../../../shared/ui/SummaryCard";
import DashboardMetrics from "../../dashboard/components/DashboardMetrics";
import WelcomeUser from "../../dashboard/components/WelcomeUser";
import LearningModuleCard from "../../dashboard/components/LearningModuleCard";
import UrgentCourses from "../../dashboard/components/UrgentCourses";
import Statistics from "../../dashboard/components/Statistics";
import LMSContext from "../../../contexts/LMSContext";
import { CourseProvider, useCourses } from "../../../contexts/CourseContext";
import CourseReadingModal from "../../../shared/components/CourseReadingModal";
import StudySessionModal from "../../../shared/components/StudySessionModal";

function StudentDashboardContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(LMSContext);
  const { readingModal, updateProgress, closeReadingModal, studySessionModal, closeStudySessionModal, enrolledCourses, studySessions, studySessionProgress } = useCourses();

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const dashboardStats = useMemo(() => {
    const totalCourses = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(c => c.progress >= 100).length;
    
    const totalStudySessions = studySessions.length;
    const completedStudySessions = studySessions.filter(session => {
      const progress = studySessionProgress[session._id];
      return progress && progress.progress >= 100;
    }).length;
    
    const inProgressStudySessions = studySessions.filter(session => {
      const progress = studySessionProgress[session._id];
      return progress && progress.progress > 0 && progress.progress < 100;
    }).length;
    
    let overallProgress = 0;
    if (totalCourses > 0) {
      const totalProgress = enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0);
      overallProgress = Math.round(totalProgress / totalCourses);
    }
    
    if (inProgressStudySessions > 0 || completedStudySessions > 0) {
      const sessionCount = studySessions.length;
      const sessionProgress = studySessions.reduce((sum, session) => {
        const progress = studySessionProgress[session._id];
        return sum + (progress?.progress || 0);
      }, 0);
      const sessionAvg = sessionCount > 0 ? Math.round(sessionProgress / sessionCount) : 0;
      overallProgress = Math.max(overallProgress, sessionAvg);
    }

    return {
      progress: overallProgress,
      courses: totalCourses,
      completedStudy: completedStudySessions,
      totalStudy: totalStudySessions
    };
  }, [enrolledCourses, studySessions, studySessionProgress]);

  return (
    <>
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
                    <p className="font-medium">{dashboardStats.progress}% Complete</p>
                  </div>
                </SummaryCard>

                <SummaryCard>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>

                  <div>
                    <p className="font-medium">Courses</p>
                    <p className="font-medium">{dashboardStats.courses}</p>
                  </div>
                </SummaryCard>

                <SummaryCard>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <div className="min-w-0">
                    <p className="truncate font-medium">Completed Study</p>
                    <p className="font-medium">{dashboardStats.completedStudy}/{dashboardStats.totalStudy}</p>
                  </div>
                </SummaryCard>
              </DashboardMetrics>
            </section>

            <section className="mt-7 w-full">
              <LearningModuleCard />
            </section>

            <section className="mt-6 grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
              <UrgentCourses />
              <Statistics />
            </section>
          </main>
        </section>
      </section>

      {readingModal.isOpen && (
        <CourseReadingModal
          course={readingModal.course}
          onClose={closeReadingModal}
          onProgressUpdate={updateProgress}
        />
      )}

      {studySessionModal.isOpen && studySessionModal.session && (
        <StudySessionModal
          session={studySessionModal.session}
          onClose={closeStudySessionModal}
        />
      )}
    </>
  );
}

function StudentDashboard() {
  return (
    <CourseProvider>
      <StudentDashboardContent />
    </CourseProvider>
  );
}

export default StudentDashboard;