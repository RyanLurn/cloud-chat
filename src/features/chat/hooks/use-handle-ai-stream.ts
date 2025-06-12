import fetchAiStream from "@/features/chat/lib/fetch-ai-stream";
import useStreamStore from "@/features/chat/stores/stream";
import { useAuth } from "@clerk/clerk-react";
import type { Doc, Id } from "backend/_generated/dataModel";
import { useCallback } from "react";

function useHandleAiStream() {
  const { getToken } = useAuth();
  const addStreamMessage = useStreamStore((state) => state.addStreamMessage);
  const addStreamingContent = useStreamStore(
    (state) => state.addStreamingContent
  );
  const finishStreaming = useStreamStore((state) => state.finishStreaming);

  const handleAiStream = useCallback(
    async ({
      streamMessage,
      chatId
    }: {
      streamMessage: Doc<"messages">;
      chatId: Id<"chats">;
    }) => {
      addStreamMessage(streamMessage);
      try {
        const token = await getToken({ template: "convex" });
        const response = await fetchAiStream({
          streamMessageId: streamMessage._id,
          chatId,
          token
        });

        const responseBody = response.body;
        if (responseBody === null) {
          return;
        }

        const streamReader = responseBody.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await streamReader.read();
          if (done) {
            addStreamingContent(streamMessage._id, decoder.decode(value));
            break;
          }
          addStreamingContent(streamMessage._id, decoder.decode(value));
        }
      } catch (error) {
        console.error(error);
      }
      finishStreaming(streamMessage._id);
    },
    [getToken, addStreamMessage, addStreamingContent, finishStreaming]
  );

  return handleAiStream;
}

export default useHandleAiStream;
