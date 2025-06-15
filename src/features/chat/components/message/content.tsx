import MarkdownContent from "@/features/chat/components/message/markdown";
import ModelThought from "@/features/chat/components/message/thought";
import extractReasoning from "@/features/chat/lib/extract-reasoning";

function MessageContent({ content }: { content: string }) {
  const { thinking, response } = extractReasoning(content);

  return (
    <div className="flex w-full flex-col gap-y-2">
      {thinking && <ModelThought thinking={thinking} />}
      <MarkdownContent content={response} />
    </div>
  );
}

export default MessageContent;
