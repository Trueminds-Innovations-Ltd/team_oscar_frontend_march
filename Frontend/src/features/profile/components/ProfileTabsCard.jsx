import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../../contexts/CourseContext";

const tabs = (isTutor) => [
  { id: "personalInformation", label: "Personal Information" },
  { id: "learningPreferences", label: "Learning Preferences" },
  ...(isTutor ? [] : [{ id: "achievements", label: "Achievements" }]),
];

const AchievementCard = ({ item }) => {
  const palette = useMemo(() => {
    if (item.theme === "teal") {
      return {
        surface: "bg-teal-50",
        border: "border-teal-100",
        icon: "text-teal-500",
        primary: "bg-primary-color hover:bg-teal-600",
        secondary: "border-teal-300 text-teal-500 hover:bg-teal-100",
      };
    }

    return {
      surface: "bg-indigo-50",
      border: "border-indigo-100",
      icon: "text-indigo-500",
      primary: "bg-indigo-800 hover:bg-indigo-900",
      secondary: "border-indigo-300 text-indigo-600 hover:bg-indigo-100",
    };
  }, [item.theme]);

  return (
    <article
      className={`rounded-2xl border p-4 shadow-sm ${palette.surface} ${palette.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-5 text-slate-700">
            {item.title}
          </h4>
          <p className="mt-1 text-xs text-slate-500">{item.academy}</p>
          <p className="mt-4 text-xs font-medium text-slate-500">
            {item.completedOn}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {item.grade}
          </p>
        </div>

        <svg
          viewBox="0 0 24 24"
          className={`h-6 w-6 flex-shrink-0 fill-none stroke-current stroke-[1.8] ${palette.icon}`}
        >
          <path d="M14 3h4a2 2 0 0 1 2 2v4" />
          <path d="M10 14 21 3" />
          <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          <path d="M7 12h4v5" />
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-xs font-semibold text-white transition ${palette.primary}`}
        >
          Share
        </button>
        <button
          type="button"
          className={`rounded-full border bg-white px-4 py-2 text-xs font-semibold transition ${palette.secondary}`}
        >
          Download
        </button>
      </div>
    </article>
  );
};

const InfoGrid = ({ items }) => (
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {items.map((item) => (
      <div
        key={item.label}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p className="text-sm font-medium text-slate-500">{item.label}</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          {item.value}
        </p>
      </div>
    ))}
  </div>
);

const EnrolledCoursesCard = ({ course }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">Program</p>
    <p className="mt-2 text-lg font-semibold text-slate-900">{course.program}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {course.subTopics.map((subTopic, idx) => (
        <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
          {subTopic}
        </span>
      ))}
    </div>
    <p className="mt-2 text-xs text-slate-500">{course.value}</p>
  </div>
);

const ProfileTabsCard = ({ sections, showEditButton = false, isTutor = false }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personalInformation");

  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80">
      <div className="border-b border-slate-200 px-4 sm:px-8">
        <div className="flex flex-wrap gap-4 sm:gap-8">
          {tabs(isTutor).map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 py-4 text-sm font-semibold transition sm:text-base ${
                  isActive
                    ? "border-amber-400 text-indigo-900"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8">
        {activeTab === "achievements" ? (
          sections.achievements && sections.achievements.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {sections.achievements.map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-4">No achievements yet. Complete study sessions to earn achievements!</p>
          )
        ) : activeTab === "learningPreferences" ? (
          <div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sections.learningPreferences && sections.learningPreferences.map((course, index) => (
                <EnrolledCoursesCard key={index} course={course} />
              ))}
              {(!sections.learningPreferences || sections.learningPreferences.length === 0) && (
                <p className="text-gray-500 py-4">No courses enrolled yet.</p>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/onboarding")}
                className="inline-flex items-center justify-center rounded-full bg-primary-color px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-900"
              >
                + Add More Courses
              </button>
            </div>
          </div>
        ) : (
          <InfoGrid items={sections[activeTab]} />
        )}

        {showEditButton && activeTab === "personalInformation" ? (
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/edit-profile");
              }}
              className="inline-flex min-w-[124px] items-center justify-center rounded-full bg-primary-color px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-900"
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProfileTabsCard;