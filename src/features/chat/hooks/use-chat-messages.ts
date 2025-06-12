import useAiStreamStore from "@/features/chat/stores/ai-stream";
import { api } from "backend/_generated/api";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

function useChatMessages({ chatId }: { chatId: Id<"chats"> }) {
  const [chatMessages, setChatMessages] = useState<
    Doc<"messages">[] | undefined
  >(undefined);
  const [isSkipping, setIsSkipping] = useState(false);

  const streamMessageId = useAiStreamStore((state) => state.streamMessageId);
  const startShowingStream = useAiStreamStore(
    (state) => state.startShowingStream
  );
  const stopShowingStream = useAiStreamStore(
    (state) => state.stopShowingStream
  );
  const clearContent = useAiStreamStore((state) => state.clearContent);

  const messagesQueryResult = useQuery(
    api.message.functions.listMessagesFromChat,
    isSkipping
      ? "skip"
      : {
          chatId
        }
  );

  useEffect(() => {
    if (messagesQueryResult)
      setChatMessages(
        messagesQueryResult.filter((message) => message._id !== streamMessageId)
      );
  }, [streamMessageId, messagesQueryResult]);

  useEffect(() => {
    if (streamMessageId) {
      if (messagesQueryResult) setIsSkipping(true);
    } else setIsSkipping(false);
  }, [streamMessageId, messagesQueryResult]);

  useEffect(() => {
    if (streamMessageId) startShowingStream();
    if (streamMessageId === null && messagesQueryResult) {
      stopShowingStream();
      clearContent();
    }
  }, [
    streamMessageId,
    messagesQueryResult,
    startShowingStream,
    stopShowingStream,
    clearContent
  ]);

  return chatMessages;
}

export default useChatMessages;
