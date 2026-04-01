import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="relative">
      <CiSearch
        size={24}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
      />
      <input
        placeholder="Search Courses, Lessons"
        type="text"
        className="w-[600px] rounded-3xl border border-gray-300  py-[9px] pl-11 pr-[10px] outline-none placeholder:text-sm bg-gray-100"
      />
    </div>
  );
}

export default SearchBar;
