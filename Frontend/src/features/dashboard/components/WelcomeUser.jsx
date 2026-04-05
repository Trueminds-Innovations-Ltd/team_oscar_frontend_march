import { useContext } from "react";
import LMSContext from "../../../contexts/LMSContext";

function WelcomeUser() {
  const { user, logout } = useContext(LMSContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <section className="min-w-0 flex justify-between items-start">
      <div>
        <h1 className="bean text-2xl font-extrabold sm:text-3xl lg:text-[35px] break-words">
          {getGreeting()}, {user?.name || "User"} <span>👋</span>
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
          {user?.roleName || user?.role === 1 ? "Student" : "Tutor"} | Level: {user?.levelName || "Beginner"}
        </p>
        <button
          onClick={handleLogout}
          className="mt-2 text-sm text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default WelcomeUser;
