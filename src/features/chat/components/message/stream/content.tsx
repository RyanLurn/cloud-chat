import ControlledStream from "@/features/chat/components/message/stream/controlled";
import ResumableStream from "@/features/chat/components/message/stream/resumable";
import useStreamStore from "@/features/chat/stores/stream";
import type { Id } from "backend/_generated/dataModel";

function StreamContent({
  id,
  isStreaming,
  streamId,
  scrollToBottom
}: {
  id: Id<"messages">;
  isStreaming: boolean;
  streamId: Id<"streams">;
  scrollToBottom: () => void;
}) {
  const streamContent = useStreamStore(
    (state) => state.streams.find((stream) => stream.id === streamId)?.content
  );

  if (streamContent === undefined) {
    return (
      <ResumableStream
        id={id}
        isStreaming={isStreaming}
        streamId={streamId}
        scrollToBottom={scrollToBottom}
      />
    );
  }
  return (
    <ControlledStream
      id={id}
      content={streamContent}
      isStreaming={isStreaming}
      scrollToBottom={scrollToBottom}
    />
  );
}

export default StreamContent;
