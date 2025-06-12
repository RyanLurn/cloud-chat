// import ScreenLoader from "@/components/screen-loader";
import MessageBubble from "@/features/chat/components/message/bubble";
import StreamMessageBubble from "@/features/chat/components/message/stream";
import NewChatFirstMessage from "@/features/chat/components/new-chat-first-message";
import useChatMessages from "@/features/chat/hooks/use-chat-messages";
import useDisplayNewChatFirstMessage from "@/features/chat/hooks/use-display-new-chat-first-message";
import useAiStreamStore from "@/features/chat/stores/ai-stream";
import type { Id } from "backend/_generated/dataModel";
import { memo } from "react";

// Memoized because chat title and open time change will make this component's parent rerenders
const ChatMessages = memo(function ChatMessages({
  chatId
}: {
  chatId: Id<"chats">;
}) {
  const chatMessages = useChatMessages({ chatId });
  const showStreaming = useAiStreamStore((state) => state.showStreaming);
  const isDisplayed = useDisplayNewChatFirstMessage({ chatId, chatMessages });

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
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
      {showStreaming && <StreamMessageBubble />}
    </div>
  );
});

export default ChatMessages;
