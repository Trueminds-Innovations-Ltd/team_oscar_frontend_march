import React from "react";
import { useNavigate } from "react-router-dom";

const fields = [
  { id: "lastName", label: "Last Name", value: "Wayne", type: "text" },
  { id: "firstName", label: "Other Names", value: "John Doe", type: "text" },
  {
    id: "email",
    label: "Email",
    value: "johndoe@gmail.com",
    type: "email",
    disabled: true,
  },
  { id: "country", label: "Country", value: "Nigeria", type: "text" },
  { id: "state", label: "State", value: "Lagos", type: "text" },
  { id: "city", label: "City", value: "Ajah", type: "text" },
];

const EditProfileForm = () => {
  const navigate = useNavigate();
  return (
    <section className="rounded-[32px] bg-[linear-gradient(180deg,#f8f8ff_0%,#f4f5ff_100%)] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#334155,#111827)] text-3xl font-semibold text-white shadow-lg sm:h-32 sm:w-32">
              JD
            </div>
            <button
              type="button"
              aria-label="Upload avatar"
              className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#f8f8ff] bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
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
        </div>

        <form className="mt-8 space-y-4 sm:mt-10">
          {fields.map((field) => (
            <label key={field.id} className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                {field.label}
              </span>
              <div className="relative">
                {field.type === "email" ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-slate-400 stroke-[1.8]"
                  >
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                ) : null}
                <input
                  type={field.type}
                  defaultValue={field.value}
                  disabled={field.disabled}
                  className={`h-14 w-full rounded-2xl border bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 ${
                    field.disabled
                      ? "border-slate-200 bg-slate-100 pl-12 text-slate-400"
                      : "border-slate-300"
                  }`}
                />
              </div>
            </label>
          ))}

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-primary-color bg-white px-8 text-sm font-semibold text-primary-color transition hover:bg-indigo-50"
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile");
              }}
            >
              Back To Home
            </button>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary-color px-8 text-sm font-semibold text-white transition hover:bg-indigo-900"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfileForm;
