import ScreenLoader from "@/components/screen-loader";
import MessageBubble from "@/features/chat/components/message/bubble";
import useNewChatStore from "@/features/chat/stores/new-chat";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { memo, useEffect } from "react";

// Memoized because chat title and open time change will make this component's parent rerenders
const ChatMessages = memo(function ChatMessages({
  chatId
}: {
  chatId: Id<"chats">;
}) {
  const messages = useQuery(api.message.functions.listMessagesFromChat, {
    chatId
  });

  // Optimistic update for new chat case
  const newChatFirstMessage = useNewChatStore(
    (state) => state.newChatFirstMessage
  );

  const setNewChatFirstMessage = useNewChatStore(
    (state) => state.setNewChatFirstMessage
  );

  useEffect(() => {
    if (messages) setNewChatFirstMessage(null);
  }, [messages, setNewChatFirstMessage]);

  if (!messages && newChatFirstMessage)
    return (
      <div className="w-full flex-1">
        <MessageBubble
          name={newChatFirstMessage.name}
          content={newChatFirstMessage.content}
        />
      </div>
    );
  // End of optimistic update code

  if (!messages) return <ScreenLoader parentName="your messages" />;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          name={message.name}
          content={message.content}
        />
      ))}
    </div>
  );
});

export default ChatMessages;
