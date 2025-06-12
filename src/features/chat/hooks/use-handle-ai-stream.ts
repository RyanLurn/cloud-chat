import fetchAiStream from "@/features/chat/lib/fetch-ai-stream";
import useAiStreamStore from "@/features/chat/stores/ai-stream";
import { useAuth } from "@clerk/clerk-react";
import type { AiStreamRequestBodyType } from "backend/ai/lib/validator";
import { useCallback } from "react";

function useHandleAiStream() {
  const { getToken } = useAuth();
  const addContent = useAiStreamStore((state) => state.addContent);
  const setStreamMessageId = useAiStreamStore(
    (state) => state.setStreamMessageId
  );

  const handleAiStream = useCallback(
    async ({ streamMessageId, chatId }: AiStreamRequestBodyType) => {
      setStreamMessageId(streamMessageId);
      try {
        const token = await getToken({ template: "convex" });
        const response = await fetchAiStream({
          streamMessageId,
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
            addContent(decoder.decode(value));
            break;
          }
          addContent(decoder.decode(value));
        }
      } catch (error) {
        console.error(error);
      }
      setStreamMessageId(null);
    },
    [getToken, addContent, setStreamMessageId]
  );

  return handleAiStream;
}

export default useHandleAiStream;
