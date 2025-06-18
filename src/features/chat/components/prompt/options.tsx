import { Button } from "@/components/ui/button";
import KeyDialog from "@/features/chat/components/prompt/key-dialog";
import ResumableStreamsSwitch from "@/features/chat/components/prompt/resumable-switch";
import { ArrowUp, Loader2 } from "lucide-react";

function PromptOptions({
  isDisabled,
  handleSend
}: {
  isDisabled: boolean;
  handleSend: () => Promise<void>;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-x-2">
        <KeyDialog isDisabled={isDisabled} />
        <ResumableStreamsSwitch isDisabled={isDisabled} />
        {/* <Button size="icon" variant="outline" disabled={isSending}>
          <FilePlus />
        </Button> */}
      </div>
      <div className="flex gap-x-2">
        <Button
          size="icon"
          disabled={isDisabled}
          onClick={() => void handleSend()}
        >
          {isDisabled ? <Loader2 className="animate-spin" /> : <ArrowUp />}
        </Button>
      </div>
    </div>
  );
}

export default PromptOptions;
