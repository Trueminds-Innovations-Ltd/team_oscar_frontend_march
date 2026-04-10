import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useContext, useState, useEffect, lazy, Suspense } from "react";
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

function EmailConfirm() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("Confirming token:", token);
    fetch(
      `https://team-oscar-backend-march-8and.onrender.com/api/auth/confirm/${token}`,
    )
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMsg(data.message || "Unknown error");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setStatus("error");
        setErrorMsg(err.message);
      });
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === "loading" && <p>Confirming your email...</p>}
      {status === "success" && (
        <div className="text-center">
          <h2>Email Confirmed!</h2>
          <p>You can now login to your account.</p>
          <a href="/" className="text-blue-500 underline">
            Go to Login
          </a>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h2>Confirmation Failed</h2>
          <p>{errorMsg || "The confirmation link is invalid or expired."}</p>
          <a href="/" className="text-blue-500 underline">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(LMSContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerFullPage />
        {/* Loading... */}
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
        {/* Loading... */}
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
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/auth/confirm/:token" element={<EmailConfirm />} />
          <Route path="/onboarding" element={<Onboarding />} />

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

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
