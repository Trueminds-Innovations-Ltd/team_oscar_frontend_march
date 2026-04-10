import React, { useState, useEffect, useRef } from "react";
import api from "../../../shared/api";
import {
  MessageFolderIcon,
  PaperclipIcon,
  SendIcon,
  SmileyIcon,
} from "./MessageIcons";

const formatMessageTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[new Date(date).getDay()];
  }
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

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

const MessageBubble = ({ message, activeItem, variant, isOwn }) => {
  const bubbleWidth = bubbleSizeClasses.md;
  const baseBubble = isOwn
    ? "bg-[linear-gradient(135deg,rgba(155,173,236,0.95),rgba(125,146,220,0.96))] text-white"
    : "bg-[linear-gradient(135deg,rgba(178,239,230,0.98),rgba(143,229,215,0.98))] text-slate-700";

  return (
    <div
      className={`flex items-start gap-3 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      {!isOwn ? (
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
        className={`relative rounded-[18px] px-5 py-4 shadow-[0_14px_30px_rgba(148,163,184,0.24)] ${bubbleWidth} ${baseBubble}`}
      >
        <p className="relative z-10 text-sm leading-6">{message.content}</p>
        <p className={`text-[10px] mt-1 ${isOwn ? "text-white/60" : "text-slate-400"}`}>
          {formatMessageTime(message.timestamp)}
        </p>
      </div>

      {isOwn ? (
        <BubbleAvatar
          side="right"
          initials="ME"
          tone="bg-gradient-to-br from-amber-700 to-orange-500"
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

const MessageChatPanel = ({ variant, activeItem, refreshConversations }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeItem?.id && activeItem.id !== 'empty' && variant === 'inbox') {
      fetchMessages();
    }
  }, [activeItem?.id, variant]);

  useEffect(() => {
    if (variant === 'inbox' && activeItem?.id && activeItem.id !== 'empty') {
      const interval = setInterval(() => {
        fetchMessages();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeItem?.id, variant]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/conversations/${activeItem.id}?markRead=true`, token);
      
      const convData = response.conversation || response.data?.conversation || response;
      
      if (convData?.messages) {
        setMessages(convData.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await api.post(`/conversations/${activeItem.id}/messages`, {
        content: newMessage.trim()
      }, token);

      const sentMessage = response.message || response.data?.message;
      if (sentMessage) {
        setMessages(prev => [...prev, sentMessage]);
      }
      setNewMessage("");
      
      if (refreshConversations) {
        refreshConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const headerTitle =
    variant === "tickets"
      ? "Support"
      : variant === "flow-ai"
        ? "Flow Ai"
        : activeItem?.name || "Chat";

  const headerSubtitle =
    variant === "tickets"
      ? "Ticket conversation"
      : variant === "flow-ai"
        ? "AI Assistant"
        : activeItem?.subtitle || "Tutor";

  const isRealConversation = variant === 'inbox' && activeItem?.id && activeItem.id !== 'empty';

  return (
    <section className="flex h-[500px] flex-col rounded-[28px] border border-white/80 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
        <HeaderAvatar variant={variant} activeItem={activeItem} />
        <div>
          <p className="text-sm font-semibold text-slate-900">{headerTitle}</p>
          <p className="text-xs text-slate-500">{headerSubtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(189,245,237,0.22),rgba(255,255,255,0.96)_34%,rgba(226,232,240,0.82)_100%)] px-4 py-6 sm:px-5">
        <div className="space-y-4">
          {isRealConversation ? (
            loading ? (
              <div className="text-center text-slate-500">Loading messages...</div>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  activeItem={activeItem}
                  variant={variant}
                  isOwn={message.sender === 'me'}
                />
              ))
            ) : (
              <div className="text-center text-slate-500">
                {activeItem?.initialQuestion ? (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-slate-400 mb-1">Initial question:</p>
                    <p className="text-sm text-slate-700">{activeItem.initialQuestion}</p>
                  </div>
                ) : (
                  "No messages yet. Start the conversation!"
                )}
              </div>
            )
          ) : (
            activeItem?.messages?.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                activeItem={activeItem}
                variant={variant}
                isOwn={message.side === "right"}
              />
            ))
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
        <form onSubmit={sendMessage} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-3 py-3 shadow-inner">
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type Message"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            aria-label="Send message"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-[0_10px_18px_rgba(40,199,185,0.35)] transition ${
              newMessage.trim() 
                ? "bg-[#28c7b9] text-white hover:bg-[#1fb5a9]" 
                : "bg-slate-300 text-slate-500"
            }`}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </section>
  );
};

export default MessageChatPanel;