import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { LMSProvider } from "./contexts/LMSContext";
import { CourseProvider } from "./contexts/CourseContext";
import LMSContext from "./contexts/LMSContext";
import SpinnerFullPage from "./features/Spinner/components/SpinnerFullPage";

const Login = lazy(() => import("./features/auth/pages/Login"));
const SignUp = lazy(() => import("./features/auth/pages/SignUp"));
const Onboarding = lazy(() => import("./features/onboarding/pages/Onboarding"));
const StudentDashboard = lazy(
  () => import("./features/student/pages/StudentDashboard"),
);
const TutorDashboard = lazy(
  () => import("./features/tutor/components/TutorDashboard"),
);
const FloatingAIChat = lazy(() => import("./shared/components/FloatingAIChat"));
const Courses = lazy(() => import("./features/courses/pages/Courses"));
const ActiveCourses = lazy(
  () => import("./features/activecourses/pages/ActiveCourses"),
);
const ProfileOverviewPage = lazy(
  () => import("./features/profile/pages/ProfileOverviewPage"),
);
const EditProfilePage = lazy(
  () => import("./features/profile/components/EditProfilePage"),
);
const MessagesPage = lazy(
  () => import("./features/messages/pages/MessagesPage"),
);

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerFullPage />
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
        <SpinnerFullPage />
      </div>
    );
  }

  const isTutor = user?.role === 2 || user?.roleName === "tutor";

  return (
    <>
      {isTutor ? <TutorDashboard /> : <StudentDashboard />}
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

function MessagesPageWrapper() {
  return <MessagesPage />;
}

function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes */}
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

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPageWrapper />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
