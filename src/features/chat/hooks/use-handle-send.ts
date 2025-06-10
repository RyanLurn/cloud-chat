import usePromptStore from "@/features/chat/stores/prompt";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import useNewChatStore from "@/features/chat/stores/new-chat";

function useHandleSend({ activeChatId }: { activeChatId?: Id<"chats"> }) {
  const setPrompt = usePromptStore((state) => state.setPrompt);
  const startSending = usePromptStore((state) => state.startSending);
  const stopSending = usePromptStore((state) => state.stopSending);

  const { user } = useUser();
  const addMessageToChat = useMutation(api.message.functions.addMessageToChat);
  const createNewChat = useMutation(api.chat.functions.createNewChat);

  const navigate = useNavigate();
  const startCreating = useNewChatStore((state) => state.startCreating);
  const stopCreating = useNewChatStore((state) => state.stopCreating);

  const handleSend = useCallback(async () => {
    const prompt = usePromptStore.getState().prompt;
    if (prompt.trim() === "") return;

    startSending();
    setPrompt("");

    let chatId: Id<"chats"> | undefined = activeChatId;
    if (!chatId) {
      startCreating();
      const newChatId = await createNewChat();
      chatId = newChatId;
      void navigate({ to: "/chat/$chatId", params: { chatId } });
      stopCreating();
    }

    const userMessage = {
      role: "user",
      content: prompt,
      name: user?.fullName || "User"
    } as const;

    await addMessageToChat({ ...userMessage, chatId });
    stopSending();
  }, [
    addMessageToChat,
    activeChatId,
    startSending,
    stopSending,
    user,
    setPrompt,
    createNewChat,
    navigate,
    startCreating,
    stopCreating
  ]);

  return handleSend;
}

export default useHandleSend;
