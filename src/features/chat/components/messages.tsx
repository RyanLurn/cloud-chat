import ScreenLoader from "@/components/screen-loader";
import MessageBubble from "@/features/chat/components/message/bubble";
import StreamMessageBubble from "@/features/chat/components/message/stream";
import NewChatFirstMessage from "@/features/chat/components/new-chat-first-message";
import useDisplayNewChatFirstMessage from "@/features/chat/hooks/use-display-new-chat-first-message";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { memo } from "react";

// Memoized because chat title and open time change will make this component's parent rerenders
const ChatMessages = memo(function ChatMessages({
  chatId
}: {
  chatId: Id<"chats">;
}) {
  const chatMessages = useQuery(api.message.functions.list, {
    chatId
  });
  const isDisplayed = useDisplayNewChatFirstMessage({ chatId, chatMessages });

  if (!chatMessages) return <ScreenLoader parentName="your messages" />;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {isDisplayed && <NewChatFirstMessage />}
      {chatMessages &&
        chatMessages.map((message) => {
          if (message.streamId === null) {
            return (
              <MessageBubble
                key={message._id}
                role={message.role}
                name={message.name}
                content={message.content}
              />
            );
          } else {
            return (
              <StreamMessageBubble
                key={message._id}
                role={message.role}
                name={message.name}
                streamId={message.streamId}
              />
            );
          }
        })}
    </div>
  );
});

export default ChatMessages;
