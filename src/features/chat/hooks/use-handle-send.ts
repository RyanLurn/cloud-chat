import usePromptStore from "@/features/chat/stores/prompt";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import useHandleNewChat from "@/features/chat/hooks/use-handle-new-chat";

function useHandleSend() {
  const params = useParams({ strict: false });
  const handleNewChat = useHandleNewChat();

  const setPrompt = usePromptStore((state) => state.setPrompt);
  const startSending = usePromptStore((state) => state.startSending);
  const stopSending = usePromptStore((state) => state.stopSending);

  const { user } = useUser();
  const addMessageToChat = useMutation(
    api.message.functions.addMessageToChat
  ).withOptimisticUpdate((localStore, args) => {
    const existingMessages = localStore.getQuery(
      api.message.functions.listMessagesFromChat,
      { chatId: args.chatId }
    );

    if (existingMessages) {
      const optimisticMessage: Doc<"messages"> = {
        _id: crypto.randomUUID() as Id<"messages">,
        _creationTime: Date.now(),
        userId: user?.id as Id<"users">,
        ...args
      };

      localStore.setQuery(
        api.message.functions.listMessagesFromChat,
        { chatId: args.chatId },
        [...existingMessages, optimisticMessage]
      );
    }
  });

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

    await addMessageToChat({ ...userMessage, chatId });

    stopSending();
  }, [
    addMessageToChat,
    handleNewChat,
    params,
    setPrompt,
    startSending,
    stopSending,
    user
  ]);

  return handleSend;
}

export default useHandleSend;
