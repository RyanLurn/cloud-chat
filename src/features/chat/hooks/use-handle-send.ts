import usePromptStore from "@/features/chat/stores/prompt";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useCallback } from "react";
import useGetChatId from "@/features/chat/hooks/use-get-chat-id";

function useHandleSend() {
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

  const getChatId = useGetChatId();

  const handleSend = useCallback(async () => {
    const prompt = usePromptStore.getState().prompt;
    if (prompt.trim() === "") return;

    startSending();
    setPrompt("");

    // Get the chatId to send the prompt to (based on the current path params).
    // If there is no chatId, create a new chat.
    const chatId = await getChatId();

    const userMessage = {
      role: "user",
      content: prompt,
      name: user?.fullName || "User"
    } as const;

    await addMessageToChat({ ...userMessage, chatId: chatId as Id<"chats"> });

    stopSending();
  }, [addMessageToChat, startSending, stopSending, user, setPrompt, getChatId]);

  return handleSend;
}

export default useHandleSend;
