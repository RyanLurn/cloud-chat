import useNewChatStore, {
  type NewChatFirstMessageType
} from "@/features/chat/stores/new-chat";
import { useNavigate } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import { useAction, useMutation } from "convex/react";
import { useCallback } from "react";

function useHandleNewChat() {
  const navigate = useNavigate();
  const setNewChatFirstMessage = useNewChatStore(
    (state) => state.setNewChatFirstMessage
  );
  const createNewChat = useMutation(api.chat.functions.createNewChat);
  const generateChatTitle = useAction(api.ai.functions.generateChatTitle);

  const handleNewChat = useCallback(
    async (newMessage: NewChatFirstMessageType) => {
      setNewChatFirstMessage(newMessage);
      const newChatId = await createNewChat();
      setNewChatFirstMessage({
        ...newMessage,
        chatId: newChatId
      });
      void generateChatTitle({
        chatId: newChatId,
        firstMessageContent: newMessage.content
      });
      await navigate({ to: "/chat/$chatId", params: { chatId: newChatId } });
      return newChatId;
    },
    [navigate, setNewChatFirstMessage, createNewChat, generateChatTitle]
  );

  return handleNewChat;
}

export default useHandleNewChat;
