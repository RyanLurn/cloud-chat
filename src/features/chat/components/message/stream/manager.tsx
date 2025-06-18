import StreamRenderer from "@/features/chat/components/message/stream/renderer";
import useRenderStore from "@/features/chat/stores/render";
import useStreamStore from "@/features/chat/stores/stream";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect } from "react";

function StreamManager({
  messageId,
  messageContent,
  streamId
}: {
  messageId: Id<"messages">;
  messageContent: string;
  streamId: Id<"streams"> | null;
}) {
  const httpStreamContent = useStreamStore(
    (state) => state.streams.find((stream) => stream.id === streamId)?.content
  );
  const resumableStreamContent = useQuery(
    api.stream.functions.getContent,
    httpStreamContent !== undefined || streamId === null
      ? "skip"
      : {
          streamId
        }
  );

  const renderedContent = useRenderStore((state) =>
    state.renderedContentRegistry.get(messageId)
  );
  const setRenderedContent = useRenderStore(
    (state) => state.setRenderedContent
  );

  const bufferedContent =
    httpStreamContent ?? resumableStreamContent ?? messageContent;

  useEffect(() => {
    if (streamId !== null && renderedContent === undefined) {
      setRenderedContent(messageId, bufferedContent);
    }
  }, [
    streamId,
    messageId,
    setRenderedContent,
    renderedContent,
    bufferedContent
  ]);

  return (
    <StreamRenderer
      bufferedContent={bufferedContent}
      messageId={messageId}
      streamId={streamId}
    />
  );
}

export default StreamManager;
