import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LMSProvider } from "./contexts/LMSContext";
import LMSContext from "./contexts/LMSContext";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Onboarding from "./features/onboarding/pages/Onboarding";
import StudentDashboard from "./features/student/pages/StudentDashboard";
import TutorDashboard from "./features/tutor/pages/TutorDashboard";
import FloatingAIChat from "./shared/components/FloatingAIChat";
import ActiveCourses from "./features/activecourses/pages/ActiveCourses";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Courses from "./features/courses/pages/Courses";
import ProfileOverviewPage from "./features/profile/pages/ProfileOverviewPage";
import EditProfilePage from "./features/profile/components/EditProfilePage";

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

function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutorDashboard" element={<TutorDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/active-courses" element={<ActiveCourses />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<ProfileOverviewPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/" element={<StudentDashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
