import ControlledStream from "@/features/chat/components/message/stream/controlled";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

function ResumableStream({
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
  const resumableContent = useQuery(api.stream.functions.getContent, {
    streamId
  });
  return (
    <ControlledStream
      id={id}
      content={resumableContent || ""}
      isStreaming={isStreaming}
      scrollToBottom={scrollToBottom}
    />
  );
}

export default ResumableStream;
