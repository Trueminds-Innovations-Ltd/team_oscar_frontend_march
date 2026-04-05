import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LMSProvider } from "./contexts/LMSContext";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Onboarding from "./features/onboarding/pages/Onboarding";

function App() {
  return (
    <div>
      <LMSProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </BrowserRouter>
      </LMSProvider>
    </div>

  );
}

export default App;
