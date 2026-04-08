import React from "react";

import { MessageFolderIcon } from "./MessageIcons";

const MessageSectionNav = ({ items, activeId, onChange }) => {
  return (
    <aside className="rounded-[26px] border border-slate-200/80 bg-[#f6f7fe] p-3 shadow-[0_18px_36px_rgba(15,23,42,0.05)]">
      <div className="flex gap-2 overflow-x-auto xl:flex-col xl:overflow-visible">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`inline-flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-[#2846a0] text-white shadow-[0_12px_22px_rgba(40,70,160,0.3)]"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-white text-slate-500 shadow-sm"
                }`}
              >
                <MessageFolderIcon type={item.icon} />
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default MessageSectionNav;
