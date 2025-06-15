import { Button } from "@/components/ui/button";
import ModelSelection from "@/features/chat/components/prompt/model-selection";
import usePromptStore from "@/features/chat/stores/prompt";
import { ArrowUp, FilePlus, Loader2 } from "lucide-react";

function PromptOptions({ handleSend }: { handleSend: () => Promise<void> }) {
  const isSending = usePromptStore((state) => state.isSending);

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-x-2">
        <ModelSelection />
        <Button size="icon" variant="outline" disabled={isSending}>
          <FilePlus />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button
          size="icon"
          disabled={isSending}
          onClick={() => void handleSend()}
        >
          {isSending ? <Loader2 className="animate-spin" /> : <ArrowUp />}
        </Button>
      </div>
    </div>
  );
}

export default PromptOptions;
