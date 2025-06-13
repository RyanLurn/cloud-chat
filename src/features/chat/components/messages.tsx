// import ScreenLoader from "@/components/screen-loader";
import MessageBubble from "@/features/chat/components/message/bubble";
import NewChatFirstMessage from "@/features/chat/components/new-chat-first-message";
import useAutoScroll from "@/features/chat/hooks/use-auto-scroll";
import useChatMessages from "@/features/chat/hooks/use-chat-messages";
import useDisplayNewChatFirstMessage from "@/features/chat/hooks/use-display-new-chat-first-message";
import type { Id } from "backend/_generated/dataModel";
import { memo } from "react";

// Memoized because chat title and open time change will make this component's parent rerenders
const ChatMessages = memo(function ChatMessages({
  chatId
}: {
  chatId: Id<"chats">;
}) {
  const { chatMessages, isStreaming } = useChatMessages({ chatId });
  const isDisplayed = useDisplayNewChatFirstMessage({ chatId, chatMessages });
  const { messagesContainerRef, messagesEndRef, handleScroll } = useAutoScroll({
    messages: chatMessages,
    isStreaming
  });

  return (
    <div
      className="flex w-full flex-1 flex-col gap-y-6"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {isDisplayed && <NewChatFirstMessage />}
      {chatMessages &&
        chatMessages.map((message) => {
          return (
            <MessageBubble
              key={message._id}
              role={message.role}
              name={message.name}
              content={message.content}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
});

export default ChatMessages;
