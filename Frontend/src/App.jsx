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

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function DashboardRouter() {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
