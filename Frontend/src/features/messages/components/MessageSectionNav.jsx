import React from "react";

import { MessageFolderIcon } from "./MessageIcons";

const MessageSectionNav = ({ items, activeId, onChange }) => {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-[#f7f8fe] p-3 shadow-[0_20px_40px_rgba(15,23,42,0.04)]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`inline-flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-[#2f4ba8] text-white shadow-[0_12px_24px_rgba(47,75,168,0.26)]"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isActive
                    ? "bg-white/18 text-white"
                    : "bg-white text-slate-500 shadow-sm"
                }`}
              >
                <MessageFolderIcon type={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessageSectionNav;
