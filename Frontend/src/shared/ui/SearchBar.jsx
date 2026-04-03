import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="relative">
      <CiSearch
        size={20}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        placeholder="Search Courses, Lessons"
        type="text"
        className="w-full rounded-3xl border border-gray-300 bg-gray-100 py-[9px] pl-10 pr-[10px] text-sm outline-none placeholder:text-sm"
      />
    </div>
  );
}

export default SearchBar;
