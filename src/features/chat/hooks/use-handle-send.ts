import usePromptStore from "@/features/chat/stores/prompt";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import { useCallback } from "react";

function useHandleSend({ chatId }: { chatId: Id<"chats"> }) {
  const setPrompt = usePromptStore((state) => state.setPrompt);
  const startSending = usePromptStore((state) => state.startSending);
  const stopSending = usePromptStore((state) => state.stopSending);

  const addMessageToChat = useMutation(api.message.functions.addMessageToChat);
  const { user } = useUser();

  const handleSend = useCallback(async () => {
    startSending();
    const prompt = usePromptStore.getState().prompt;
    const userMessage = {
      role: "user",
      content: prompt,
      name: user?.fullName || "User"
    } as const;
    setPrompt("");
    await addMessageToChat({ ...userMessage, chatId });
    stopSending();
  }, [addMessageToChat, chatId, startSending, stopSending, user, setPrompt]);

  return handleSend;
}

export default useHandleSend;
