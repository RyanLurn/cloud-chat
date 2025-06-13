import useStreamStore from "@/features/chat/stores/stream";
import { api } from "backend/_generated/api";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect, useMemo, useState } from "react";

function useChatMessages({ chatId }: { chatId: Id<"chats"> }) {
  const [messages, setMessages] = useState<Doc<"messages">[] | undefined>(
    undefined
  );
  const [isSkipping, setIsSkipping] = useState(false);

  const streamMessage = useStreamStore((state) =>
    state.streamMessages.find(
      (streamMessage) => streamMessage.chatId === chatId
    )
  );
  const removeStreamMessage = useStreamStore(
    (state) => state.removeStreamMessage
  );

  const messagesQueryResult = useQuery(
    api.message.functions.listMessagesFromChat,
    isSkipping
      ? "skip"
      : {
          chatId
        }
  );

  useEffect(() => {
    if (messagesQueryResult) {
      const filteredMessages = messagesQueryResult.filter(
        (message) => message._id !== streamMessage?._id
      );
      setMessages(filteredMessages);
    }
  }, [streamMessage, messagesQueryResult]);

  useEffect(() => {
    if (streamMessage?.isStreaming) {
      if (messagesQueryResult) setIsSkipping(true);
    } else setIsSkipping(false);
  }, [streamMessage?.isStreaming, messagesQueryResult]);

  useEffect(() => {
    if (streamMessage?.isStreaming === false && messagesQueryResult) {
      removeStreamMessage(streamMessage._id);
    }
  }, [
    streamMessage?.isStreaming,
    streamMessage?._id,
    messagesQueryResult,
    removeStreamMessage
  ]);

  const chatMessages = useMemo(() => {
    if (!messages) return undefined;

    const chatMessages = [...messages];

    if (
      streamMessage &&
      !chatMessages.some((m) => m._id === streamMessage._id)
    ) {
      chatMessages.push(streamMessage);
    }

    return chatMessages;
  }, [messages, streamMessage]);

  return chatMessages;
}

export default useChatMessages;
