import React, { useMemo, useState } from "react";

import MessageChatPanel from "../components/MessageChatPanel";
import MessageListPanel from "../components/MessageListPanel";
import MessageSectionNav from "../components/MessageSectionNav";
import MessagesShell from "../components/MessagesShell";
import {
  flowAiThread,
  inboxTabs,
  inboxThreads,
  messageFolders,
  supportTickets,
  tutorChats,
} from "../data/messagesData";

const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeTab, setActiveTab] = useState("direct");
  const [activeInboxId, setActiveInboxId] = useState("tylor-james");
  const [activeTutorChatId, setActiveTutorChatId] = useState("tylor-james");
  const [activeSupportTicketId, setActiveSupportTicketId] =
    useState("quiz-scoring");

  const visibleInboxThreads = useMemo(
    () => inboxThreads.filter((thread) => thread.tab === activeTab),
    [activeTab],
  );

  const activeInboxThread = useMemo(() => {
    const currentThread = inboxThreads.find(
      (thread) => thread.id === activeInboxId,
    );
    if (currentThread && currentThread.tab === activeTab) return currentThread;
    return visibleInboxThreads[0] || inboxThreads[0];
  }, [activeInboxId, activeTab, visibleInboxThreads]);

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

  const activeItem =
    currentVariant === "inbox"
      ? activeInboxThread
      : currentVariant === "flow-ai"
        ? flowAiThread
        : currentVariant === "tickets"
          ? activeSupportTicket
          : activeTutorChat;

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
              items={inboxThreads}
              activeItemId={activeInboxThread.id}
              onSelect={setActiveInboxId}
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

          <MessageChatPanel variant={currentVariant} activeItem={activeItem} />
        </div>
      </div>
    </MessagesShell>
  );
};

export default MessagesPage;