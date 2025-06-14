import MessageContent from "@/features/chat/components/message/content";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

function ResumableStream({ streamId }: { streamId: Id<"streams"> }) {
  const resumableContent = useQuery(api.stream.functions.getContent, {
    streamId
  });
  return <MessageContent content={resumableContent || "*Thinking...*"} />;
}

export default ResumableStream;
