import { useState, useEffect } from "react";

export default function useSidebarOpen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return [isSidebarOpen, setIsSidebarOpen];
}
