import React, { useMemo, useState, useEffect } from "react";
import api from "../../../shared/api";
import MessageChatPanel from "../components/MessageChatPanel";
import MessageListPanel from "../components/MessageListPanel";
import MessageSectionNav from "../components/MessageSectionNav";
import MessagesShell from "../components/MessagesShell";
import {
  flowAiThread,
  inboxTabs,
  messageFolders,
  supportTickets,
  tutorChats,
} from "../data/messagesData";

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

const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeTab, setActiveTab] = useState("direct");
  const [activeInboxId, setActiveInboxId] = useState(null);
  const [activeTutorChatId, setActiveTutorChatId] = useState("tylor-james");
  const [activeSupportTicketId, setActiveSupportTicketId] = useState("quiz-scoring");
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeFolder === 'inbox') {
      fetchConversations();
      const interval = setInterval(() => {
        fetchConversations();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeFolder, activeTab]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/conversations', token);
      
      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response.data && Array.isArray(response.data)) {
        data = response.data;
      }
      
      setConversations(data);
      if (data.length > 0 && !activeInboxId) {
        setActiveInboxId(data[0].id);
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibleInboxThreads = useMemo(
    () => conversations.filter((thread) => thread.tab === activeTab || !thread.tab),
    [activeTab, conversations],
  );

  const activeInboxThread = useMemo(() => {
    if (!activeInboxId && !selectedConversation) return null;
    if (selectedConversation) return selectedConversation;
    const currentThread = conversations.find((thread) => thread.id === activeInboxId);
    return currentThread || null;
  }, [activeInboxId, activeTab, visibleInboxThreads, conversations, selectedConversation]);

  const activeTutorChat = useMemo(
    () =>
      tutorChats.find((chat) => chat.id === activeTutorChatId) || tutorChats[0],
    [activeTutorChatId],
  );

  const activeSupportTicket = useMemo(
    () =>
      supportTickets.find((ticket) => ticket.id === activeSupportTicketId) ||
      supportTickets[0],
    [activeSupportTicketId],
  );

  const currentVariant =
    activeFolder === "inbox"
      ? "inbox"
      : activeFolder === "flow-ai"
        ? "flow-ai"
        : activeFolder === "support-ticket"
          ? "tickets"
          : "tutor";

  const handleConversationSelect = async (convId) => {
    setActiveInboxId(convId);
    const conv = conversations.find(c => c.id === convId);
    setSelectedConversation(conv);
  };

  const activeItem = useMemo(() => {
    if (currentVariant === "inbox") {
      return selectedConversation || activeInboxThread || {
        id: 'empty',
        name: 'No conversations',
        avatar: '?',
        avatarTone: 'from-slate-900 to-slate-700',
        subtitle: 'Start a conversation with a tutor',
        preview: 'No messages yet',
        time: '',
        unread: false,
        messages: []
      };
    }
    if (currentVariant === "flow-ai") return flowAiThread;
    if (currentVariant === "tickets") return activeSupportTicket;
    return activeTutorChat;
  }, [currentVariant, selectedConversation, activeInboxThread, activeSupportTicket, activeTutorChat]);

  const inboxItems = conversations.map(conv => ({
    id: conv.id,
    name: conv.name,
    avatar: conv.avatar,
    avatarTone: conv.avatarTone,
    subtitle: conv.subtitle || conv.program,
    preview: conv.preview,
    time: formatRelativeTime(conv.time),
    unread: conv.unread,
    delivered: false,
    tab: conv.tab || 'direct'
  }));

  return (
    <MessagesShell>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Messages
      </h1>

      <div className="w-full max-w-full overflow-x-auto">
        <div
          className={` grid gap-4 overflow-auto touch-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-[160px_minmax(320px,420px)_minmax(0,1fr)] 2xl:grid-cols-[170px_minmax(340px,430px)_minmax(0,1fr)]`}
        >
          <MessageSectionNav
            className="hidden xl:block"
            items={messageFolders}
            activeId={activeFolder}
            onChange={setActiveFolder}
          />

          {currentVariant === "inbox" ? (
            <MessageListPanel
              className="hidden md:block xl:block"
              variant="inbox"
              tabs={inboxTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              items={inboxItems}
              activeItemId={activeInboxId || activeInboxThread?.id}
              onSelect={handleConversationSelect}
            />
          ) : null}

          {currentVariant === "tutor" || currentVariant === "tickets" ? (
            <MessageListPanel
              title={
                currentVariant === "tickets" ? "Support Tickets" : "Tutor Chat"
              }
              buttonLabel={
                currentVariant === "tickets" ? "Create Ticket" : "Request Tutor"
              }
              variant={currentVariant}
              items={currentVariant === "tickets" ? supportTickets : tutorChats}
              activeItemId={
                currentVariant === "tickets"
                  ? activeSupportTicketId
                  : activeTutorChatId
              }
              onSelect={
                currentVariant === "tickets"
                  ? setActiveSupportTicketId
                  : setActiveTutorChatId
              }
            />
          ) : null}

          <MessageChatPanel 
            variant={currentVariant} 
            activeItem={activeItem}
            refreshConversations={fetchConversations}
          />
        </div>
      </div>
    </MessagesShell>
  );
};

export default MessagesPage;