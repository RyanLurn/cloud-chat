import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import StreamContent from "@/features/chat/components/message/stream/content";
import type { Id } from "backend/_generated/dataModel";
import { memo } from "react";

// Memoized so that when a new message is added to the parent list, this component will not rerender
const MessageBubble = memo(function MessageBubble({
  id,
  role,
  name,
  content,
  isStreaming,
  streamId,
  scrollToBottom
}: {
  id: Id<"messages">;
  role: "user" | "assistant";
  name: string;
  content: string;
  isStreaming: boolean;
  streamId: Id<"streams"> | null;
  scrollToBottom: () => void;
}) {
  return (
    <div className="flex gap-x-2">
      <MessageAvatar role={role} name={name} />
      <div className="flex flex-col gap-y-2">
        <div className="text-lg font-semibold">{name}</div>
        {streamId ? (
          <StreamContent
            id={id}
            isStreaming={isStreaming}
            streamId={streamId}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          <MessageContent content={content} />
        )}
      </div>
    </div>
  );
});

export default MessageBubble;
