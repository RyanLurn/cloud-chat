import ControlledStream from "@/features/chat/components/message/stream/controlled";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

function ResumableStream({ streamId }: { streamId: Id<"streams"> }) {
  const resumableContent = useQuery(api.stream.functions.getContent, {
    streamId
  });
  return <ControlledStream content={resumableContent || ""} />;
}

export default ResumableStream;
