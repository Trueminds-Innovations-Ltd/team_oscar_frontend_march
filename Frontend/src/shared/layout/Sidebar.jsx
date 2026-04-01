import { RiHome6Line } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";

function Sidebar() {
  return (
    <aside className="mr-auto h-dvh w-[250px] rounded-r-[18px] bg-[#213b97] px-5 pb-4 pt-8 text-[#c4cce7] sticky top-0">
      <h1 className="text-center text-[30px] font-bold leading-none text-white">
        Talent Flow
      </h1>

      <section className="mt-24">
        <p className="mb-4 text-[11px] uppercase tracking-[1.6px] text-[#a9b4da]">
          Learning
        </p>

        <section className="mb-3 flex items-center gap-3">
          <RiHome6Line className="text-[15px] text-[#e6ecff]" />
          <a
            href="#"
            className="text-[14px] hover:font-semibold text-slate-200"
          >
            Dashboard
          </a>
        </section>

        <section className="mb-3 flex items-center gap-3">
          <HiOutlineBookOpen className="text-[15px] text-slate-200" />
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
            Courses
          </a>
        </section>

        <section className="flex items-center gap-3">
          <GoPencil className="text-[15px] text-slate-200" />
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
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
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
            Collaboration
          </a>
        </section>

        <section className="flex items-center gap-3">
          <BiMessageSquareDetail className="text-[15px] text-slate-200" />
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
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
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
            Notifications
          </a>
        </section>
      </section>

      <section className="mt-15 space-y-3">
        <section className="flex items-center gap-3">
          <CgProfile className="text-[15px] text-slate-200" />
          <a
            href="#"
            className="text-[14px]  text-slate-200 hover:font-semibold"
          >
            Profile
          </a>
        </section>

        <section className="flex items-center gap-3">
          <SlSettings className="text-[15px] text-slate-200" />
          <a
            href="#"
            className="text-[14px] text-slate-200 hover:font-semibold"
          >
            Settings
          </a>
        </section>
      </section>
    </aside>
  );
}

export default Sidebar;
