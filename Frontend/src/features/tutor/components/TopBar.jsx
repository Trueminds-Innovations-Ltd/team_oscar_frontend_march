import SearchBar from "../../../shared/ui/SearchBar";
import UserProfile from "../../../shared/ui/UserProfile";
import { FiMenu } from "react-icons/fi";

const TopBar = ({ onOpenSidebar = () => {}, isSidebarOpen = false }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-b-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="flex min-h-[72px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-7">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-md border border-gray-200 p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
          aria-expanded={isSidebarOpen}
          aria-controls="dashboard-sidebar"
        >
          <FiMenu size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <UserProfile />
      </div>
    </header>
  );
};

export default TopBar;
