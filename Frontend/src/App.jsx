import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LMSProvider } from "./contexts/LMSContext";
import SearchBar from "./shared/ui/SearchBar";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    // <div>
    //   <LMSProvider>
    //     <BrowserRouter>
    //       <Routes>
    //         {/* <Route /> */}
    //       </Routes>
    //     </BrowserRouter>
    //   </LMSProvider>
    // </div>

    <div>
      <Dashboard />
    </div>
  );
}

export default App;
