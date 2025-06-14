import ControlledStream from "@/features/chat/components/message/stream/controlled";
import ResumableStream from "@/features/chat/components/message/stream/resumable";
import useStreamStore from "@/features/chat/stores/stream";
import type { Id } from "backend/_generated/dataModel";

function StreamContent({ streamId }: { streamId: Id<"streams"> }) {
  const streamContent = useStreamStore(
    (state) => state.streams.find((stream) => stream.id === streamId)?.content
  );

  if (streamContent === undefined) {
    return <ResumableStream streamId={streamId} />;
  }
  return <ControlledStream content={streamContent} />;
}

export default StreamContent;
