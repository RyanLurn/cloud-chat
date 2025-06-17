import { IS_RESUMABLE } from "@/features/chat/lib/constants";
import fetchAiStream from "@/features/chat/lib/fetch-ai-stream";
import useStreamStore from "@/features/chat/stores/stream";
import { useAuth } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import { useCallback } from "react";

function useHandleAiStream() {
  const { getToken } = useAuth();
  const addStream = useStreamStore((state) => state.addStream);
  const removeStream = useStreamStore((state) => state.removeStream);
  const updateStreamContent = useStreamStore(
    (state) => state.updateStreamContent
  );

  const handleAiStream = useCallback(
    async ({
      assistantMessageId,
      streamId,
      chatId
    }: {
      assistantMessageId: Id<"messages">;
      streamId: Id<"streams">;
      chatId: Id<"chats">;
    }) => {
      addStream(streamId);
      try {
        const token = await getToken({ template: "convex" });
        const response = await fetchAiStream({
          assistantMessageId,
          streamId,
          chatId,
          isResumable: IS_RESUMABLE,
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
            updateStreamContent(streamId, decoder.decode(value));
            break;
          }
          updateStreamContent(streamId, decoder.decode(value));
        }
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        removeStream(streamId);
      }, 500);
    },
    [getToken, addStream, updateStreamContent, removeStream]
  );

  return handleAiStream;
}

export default useHandleAiStream;
