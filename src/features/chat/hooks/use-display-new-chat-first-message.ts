import useNewChatStore from "@/features/chat/stores/new-chat";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useEffect, useState } from "react";

function useDisplayNewChatFirstMessage({
  chatId,
  chatMessages
}: {
  chatId?: Id<"chats">;
  chatMessages: Doc<"messages">[] | undefined;
}) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const newChatFirstMessage = useNewChatStore(
    (state) => state.newChatFirstMessage
  );

  const setNewChatFirstMessage = useNewChatStore(
    (state) => state.setNewChatFirstMessage
  );

  useEffect(() => {
    if (chatMessages) setNewChatFirstMessage(null);
  }, [chatMessages, setNewChatFirstMessage]);

  useEffect(() => {
    const shouldDisplay =
      !chatMessages &&
      newChatFirstMessage &&
      newChatFirstMessage.chatId === chatId;

    setIsDisplayed(shouldDisplay ?? false);
  }, [chatMessages, newChatFirstMessage, chatId]);

  return isDisplayed;
}

export default useDisplayNewChatFirstMessage;
