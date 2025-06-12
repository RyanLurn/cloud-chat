import MessageBubble from "@/features/chat/components/message/bubble";
import useNewChatStore from "@/features/chat/stores/new-chat";
import { memo } from "react";

const NewChatFirstMessage = memo(function NewChatFirstMessage() {
  const newChatFirstMessage = useNewChatStore(
    (state) => state.newChatFirstMessage
  );
  if (!newChatFirstMessage) return null;
  return (
    <MessageBubble
      role="user"
      name={newChatFirstMessage.name}
      content={newChatFirstMessage.content}
    />
  );
});

export default NewChatFirstMessage;
