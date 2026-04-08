import React, { useMemo, useState } from "react";

import MessageChatPanel from "../components/MessageChatPanel";
import MessageListPanel from "../components/MessageListPanel";
import MessageSectionNav from "../components/MessageSectionNav";
import MessagesShell from "../components/MessagesShell";
import {
  messageFolders,
  supportTickets,
  tutorChats,
} from "../data/messagesData";

const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState("tutor-chat");
  const [activeTutorChatId, setActiveTutorChatId] = useState("tylor-james");
  const [activeSupportTicketId, setActiveSupportTicketId] =
    useState("quiz-scoring");

  const currentVariant =
    activeFolder === "support-ticket" ? "tickets" : "tutor";

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

  const panelTitle =
    currentVariant === "tickets" ? "Support Tickets" : "Tutor Chat";
  const buttonLabel =
    currentVariant === "tickets" ? "Create Ticket" : "Request Tutor";
  const listItems = currentVariant === "tickets" ? supportTickets : tutorChats;
  const activeItemId =
    currentVariant === "tickets" ? activeSupportTicketId : activeTutorChatId;
  const activeItem =
    currentVariant === "tickets" ? activeSupportTicket : activeTutorChat;

  return (
    <MessagesShell title="Messages">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-8">
        Messages
      </h1>
      <div className="grid gap-4 xl:grid-cols-[160px_minmax(320px,420px)_minmax(0,1fr)] 2xl:grid-cols-[170px_minmax(340px,430px)_minmax(0,1fr)]">
        <MessageSectionNav
          items={messageFolders}
          activeId={activeFolder}
          onChange={(folderId) => setActiveFolder(folderId)}
        />

        <MessageListPanel
          title={panelTitle}
          buttonLabel={buttonLabel}
          variant={currentVariant}
          items={listItems}
          activeItemId={activeItemId}
          onSelect={
            currentVariant === "tickets"
              ? setActiveSupportTicketId
              : setActiveTutorChatId
          }
        />

        <MessageChatPanel variant={currentVariant} activeItem={activeItem} />
      </div>
    </MessagesShell>
  );
};

export default MessagesPage;
