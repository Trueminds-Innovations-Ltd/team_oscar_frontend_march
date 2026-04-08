import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LMSProvider } from "./contexts/LMSContext";
import { CourseProvider } from "./contexts/CourseContext";
import LMSContext from "./contexts/LMSContext";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Onboarding from "./features/onboarding/pages/Onboarding";
import StudentDashboard from "./features/student/pages/StudentDashboard";
import TutorDashboard from "./features/tutor/components/TutorDashboard";
import FloatingAIChat from "./shared/components/FloatingAIChat";
import Courses from "./features/courses/pages/Courses";
import ActiveCourses from "./features/activecourses/pages/ActiveCourses";
import ProfileOverviewPage from "./features/profile/pages/ProfileOverviewPage";
import EditProfilePage from "./features/profile/components/EditProfilePage";
import MessagesPage from "./features/messages-2/pages/MessagesPage";
import Dashboard from "./features/dashboard/pages/Dashboard";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function DashboardRouter() {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {user?.role === 2 ? <TutorDashboard /> : <StudentDashboard />}
      <FloatingAIChat />
    </>
  );
}

function CoursesPage() {
  return (
    <CourseProvider>
      <Courses />
    </CourseProvider>
  );
}

function ProfilePage() {
  return (
    <CourseProvider>
      <ProfileOverviewPage />
    </CourseProvider>
  );
}

function EditProfilePageWrapper() {
  return (
    <CourseProvider>
      <EditProfilePage />
    </CourseProvider>
  );
}

function ActiveCoursesPage() {
  return (
    <CourseProvider>
      <ActiveCourses />
    </CourseProvider>
  );
}

function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/message-page" element={<MessagesPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<ProfileOverviewPage />} /> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePageWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/active-courses"
            element={
              <ProtectedRoute>
                <ActiveCoursesPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
