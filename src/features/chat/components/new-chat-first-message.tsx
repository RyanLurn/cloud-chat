import MessageBubble from "@/features/chat/components/message/bubble";
import type { NewChatFirstMessageType } from "@/features/chat/stores/new-chat";
import { memo } from "react";

const NewChatFirstMessage = memo(function NewChatFirstMessage({
  newChatFirstMessage
}: {
  newChatFirstMessage: NewChatFirstMessageType;
}) {
  return (
    <div className="w-full flex-1">
      <MessageBubble
        name={newChatFirstMessage.name}
        content={newChatFirstMessage.content}
      />
    </div>
  );
});

export default NewChatFirstMessage;
