import useNewChatStore, {
  type NewMessage
} from "@/features/chat/stores/new-chat";
import { useNavigate } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import { useMutation } from "convex/react";
import { useCallback } from "react";

function useHandleNewChat() {
  const navigate = useNavigate();
  const setNewMessage = useNewChatStore((state) => state.setNewMessage);
  const createNewChat = useMutation(api.chat.functions.createNewChat);

  const handleNewChat = useCallback(
    async (newMessage: NewMessage) => {
      setNewMessage(newMessage);
      const newChatId = await createNewChat();
      await navigate({ to: "/chat/$chatId", params: { chatId: newChatId } });
      return newChatId;
    },
    [navigate, setNewMessage, createNewChat]
  );

  return handleNewChat;
}

export default useHandleNewChat;
