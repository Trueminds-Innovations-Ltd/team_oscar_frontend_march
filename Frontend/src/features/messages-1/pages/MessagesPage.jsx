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
} from "../data/messagesData";

const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeTab, setActiveTab] = useState("direct");
  const [activeInboxId, setActiveInboxId] = useState("tylor-james");

  const visibleThreads = useMemo(
    () => inboxThreads.filter((thread) => thread.tab === activeTab),
    [activeTab],
  );

  const resolvedActiveThread = useMemo(() => {
    const currentThread = inboxThreads.find((thread) => thread.id === activeInboxId);

    if (currentThread && currentThread.tab === activeTab) {
      return currentThread;
    }

    return visibleThreads[0] || inboxThreads[0];
  }, [activeInboxId, activeTab, visibleThreads]);

  const layoutColumns =
    activeFolder === "flow-ai"
      ? "xl:grid-cols-[170px_minmax(0,1fr)]"
      : "xl:grid-cols-[170px_minmax(300px,380px)_minmax(0,1fr)]";

  return (
    <MessagesShell>
      <h1 className="mb-7 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Messages
      </h1>

      <div className={`grid gap-4 ${layoutColumns}`}>
        <MessageSectionNav
          items={messageFolders}
          activeId={activeFolder}
          onChange={setActiveFolder}
        />

        {activeFolder === "inbox" ? (
          <MessageListPanel
            tabs={inboxTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            threads={inboxThreads}
            activeThreadId={resolvedActiveThread.id}
            onSelect={setActiveInboxId}
          />
        ) : null}

        <MessageChatPanel
          folder={activeFolder}
          inboxThread={resolvedActiveThread}
          flowAiThread={flowAiThread}
        />
      </div>
    </MessagesShell>
  );
};

export default MessagesPage;
