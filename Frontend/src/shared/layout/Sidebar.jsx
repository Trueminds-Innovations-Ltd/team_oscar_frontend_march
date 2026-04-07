import { RiHome6Line } from "react-icons/ri";
import { PiBookThin } from "react-icons/pi";
import { TbNotes } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { useNavigate, useLocation } from "react-router-dom";
import Image from "../ui/Image";

function Sidebar({ isMobileOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) =>
    `flex items-center gap-3 px-3 py-2 text-[14px] font-normal rounded-lg cursor-pointer transition ${
      isActive(path)
        ? "bg-[#2f4bb2] text-white font-semibold"
        : "text-[#213b97] hover:bg-white/10"
    }`;

  const iconClass = (path) =>
    `text-[20px] ${isActive(path) ? "text-white" : "text-[#213b97]"}`;

  // const handleNav = (path) => {
  //   navigate(path);
  //   onClose();
  //   // bg-[#213b97]
  // };

  return (
    <aside
      id="dashboard-sidebar"
      className={`fixed inset-y-0 left-0 z-40 h-dvh w-[250px] bg-white px-5 pb-4 pt-8 text-[#c4cce7] transition-transform duration-300  ease-in-out lg:fixed lg:top-0 lg:z-auto lg:translate-x-0  ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full "
      }`}
    >
      <div className="flex items-center justify-between gap-5">
        <div>
          <Image
            className="flex items-center justify-center"
            src="./images/logo.png"
            alt="logo"
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="top-4 rounded-md p-1 text-primary-color hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <section className="mt-18">
        <p className="mb-4 text-[12px] font-bold uppercase tracking-[1.6px] text-[#213b97]">
          Learning
        </p>

        <section
          className={`mb-3 flex items-center gap-3 ${navItemClass("/dashboard")}`}
        >
          <RiHome6Line className={iconClass("/dashboard")} />
          <a
            href="/dashboard"
            // className={navItemClass("/dashboard")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            Dashboard
          </a>
        </section>

        <section
          className={`mb-3 flex items-center gap-3 ${navItemClass("/courses")}`}
        >
          <PiBookThin className={iconClass("/courses")} />
          <a
            href="/courses"
            // className={navItemClass("/courses")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/courses");
            }}
          >
            Courses
          </a>
        </section>

        <section
          className={`mb-3 flex items-center gap-3 ${navItemClass("/assignments")}`}
        >
          <TbNotes className={iconClass("/assignments")} />
          <a
            href="#"
            // className={navItemClass("/assignments")}
            onClick={onClose}
          >
            Assignments
          </a>
        </section>

        <section className="mt-11">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[1.6px] text-[#213b97]">
            Community
          </p>

          <section
            className={`mb-3 flex items-center gap-3 ${navItemClass("/collaboration")}`}
          >
            <MdPeopleOutline className={iconClass("/collaboration")} />
            <a
              href="#"
              // className={navItemClass("/collaboration")}
              onClick={onClose}
            >
              Collaboration
            </a>
          </section>

          <section
            className={`mb-3 flex items-center gap-3 ${navItemClass("/messages")}`}
          >
            <BiMessageSquareDetail className={iconClass("/messages")} />
            <a href="#" onClick={onClose}>
              Messages
            </a>
          </section>
        </section>

        <section className="mt-11">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[1.6px] text-[#213b97]">
            YOU
          </p>

          <section
            className={`mb-3 flex items-center gap-3 ${navItemClass("/notifications")}`}
          >
            <BsBell className={iconClass("/notifications")} />
            <a
              href="#"
              // className={navItemClass("/notifications")}
              onClick={onClose}
            >
              Notifications
            </a>
          </section>
        </section>

        <section className="mt-15 space-y-3">
          <section
            className={`mb-3 flex items-center gap-3 ${navItemClass("/profile")}`}
          >
            <CgProfile className={iconClass("/profile")} />
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile");
              }}
            >
              Profile
            </a>
          </section>

          <section
            className={`mb-3 flex items-center gap-3 ${navItemClass("/settings")}`}
          >
            <SlSettings className={iconClass("/settings")} />
            <a href="#" onClick={onClose}>
              Settings
            </a>
          </section>
        </section>
      </section>
    </aside>
  );
}

export default Sidebar;
