import fetchAiStream from "@/features/chat/lib/fetch-ai-stream";
import useInputDisablingStore from "@/features/chat/stores/input-disabling";
import useRenderStore from "@/features/chat/stores/render";
import useResumableStreamsStore from "@/features/chat/stores/resumable";
import useStreamStore from "@/features/chat/stores/stream";
import { useAuth } from "@clerk/clerk-react";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useCallback } from "react";
import { toast } from "sonner";

function useHandleAiStream() {
  const { getToken } = useAuth();
  const addStream = useStreamStore((state) => state.addStream);
  const removeStream = useStreamStore((state) => state.removeStream);
  const updateStreamContent = useStreamStore(
    (state) => state.updateStreamContent
  );
  const isResumable = useResumableStreamsStore((state) => state.isResumable);

  const updateMessageContent = useMutation(api.message.functions.updateContent);
  const deleteRenderedContent = useRenderStore(
    (state) => state.deleteRenderedContent
  );
  const enableChat = useInputDisablingStore((state) => state.enableChat);

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
          isResumable,
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
        const errorMessage =
          error instanceof ConvexError
            ? (error.data as string)
            : "Something went wrong.";
        deleteRenderedContent(assistantMessageId);
        await updateMessageContent({
          messageId: assistantMessageId,
          newContent:
            "Something went wrong while generating my response. Please try again."
        });
        toast.error(errorMessage);
        enableChat(chatId);
      }
      setTimeout(() => {
        removeStream(streamId);
      }, 500);
    },
    [
      getToken,
      addStream,
      isResumable,
      updateStreamContent,
      removeStream,
      updateMessageContent,
      deleteRenderedContent,
      enableChat
    ]
  );

  return handleAiStream;
}

export default useHandleAiStream;
