import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import useStreamStore from "@/features/chat/stores/stream";
import type { Id } from "backend/_generated/dataModel";

function StreamMessageBubble({
  role,
  name,
  streamId
}: {
  role: "user" | "assistant";
  name: string;
  streamId: Id<"streams">;
}) {
  const streamContent = useStreamStore(
    (state) => state.streams.find((stream) => stream.id === streamId)?.content
  );
  return (
    <div className="flex gap-x-2">
      <MessageAvatar role={role} name={name} />
      <div className="flex flex-col gap-y-2">
        <div className="text-lg font-semibold">Nimbus</div>
        <MessageContent content={streamContent || "*Thinking...*"} />
      </div>
    </div>
  );
}

export default StreamMessageBubble;
