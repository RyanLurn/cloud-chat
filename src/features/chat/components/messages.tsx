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
  const chatMessages = useQuery(api.message.functions.list, {
    chatId
  });

  const firstChatMessage = useNewChatStore((state) =>
    state.firstChatMessages.find((m) => m.chatIdParam === chatId)
  );
  const removeFirstChatMessage = useNewChatStore(
    (state) => state.removeFirstChatMessage
  );
  useEffect(() => {
    if (chatMessages) removeFirstChatMessage(chatId);
  }, [chatMessages, removeFirstChatMessage, chatId]);

  if (!chatMessages && !firstChatMessage)
    return <ScreenLoader parentName="your messages" />;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {firstChatMessage && !chatMessages && (
        <>
          <MessageBubble
            id={crypto.randomUUID() as Id<"messages">}
            role={firstChatMessage.role}
            name={firstChatMessage.name}
            content={firstChatMessage.content}
            isStreaming={false}
            streamId={null}
          />
          <MessageBubble
            id={crypto.randomUUID() as Id<"messages">}
            role="assistant"
            name="Nimbus"
            content="*Thinking...*"
            isStreaming={false}
            streamId={null}
          />
        </>
      )}
      {chatMessages &&
        chatMessages.map((message) => (
          <MessageBubble
            key={message._id}
            id={message._id}
            role={message.role}
            name={message.name}
            content={message.content}
            isStreaming={message.isStreaming}
            streamId={message.streamId}
          />
        ))}
    </div>
  );
});

export default ChatMessages;
