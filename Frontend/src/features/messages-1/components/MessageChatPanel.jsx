import React from "react";

import { PaperclipIcon, SendIcon, SmileyIcon } from "./MessageIcons";

const bubbleWidths = {
  sm: "w-[40%] min-w-[140px] max-sm:w-[78%]",
  md: "w-[52%] min-w-[170px] max-sm:w-[82%]",
  lg: "w-[62%] min-w-[220px] max-sm:w-[86%]",
  xl: "w-[70%] min-w-[240px] max-sm:w-[90%]",
};

const BubbleAvatar = ({ side, initials, tone }) => (
  <div
    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white shadow-sm ${
      tone || "bg-linear-to-br from-slate-700 to-slate-500"
    } ${side === "right" ? "order-2" : ""}`}
  >
    {initials}
  </div>
);

const MessageBubble = ({ message, profile }) => {
  const isRight = message.side === "right";
  const widthClass = bubbleWidths[message.size] || bubbleWidths.lg;
  const bubbleTone =
    message.tone === "mint"
      ? "bg-[linear-gradient(130deg,rgba(165,241,227,0.96),rgba(122,225,213,0.96))] text-slate-700"
      : "bg-[linear-gradient(130deg,rgba(158,176,238,0.95),rgba(124,147,224,0.95))] text-white";

  return (
    <div className={`flex items-start gap-2.5 ${isRight ? "justify-end" : "justify-start"}`}>
      {!isRight ? (
        <BubbleAvatar
          side="left"
          initials={profile.avatar || "TF"}
          tone={`bg-gradient-to-br ${profile.avatarTone || "from-slate-700 to-slate-500"}`}
        />
      ) : null}

      <div
        className={`relative rounded-2xl px-4 py-3 shadow-[0_12px_26px_rgba(148,163,184,0.23)] ${widthClass} ${bubbleTone}`}
      >
        <p className="relative z-10 text-sm leading-6">{message.text}</p>
        {message.overlay ? (
          <div className="pointer-events-none absolute inset-x-3 top-2 h-10 rounded-xl bg-[linear-gradient(130deg,rgba(167,246,232,0.82),rgba(137,231,219,0.72))]" />
        ) : null}
      </div>

      {isRight ? (
        <BubbleAvatar side="right" initials="OB" tone="bg-gradient-to-br from-zinc-900 to-zinc-700" />
      ) : null}
    </div>
  );
};

const HeaderAvatar = ({ profile, isFlowAi }) => (
  <div
    className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm ${
      isFlowAi
        ? "bg-linear-to-br from-[#2f4ba8] to-[#7b92dd]"
        : `bg-linear-to-br ${profile.avatarTone || "from-slate-700 to-slate-500"}`
    }`}
  >
    {profile.avatar || "TF"}
  </div>
);

const MessageChatPanel = ({ folder, inboxThread, flowAiThread }) => {
  const isFlowAi = folder === "flow-ai";
  const activeProfile = isFlowAi ? flowAiThread : inboxThread;

  return (
    <section className="flex min-h-140 flex-col overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
        <HeaderAvatar profile={activeProfile} isFlowAi={isFlowAi} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{activeProfile.name}</p>
          <p className="truncate text-xs text-slate-500">{activeProfile.role}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(249,251,255,1)_0%,rgba(245,252,250,1)_100%)] px-3 py-5 sm:px-5">
        <div className="space-y-4">
          {activeProfile.messages.map((message) => (
            <MessageBubble key={message.id} message={message} profile={activeProfile} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-3 py-3 sm:px-5">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2.5 shadow-inner">
          <button
            type="button"
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Attach file"
          >
            <PaperclipIcon className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Add emoji"
          >
            <SmileyIcon className="h-4.5 w-4.5" />
          </button>
          <input
            type="text"
            placeholder="Type Message"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#23c7b7] text-white shadow-[0_8px_16px_rgba(35,199,183,0.35)] transition hover:bg-[#1cae9f]"
          >
            <SendIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessageChatPanel;
