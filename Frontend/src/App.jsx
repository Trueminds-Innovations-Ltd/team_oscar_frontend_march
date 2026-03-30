import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LMSProvider } from "./contexts/LMSContext";

function App() {
  return (
    <div>
      <LMSProvider>
        <BrowserRouter>
          <Routes>
            <Route />
          </Routes>
        </BrowserRouter>
      </LMSProvider>
    </div>
  );
}

export default App;
