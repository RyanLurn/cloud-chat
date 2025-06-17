import StreamRenderer from "@/features/chat/components/message/stream/renderer";
import useStreamStore from "@/features/chat/stores/stream";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

function StreamManager({
  messageContent,
  streamId,
  stopRendering
}: {
  messageContent: string;
  streamId: Id<"streams"> | null;
  stopRendering: () => void;
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
  const bufferedContent =
    httpStreamContent ?? resumableStreamContent ?? messageContent;

  return (
    <StreamRenderer
      bufferedContent={bufferedContent}
      stopRendering={stopRendering}
    />
  );
}

export default StreamManager;
