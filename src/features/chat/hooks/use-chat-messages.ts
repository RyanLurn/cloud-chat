import useStreamStore from "@/features/chat/stores/stream";
import { api } from "backend/_generated/api";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

function useChatMessages({ chatId }: { chatId: Id<"chats"> }) {
  const [chatMessages, setChatMessages] = useState<
    Doc<"messages">[] | undefined
  >(undefined);
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

  // useEffect(() => {
  //   console.log("Chat messages:", chatMessages);
  //   console.log("Skip status:", isSkipping);
  //   console.log("Stream message:", streamMessage);
  //   console.log("Messages query result:", messagesQueryResult);
  // }, [chatMessages, isSkipping, streamMessage, messagesQueryResult]);

  useEffect(() => {
    if (messagesQueryResult) setChatMessages(messagesQueryResult);
    if (streamMessage) {
      setChatMessages((prev) => {
        if (prev) {
          const messages = prev.map((message) => {
            if (message._id === streamMessage._id) {
              const newStreamMessage = {
                ...message,
                content: streamMessage.content
              };
              return newStreamMessage;
            } else return message;
          });
          return messages;
        }
      });
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

  return chatMessages;
}

export default useChatMessages;
