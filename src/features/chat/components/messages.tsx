import ScreenLoader from "@/components/screen-loader";
import MessageBubble from "@/features/chat/components/message/bubble";
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
  const messages = useQuery(api.message.functions.listMessagesFromChat, {
    chatId
  });

  if (!messages) return <ScreenLoader />;

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
