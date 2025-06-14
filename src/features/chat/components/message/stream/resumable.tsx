import ControlledStream from "@/features/chat/components/message/stream/controlled";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

function ResumableStream({
  id,
  isStreaming,
  streamId
}: {
  id: Id<"messages">;
  isStreaming: boolean;
  streamId: Id<"streams">;
}) {
  const resumableContent = useQuery(api.stream.functions.getContent, {
    streamId
  });
  return (
    <ControlledStream
      id={id}
      content={resumableContent || ""}
      isStreaming={isStreaming}
      streamId={streamId}
    />
  );
}

export default ResumableStream;
