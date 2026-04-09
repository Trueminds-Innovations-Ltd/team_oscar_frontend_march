import React from "react";

import {
  MessageFolderIcon,
  PaperclipIcon,
  SendIcon,
  SmileyIcon,
} from "./MessageIcons";

const bubbleSizeClasses = {
  sm: "w-[44%] min-w-[140px] max-sm:w-[82%]",
  md: "w-[58%] min-w-[180px] max-sm:w-[84%]",
  lg: "w-[72%] min-w-[220px] max-sm:w-[88%]",
  xl: "w-[68%] min-w-[220px] max-sm:w-[88%]",
};

const BubbleAvatar = ({ side, initials, tone }) => (
  <div
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-sm ${
      tone || "bg-gradient-to-br from-slate-700 to-slate-500"
    } ${side === "right" ? "order-2" : ""}`}
  >
    {initials}
  </div>
);

const MessageBubble = ({ message, activeItem, variant }) => {
  const isRight = message.side === "right";
  const bubbleWidth = bubbleSizeClasses[message.size] || bubbleSizeClasses.lg;
  const baseBubble =
    message.tone === "mint"
      ? "bg-[linear-gradient(135deg,rgba(178,239,230,0.98),rgba(143,229,215,0.98))] text-slate-700"
      : "bg-[linear-gradient(135deg,rgba(155,173,236,0.95),rgba(125,146,220,0.96))] text-white";

  return (
    <div
      className={`flex items-start gap-3 ${isRight ? "justify-end" : "justify-start"}`}
    >
      {!isRight ? (
        <BubbleAvatar
          side="left"
          initials={activeItem.avatar || "TF"}
          tone={
            variant === "flow-ai"
              ? "bg-gradient-to-br from-[#2f4ba8] to-[#7b92dd]"
              : `bg-gradient-to-br ${activeItem.avatarTone || "from-slate-700 to-slate-500"}`
          }
        />
      ) : null}

      <div
        className={`relative rounded-[18px] px-5 py-4 shadow-[0_14px_30px_rgba(148,163,184,0.24)] ${bubbleWidth} ${baseBubble} ${
          message.size === "xl" ? "flex items-start" : ""
        }`}
      >
        {message.quote ? (
          <div className="relative z-10 mb-2 rounded-xl bg-[rgba(124,110,223,0.28)] px-4 py-3 text-sm text-slate-100 shadow-inner">
            {message.text}
          </div>
        ) : (
          <p className="relative z-10 text-sm leading-6">{message.text}</p>
        )}

        {message.overlay ? (
          <div className="absolute inset-x-3 top-3 h-[44px] rounded-2xl bg-[linear-gradient(135deg,rgba(150,239,225,0.95),rgba(133,220,212,0.95))] opacity-90" />
        ) : null}
      </div>

      {isRight ? (
        <BubbleAvatar
          side="right"
          initials={
            variant === "tickets" ? "SP" : variant === "flow-ai" ? "OB" : "TJ"
          }
          tone="bg-gradient-to-br from-slate-900 to-slate-700"
        />
      ) : null}
    </div>
  );
};

const HeaderAvatar = ({ variant, activeItem }) => {
  if (variant === "tickets") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f4ba8] text-white shadow-sm">
        <MessageFolderIcon type="ticket" className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm ${
        variant === "flow-ai"
          ? "bg-gradient-to-br from-[#2f4ba8] to-[#7b92dd]"
          : `bg-gradient-to-br ${activeItem.avatarTone || "from-amber-700 to-orange-500"}`
      }`}
    >
      {activeItem.avatar || "TJ"}
    </div>
  );
};

const MessageChatPanel = ({ variant, activeItem }) => {
  const headerTitle =
    variant === "tickets"
      ? "Support"
      : variant === "flow-ai"
        ? "Flow Ai"
        : activeItem.name;
  const headerSubtitle =
    variant === "tickets"
      ? "Ticket conversation"
      : variant === "flow-ai"
        ? "AI Assistant"
        : activeItem.role || "Tutor";

  return (
    <section className="flex min-h-[560px] flex-col rounded-[28px] border border-white/80 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
        <HeaderAvatar variant={variant} activeItem={activeItem} />
        <div>
          <p className="text-sm font-semibold text-slate-900">{headerTitle}</p>
          <p className="text-xs text-slate-500">{headerSubtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(189,245,237,0.22),rgba(255,255,255,0.96)_34%,rgba(226,232,240,0.82)_100%)] px-4 py-6 sm:px-5">
        <div className="space-y-4">
          {activeItem.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              activeItem={activeItem}
              variant={variant}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-3 py-3 shadow-inner">
          <button
            type="button"
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Attach file"
          >
            <PaperclipIcon />
          </button>
          <button
            type="button"
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Add emoji"
          >
            <SmileyIcon />
          </button>
          <input
            type="text"
            placeholder="Type Message"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#28c7b9] text-white shadow-[0_10px_18px_rgba(40,199,185,0.35)] transition hover:bg-[#1fb5a9]"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessageChatPanel;