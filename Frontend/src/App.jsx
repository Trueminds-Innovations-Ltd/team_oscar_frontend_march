import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LMSProvider } from "./contexts/LMSContext";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";

function App() {
  return (
    <div>
      <LMSProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </LMSProvider>
    </div>

    // <div>
    //   {/* <Dashboard /> */}
    //   {/* <Login /> */}
    //   {/* <SignUp /> */}
    // </div>
  );
}

export default App;
