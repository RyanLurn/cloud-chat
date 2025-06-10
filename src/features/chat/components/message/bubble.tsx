import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import { memo } from "react";

// Memoized so that when a new message is added to the parent list, this component will not rerender
const MessageBubble = memo(function MessageBubble({
  name,
  content
}: {
  name: string;
  content: string;
}) {
  return (
    <div className="flex gap-x-2">
      <MessageAvatar name={name} />
      <div className="flex flex-col gap-y-2">
        <div className="text-lg font-semibold">{name}</div>
        <MessageContent content={content} />
      </div>
    </div>
  );
});

export default MessageBubble;
