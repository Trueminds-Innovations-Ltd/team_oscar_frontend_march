import SearchBar from "../ui/SearchBar";
import UserProfile from "../ui/UserProfile";

function NavBar() {
  return (
    <div className="w-full flex items-center justify-between h-[100px]  border-b border-b-gray-100 px-7 py-10 bg-white">
      <SearchBar />
      <UserProfile />
    </div>
  );
}

export default NavBar;
