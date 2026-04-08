import React, { useMemo, useState } from "react";

import { CheckIcon, MessageFolderIcon, SearchIcon } from "./MessageIcons";

const statusClasses = {
  Ongoing: "border-sky-200 bg-sky-50 text-[#2f4ba8]",
  Pending: "border-amber-200 bg-amber-50 text-amber-600",
  Resolved: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

const avatarBgClasses = {
  "from-slate-900 to-slate-700":
    "bg-gradient-to-br from-slate-900 to-slate-700",
  "from-amber-700 to-orange-500":
    "bg-gradient-to-br from-amber-700 to-orange-500",
  "from-orange-700 to-yellow-500":
    "bg-gradient-to-br from-orange-700 to-yellow-500",
  "from-rose-700 to-pink-500": "bg-gradient-to-br from-rose-700 to-pink-500",
  "from-fuchsia-700 to-violet-500":
    "bg-gradient-to-br from-fuchsia-700 to-violet-500",
  "from-lime-700 to-emerald-500":
    "bg-gradient-to-br from-lime-700 to-emerald-500",
  "from-zinc-900 to-zinc-700": "bg-gradient-to-br from-zinc-900 to-zinc-700",
  "from-cyan-700 to-teal-500": "bg-gradient-to-br from-cyan-700 to-teal-500",
};

const Avatar = ({ initials, tone }) => (
  <div
    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm ${
      avatarBgClasses[tone] || "bg-gradient-to-br from-slate-700 to-slate-500"
    }`}
  >
    {initials}
  </div>
);

const TicketLeadingIcon = () => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2f4ba8] text-white shadow-sm">
    <MessageFolderIcon type="ticket" />
  </div>
);

const TutorListItem = ({ item, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
      active ? "bg-[#bfeee8]" : "hover:bg-slate-50"
    }`}
  >
    <Avatar initials={item.avatar} tone={item.avatarTone} />
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {item.name}
          </p>
          <p className="truncate text-xs text-slate-500">{item.preview}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium text-slate-500">{item.time}</p>
          {item.unread ? (
            <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-red-500" />
          ) : item.delivered ? (
            <span className="mt-1 inline-flex items-center justify-end text-emerald-600">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  </button>
);

const TicketListItem = ({ item, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
      active ? "bg-[#bfeee8]" : "hover:bg-slate-50"
    }`}
  >
    <TicketLeadingIcon />
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {item.subject}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusClasses[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        </div>
        <p className="shrink-0 text-[11px] font-medium text-slate-500">
          {item.time}
        </p>
      </div>
    </div>
  </button>
);

const InboxListItem = ({ item, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
      active ? "bg-[#c8f0e8]" : "hover:bg-slate-50"
    }`}
  >
    <Avatar initials={item.avatar} tone={item.avatarTone} />
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {item.name}
          </p>
          <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] font-medium text-slate-500">{item.time}</p>
          {item.unread ? (
            <span className="ml-auto mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          ) : item.delivered ? (
            <span className="ml-auto mt-1 inline-flex text-emerald-600">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  </button>
);

const MessageListPanel = ({
  title,
  buttonLabel,
  variant,
  items,
  activeItemId,
  onSelect,
  tabs = [],
  activeTab,
  onTabChange = () => {},
}) => {
  const [query, setQuery] = useState("");

  const filteredInboxItems = useMemo(() => {
    if (variant !== "inbox") return items;
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTab = item.tab === activeTab;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.subtitle.toLowerCase().includes(normalizedQuery);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, items, query, variant]);

  const listToRender = variant === "inbox" ? filteredInboxItems : items;

  return (
    <section className="flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
      {variant === "inbox" ? (
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Inbox
          </h2>
          <div className="mt-4 flex items-center gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#2f4ba8] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <label className="mt-4 flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-400 focus-within:border-[#2f4ba8] focus-within:bg-white">
            <SearchIcon className="h-4 w-4" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search messages"
              className="w-full min-w-0 border-none bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>
      ) : (
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2f4ba8] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(47,75,168,0.22)] transition hover:bg-[#263f92]"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4 sm:px-4">
        {listToRender.map((item) =>
          variant === "tickets" ? (
            <TicketListItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              onClick={() => onSelect(item.id)}
            />
          ) : variant === "inbox" ? (
            <InboxListItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              onClick={() => onSelect(item.id)}
            />
          ) : (
            <TutorListItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              onClick={() => onSelect(item.id)}
            />
          ),
        )}

        {variant === "inbox" && listToRender.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            No messages found.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MessageListPanel;
