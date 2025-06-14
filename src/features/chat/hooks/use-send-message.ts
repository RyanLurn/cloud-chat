import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback } from "react";

function useSendMessage() {
  const send = useMutation(api.message.functions.send).withOptimisticUpdate(
    (localStore, args) => {
      const existingMessages = localStore.getQuery(api.message.functions.list, {
        chatId: args.chatId
      });

      const userMessage = {
        ...args,
        _id: crypto.randomUUID() as Id<"messages">,
        _creationTime: Date.now(),
        streamId: null,
        userId: crypto.randomUUID() as Id<"users">
      } as const;
      const assistantMessage = {
        _id: crypto.randomUUID() as Id<"messages">,
        _creationTime: Date.now(),
        role: "assistant",
        content: "*Thinking...*",
        name: "Nimbus",
        streamId: null,
        userId: crypto.randomUUID() as Id<"users">,
        chatId: args.chatId
      } as const;

      if (existingMessages !== undefined) {
        localStore.setQuery(
          api.message.functions.list,
          { chatId: args.chatId },
          [...existingMessages, userMessage, assistantMessage]
        );
      }
    }
  );

  const sendMessage = useCallback(
    async ({
      userMessage,
      chatId
    }: {
      userMessage: {
        role: "user" | "assistant";
        content: string;
        name: string;
      };
      chatId: Id<"chats">;
    }) => {
      const { assistantMessageId, streamId } = await send({
        ...userMessage,
        chatId
      });

      return { assistantMessageId, streamId };
    },
    [send]
  );

  return sendMessage;
}

export default useSendMessage;
