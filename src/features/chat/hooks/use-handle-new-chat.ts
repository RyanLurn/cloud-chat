import useNewChatStore, {
  type FirstMessage
} from "@/features/chat/stores/new-chat";
import { useNavigate } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import { useAction, useMutation } from "convex/react";
import { useCallback } from "react";

function useHandleNewChat() {
  const navigate = useNavigate();

  const setFirstMessage = useNewChatStore((state) => state.setFirstMessage);
  const addFirstChatMessage = useNewChatStore(
    (state) => state.addFirstChatMessage
  );

  const createNewChat = useMutation(api.chat.functions.createNewChat);
  const generateChatTitle = useAction(api.ai.functions.generateChatTitle);

  const handleNewChat = useCallback(
    async (firstMessage: FirstMessage) => {
      setFirstMessage(firstMessage);

      const newChatId = await createNewChat();

      void generateChatTitle({
        chatId: newChatId,
        firstMessageContent: firstMessage.content
      });

      addFirstChatMessage({
        ...firstMessage,
        chatIdParam: newChatId
      });

      await navigate({ to: "/chat/$chatId", params: { chatId: newChatId } });

      setFirstMessage(null);

      return newChatId;
    },
    [
      navigate,
      setFirstMessage,
      addFirstChatMessage,
      createNewChat,
      generateChatTitle
    ]
  );

  return handleNewChat;
}

export default useHandleNewChat;
