import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import ActiveCourseTabs from "../components/ActiveCourseTabs";
import LessonOverviewPanel from "../components/LessonOverviewPanel";
import LessonSidebarPanel from "../components/LessonSidebarPanel";
import MaterialsDownloadsPanel from "../components/MaterialsDownloadsPanel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../shared/api";

function ActiveCourses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("lesson");
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const sessionParam = searchParams.get("session");
    if (sessionParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(sessionParam));
        setSessionData(decoded);
        console.log(decoded);
      } catch (err) {
        console.error("Failed to parse session data:", err);
      }
    }
  }, [searchParams]);

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

      <section className="flex min-h-screen w-full flex-col lg:ml-[250px]">
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

            {sessionData && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-lg font-bold text-blue-900">
                  {sessionData.title}
                </h2>
                <p className="text-sm text-blue-700">
                  {sessionData.subTopic} • {sessionData.tutorName}
                </p>
              </div>
            )}

            <ActiveCourseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === "lesson" ? (
              <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                {sessionData ? (
                  <StudySessionContent sessionData={sessionData} />
                ) : (
                  <LessonOverviewPanel />
                )}
                <LessonSidebarPanel />
              </section>
            ) : sessionData ? (
              <StudySessionMaterials sessionData={sessionData} />
            ) : (
              <MaterialsDownloadsPanel />
            )}
          </div>
        </main>
      </section>
    </section>
  );
}

function StudySessionContent({ sessionData }) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Study Session Content
      </h3>

      {sessionData.linkUrl && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Session Link
          </h4>
          <a
            href={sessionData.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Open Link
          </a>
        </div>
      )}

      {!sessionData.fileUrl && !sessionData.linkUrl && (
        <p className="text-gray-500">No content available for this session.</p>
      )}
    </div>
  );
}

function StudySessionMaterials({ sessionData }) {
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const token = localStorage.getItem("token");

  const handleMarkComplete = async () => {
    if (!sessionData.sessionId) return;

    setCompleting(true);
    try {
      const response = await fetch(
        `${API_URL}/study-sessions/${sessionData.sessionId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setCompleted(true);
      }
    } catch (err) {
      console.error("Failed to mark complete:", err);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Materials</h3>

      {sessionData.fileUrl && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Uploaded File
          </h4>
          <a
            href={sessionData.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-lg">📄</span>
            <span className="text-blue-900 font-medium">
              View/Download File
            </span>
          </a>
        </div>
      )}

      {sessionData.linkUrl && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            External Link
          </h4>
          <a
            href={sessionData.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-lg">🔗</span>
            <span className="text-blue-900 font-medium">Open Link</span>
          </a>
        </div>
      )}

      {completed ? (
        <div className="mt-4 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium">
          ✓ Completed
        </div>
      ) : (
        <button
          type="button"
          onClick={handleMarkComplete}
          disabled={completing}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
        >
          {completing ? "Marking..." : "Mark as Complete"}
        </button>
      )}
    </div>
  );
}

export default ActiveCourses;
