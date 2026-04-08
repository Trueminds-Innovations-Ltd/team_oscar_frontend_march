import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LMSContext from "../../../contexts/LMSContext";
import api from "../../../shared/api";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { user, token, fetchUser } = useContext(LMSContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    state: "",
    city: ""
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/auth/profile', formData, token);
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        fetchUser();
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section className="rounded-[32px] bg-[linear-gradient(180deg,#f8f8ff_0%,#f4f5ff_100%)] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#334155,#111827)] text-3xl font-semibold text-white shadow-lg sm:h-32 sm:w-32">
              {getInitials(formData.name)}
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

        <form className="mt-8 space-y-4 sm:mt-10" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`rounded-lg p-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {message.text}
            </div>
          )}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-slate-400 stroke-[1.8]"
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 pl-12 text-base text-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="+2348162345678"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Nigeria"
              />
            </div>
            <div>
              <label htmlFor="state" className="mb-2 block text-sm font-medium text-slate-700">
                State
              </label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Lagos"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Ajah"
            />
          </div>

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
              disabled={loading}
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary-color px-8 text-sm font-semibold text-white transition hover:bg-indigo-900 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfileForm;