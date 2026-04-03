import { RiHome6Line } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";

function Sidebar({ isMobileOpen = false, onClose = () => {} }) {
  const navItemClass = "text-[14px] text-slate-200 hover:font-semibold";

  return (
    <aside
      id="dashboard-sidebar"
      className={`fixed inset-y-0 left-0 z-40 h-dvh w-[250px] bg-[#213b97] px-5 pb-4 pt-8 text-[#c4cce7] transition-transform duration-300 ease-in-out lg:fixed lg:top-0 lg:z-auto lg:translate-x-0  ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full "
      }`}
    >
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-center text-[30px] font-bold leading-none text-white">
          Talent Flow
        </h1>

        <button
          type="button"
          onClick={onClose}
          className="top-4 rounded-md p-1 text-white hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <section className="mt-24">
        <p className="mb-4 text-[11px] uppercase tracking-[1.6px] text-[#a9b4da]">
          Learning
        </p>

        <section className="mb-3 flex items-center gap-3">
          <RiHome6Line className="text-[15px] text-[#e6ecff]" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Dashboard
          </a>
        </section>

        <section className="mb-3 flex items-center gap-3">
          <HiOutlineBookOpen className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Courses
          </a>
        </section>

        <section className="flex items-center gap-3">
          <GoPencil className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Assignment
          </a>
        </section>
      </section>

      <section className="mt-11">
        <p className="mb-4 text-[11px] uppercase tracking-[1.6px] text-[#a9b4da]">
          Community
        </p>

        <section className="mb-3 flex items-center gap-3">
          <MdPeopleOutline className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Collaboration
          </a>
        </section>

        <section className="flex items-center gap-3">
          <BiMessageSquareDetail className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Messages
          </a>
        </section>
      </section>

      <section className="mt-11">
        <p className="mb-4 text-[11px] uppercase tracking-[1.6px] text-[#a9b4da]">
          YOU
        </p>

        <section className="flex items-center gap-3">
          <BsBell className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Notifications
          </a>
        </section>
      </section>

      <section className="mt-15 space-y-3">
        <section className="flex items-center gap-3">
          <CgProfile className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Profile
          </a>
        </section>

        <section className="flex items-center gap-3">
          <SlSettings className="text-[15px] text-slate-200" />
          <a href="#" className={navItemClass} onClick={onClose}>
            Settings
          </a>
        </section>
      </section>
    </aside>
  );
}

export default Sidebar;
