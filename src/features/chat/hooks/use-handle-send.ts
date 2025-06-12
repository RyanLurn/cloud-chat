import usePromptStore from "@/features/chat/stores/prompt";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import { useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import useHandleNewChat from "@/features/chat/hooks/use-handle-new-chat";
import useHandleAiStream from "@/features/chat/hooks/use-handle-ai-stream";

function useHandleSend() {
  const params = useParams({ strict: false });
  const handleNewChat = useHandleNewChat();

  const setPrompt = usePromptStore((state) => state.setPrompt);
  const startSending = usePromptStore((state) => state.startSending);
  const stopSending = usePromptStore((state) => state.stopSending);

  const { user } = useUser();
  const addMessagePairToChat = useMutation(
    api.message.functions.addMessagePairToChat
  );
  const handleAiStream = useHandleAiStream();

  const handleSend = useCallback(async () => {
    const prompt = usePromptStore.getState().prompt;
    if (prompt.trim() === "") return;

    startSending();
    setPrompt("");

    const userMessage = {
      role: "user",
      content: prompt,
      name: user?.fullName || "You"
    } as const;

    let chatId: Id<"chats"> | undefined = params.chatId as Id<"chats">;
    if (!chatId) {
      chatId = await handleNewChat(userMessage);
    }

    const { streamMessage } = await addMessagePairToChat({
      ...userMessage,
      chatId
    });
    await handleAiStream({ streamMessage, chatId });

    stopSending();
  }, [
    addMessagePairToChat,
    handleNewChat,
    params,
    setPrompt,
    startSending,
    stopSending,
    user,
    handleAiStream
  ]);

  return handleSend;
}

export default useHandleSend;
