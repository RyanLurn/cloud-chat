import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import type { Doc } from "backend/_generated/dataModel";

function StreamMessageBubble({
  streamMessage
}: {
  streamMessage: Doc<"messages">;
}) {
  return (
    <div className="flex gap-x-2">
      <MessageAvatar role={streamMessage.role} name={streamMessage.name} />
      <div className="flex flex-col gap-y-2">
        <div className="text-lg font-semibold">Nimbus</div>
        <MessageContent content={streamMessage.content || "*Thinking...*"} />
      </div>
    </div>
  );
}

export default StreamMessageBubble;
