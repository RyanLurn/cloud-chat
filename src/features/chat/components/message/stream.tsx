import MessageAvatar from "@/features/chat/components/message/avatar";
import MessageContent from "@/features/chat/components/message/content";
import useAiStreamStore from "@/features/chat/stores/ai-stream";

function StreamMessageBubble() {
  const content = useAiStreamStore((state) => state.content);
  return (
    <div className="flex gap-x-2">
      <MessageAvatar role="assistant" name="Nimbus" />
      <div className="flex flex-col gap-y-2">
        <div className="text-lg font-semibold">Nimbus</div>
        <MessageContent content={content || "*Thinking...*"} />
      </div>
    </div>
  );
}

export default StreamMessageBubble;
