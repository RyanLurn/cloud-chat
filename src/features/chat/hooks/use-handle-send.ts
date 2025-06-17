import usePromptStore from "@/features/chat/stores/prompt";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import { useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import useHandleNewChat from "@/features/chat/hooks/use-handle-new-chat";
import useHandleAiStream from "@/features/chat/hooks/use-handle-ai-stream";
import useSendMessage from "@/features/chat/hooks/use-send-message";

function useHandleSend() {
  const params = useParams({ strict: false });
  const handleNewChat = useHandleNewChat();

  const setPrompt = usePromptStore((state) => state.setPrompt);
  // const startSending = usePromptStore((state) => state.startSending);

  const { user } = useUser();
  const sendMessage = useSendMessage();
  const handleAiStream = useHandleAiStream();

  const handleSend = useCallback(async () => {
    const prompt = usePromptStore.getState().prompt;
    if (prompt.trim() === "") return;

    // startSending();
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

    const { assistantMessageId, streamId } = await sendMessage({
      userMessage,
      chatId
    });
    await handleAiStream({ assistantMessageId, streamId, chatId });
  }, [handleNewChat, params, setPrompt, user, handleAiStream, sendMessage]);

  return handleSend;
}

export default useHandleSend;
