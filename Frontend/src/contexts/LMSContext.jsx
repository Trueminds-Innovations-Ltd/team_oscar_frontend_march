import { createContext } from "react";

const LMSContext = createContext();

function LMSProvider({ children }) {
  return <LMSContext.Provider value={{}}>{children}</LMSContext.Provider>;
}

// function useLMS() {
//   const context = useContext(LMSContext);
//   if (context === undefined)
//     throw new Error("LMSContext was used outside the LMSProvider");
//   return context;
// }

export { LMSProvider };
