import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import StreamManager from "@/features/chat/components/message/stream/manager";
import useRenderStore from "@/features/chat/stores/render";
import type { Id } from "backend/_generated/dataModel";
import { memo } from "react";

// Memoized so that when a new message is added to the parent list, this component will not rerender
const MessageBubble = memo(function MessageBubble({
  id,
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
  const renderedContent = useRenderStore((state) =>
    state.renderedContentRegistry.get(id)
  );

  return (
    <div className="flex w-full gap-x-2">
      <MessageAvatar role={role} name={name} />
      <div className="flex w-full flex-col gap-y-2">
        <div className="text-lg font-semibold">{name}</div>
        {streamId !== null || renderedContent !== undefined ? (
          <StreamManager
            messageId={id}
            messageContent={content}
            streamId={streamId}
          />
        ) : (
          <MessageContent content={content} />
        )}
      </div>
    </div>
  );
});

export default MessageBubble;
