import useNewChatStore from "@/features/chat/stores/new-chat";
import { useNavigate, useParams } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import { useMutation } from "convex/react";
import { useCallback } from "react";

function useGetChatId() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();

  const startCreating = useNewChatStore((state) => state.startCreating);
  const stopCreating = useNewChatStore((state) => state.stopCreating);

  const createNewChat = useMutation(api.chat.functions.createNewChat);

  const getChatId = useCallback(async () => {
    if (!params.chatId) {
      startCreating();
      const newChatId = await createNewChat();
      await navigate({ to: "/chat/$chatId", params: { chatId: newChatId } });
      stopCreating();
      return newChatId;
    } else return params.chatId;
  }, [params, navigate, startCreating, stopCreating, createNewChat]);

  return getChatId;
}

export default useGetChatId;
