import MessageBubble from "@/features/chat/components/message/bubble";
import useNewChatStore from "@/features/chat/stores/new-chat";
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
  const newMessage = useNewChatStore((state) => state.newMessage);
  const messages = useQuery(api.message.functions.listMessagesFromChat, {
    chatId
  });

  if (!messages && newMessage)
    return (
      <div className="w-full flex-1">
        <MessageBubble name={newMessage.name} content={newMessage.content} />
      </div>
    );

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {messages?.map((message) => (
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
