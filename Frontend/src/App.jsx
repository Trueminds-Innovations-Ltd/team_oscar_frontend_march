import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LMSProvider } from "./contexts/LMSContext";
import LMSContext from "./contexts/LMSContext";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import StudentDashboard from "./features/student/pages/StudentDashboard";
import TutorDashboard from "./features/tutor/pages/TutorDashboard";

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

  if (user?.role === 2) {
    return <TutorDashboard />;
  }

  return <StudentDashboard />;
}

function AppRoutes() {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/sign-up" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
