import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import StreamManager from "@/features/chat/components/message/stream/manager";
import type { Id } from "backend/_generated/dataModel";
import { memo, useEffect, useState } from "react";

// Memoized so that when a new message is added to the parent list, this component will not rerender
const MessageBubble = memo(function MessageBubble({
  role,
  name,
  content,
  streamId
}: {
  id: Id<"messages">;
  role: "user" | "assistant";
  name: string;
  content: string;
  streamId: Id<"streams"> | null;
}) {
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (streamId) {
      setIsRendering(true);
    }
  }, [streamId]);

  function stopRendering() {
    if (content !== "") {
      setIsRendering(false);
    }
  }

  return (
    <div className="flex w-full gap-x-2">
      <MessageAvatar role={role} name={name} />
      <div className="flex w-full flex-col gap-y-2">
        <div className="text-lg font-semibold">{name}</div>
        {isRendering ? (
          <StreamManager
            messageContent={content}
            streamId={streamId}
            stopRendering={stopRendering}
          />
        ) : (
          <MessageContent content={content} />
        )}
      </div>
    </div>
  );
});

export default MessageBubble;
