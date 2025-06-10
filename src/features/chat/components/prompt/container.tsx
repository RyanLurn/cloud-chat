import PromptEditor from "@/features/chat/components/prompt/editor";
import PromptOptions from "@/features/chat/components/prompt/options";
import useHandleSend from "@/features/chat/hooks/use-handle-send";

function PromptContainer() {
  const handleSend = useHandleSend();

  return (
    <div className="sticky bottom-3 flex max-h-1/2 w-full flex-col gap-y-3 rounded-lg border-2 border-solid border-border bg-sidebar px-4 py-3">
      <PromptEditor handleSend={handleSend} />
      <PromptOptions handleSend={handleSend} />
    </div>
  );
}

export default PromptContainer;
