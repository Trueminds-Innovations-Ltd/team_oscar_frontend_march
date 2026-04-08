import React, { useMemo, useState } from "react";

import { CheckIcon, SearchIcon } from "./MessageIcons";

const avatarGradients = {
  "from-zinc-900 to-zinc-700": "bg-gradient-to-br from-zinc-900 to-zinc-700",
  "from-amber-700 to-orange-500": "bg-gradient-to-br from-amber-700 to-orange-500",
  "from-orange-700 to-yellow-500": "bg-gradient-to-br from-orange-700 to-yellow-500",
  "from-cyan-700 to-teal-500": "bg-gradient-to-br from-cyan-700 to-teal-500",
};

const Avatar = ({ initials, tone }) => (
  <div
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm ${
      avatarGradients[tone] || "bg-gradient-to-br from-slate-800 to-slate-600"
    }`}
  >
    {initials}
  </div>
);

const MessageListPanel = ({
  tabs,
  activeTab,
  onTabChange,
  threads,
  activeThreadId,
  onSelect,
}) => {
  const [query, setQuery] = useState("");

  const filteredThreads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return threads.filter((thread) => {
      const matchesTab = thread.tab === activeTab;
      const matchesQuery =
        !normalizedQuery ||
        thread.name.toLowerCase().includes(normalizedQuery) ||
        thread.subtitle.toLowerCase().includes(normalizedQuery);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, query, threads]);

  return (
    <section className="flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200 px-4 py-5 sm:px-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Inbox</h2>

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

      <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 sm:px-3">
        {filteredThreads.map((thread) => {
          const isActive = thread.id === activeThreadId;

          return (
            <button
              key={thread.id}
              type="button"
              onClick={() => onSelect(thread.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                isActive ? "bg-[#c8f0e8]" : "hover:bg-slate-50"
              }`}
            >
              <Avatar initials={thread.avatar} tone={thread.avatarTone} />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{thread.name}</p>
                    <p className="truncate text-xs text-slate-500">{thread.subtitle}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] font-medium text-slate-500">{thread.time}</p>
                    {thread.unread ? (
                      <span className="ml-auto mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                    ) : null}
                    {!thread.unread && thread.delivered ? (
                      <span className="ml-auto mt-1 inline-flex text-emerald-600">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {filteredThreads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            No messages found.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MessageListPanel;
