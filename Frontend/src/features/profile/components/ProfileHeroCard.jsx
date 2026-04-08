import React from "react";
import Image from "../../../shared/ui/Image";

const SocialIcon = ({ label }) => {
  const icons = {
    WhatsApp: (
      <path d="M12 3a8.5 8.5 0 0 0-7.38 12.72L4 21l5.42-1.58A8.5 8.5 0 1 0 12 3Zm4.89 12.14c-.2.55-1.15 1.05-1.58 1.12-.41.07-.93.1-1.5-.08-.35-.11-.8-.27-1.38-.52-2.43-1.06-4-3.64-4.12-3.8-.11-.15-.98-1.31-.98-2.5s.62-1.77.84-2.01c.22-.25.49-.31.66-.31h.48c.15 0 .35-.06.55.42.2.47.68 1.63.74 1.75.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.31-.37.42-.12.12-.24.25-.1.49.14.23.63 1.04 1.34 1.68.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.16.61-.71.77-.95.17-.24.33-.2.56-.12.23.08 1.44.68 1.69.81.24.12.41.18.47.28.06.1.06.58-.14 1.13Z" />
    ),
    Instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle
          cx="17.25"
          cy="6.75"
          r="1"
          className="fill-current stroke-none"
        />
      </>
    ),
    LinkedIn: (
      <>
        <path d="M7.2 8.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm-1.1 2h2.2v7.2H6.1v-7.2Zm4 0h2.1v1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.5 2.9 3.5v3.9h-2.2V14c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9v3.6H10V10.3Z" />
      </>
    ),
    X: (
      <path d="M4 4h3.5l4.04 5.42L16.2 4H20l-6.64 7.53L20 20h-3.5l-4.31-5.78L7.06 20H4l6.86-7.78L4 4Z" />
    ),
  };

  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-300 hover:text-sky-600"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.7]"
      >
        {icons[label]}
      </svg>
    </a>
  );
};

const ProfileHeroCard = ({ user }) => {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80">
      <div className="relative h-40 sm:h-52 lg:h-64">
        <div>
          <Image src="./images/coverphoto.png" alt="coverphoto" />
        </div>
      </div>

      <div className="relative px-5 pb-8 sm:px-8 lg:px-12">
        <div className="-mt-16 flex flex-col items-center sm:-mt-20">
          <div className="relative">
            <div>
              <Image className="w-30" src="./images/dp.png" alt="dp" />
            </div>
            {/* <div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-white bg-[radial-gradient(circle_at_top,#334155,#111827)] text-3xl font-semibold text-white shadow-xl sm:h-32 sm:w-32">
              JD
            </div> */}
            <button
              type="button"
              aria-label="Update profile photo"
              className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-700 shadow-md transition hover:bg-slate-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current stroke-[1.8]"
              >
                <path d="M4 8a2 2 0 0 1 2-2h2l1.4-1.8A2 2 0 0 1 11 3h2a2 2 0 0 1 1.6.8L16 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
            </button>
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {user.fullName}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
              {user.role}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              {user.bio}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {user.socials.map((social) => (
              <SocialIcon key={social.label} label={social.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeroCard;
