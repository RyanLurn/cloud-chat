import { Button } from "@/components/ui/button";
import SendButton from "@/features/chat/components/prompt/options/send";
import usePromptStore from "@/features/chat/stores/prompt";
import type { Id } from "backend/_generated/dataModel";
import { FilePlus } from "lucide-react";

function PromptOptions({ chatId }: { chatId: Id<"chats"> }) {
  const isSending = usePromptStore((state) => state.isSending);

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-x-2">
        <Button size="icon" variant="outline" disabled={isSending}>
          <FilePlus />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <SendButton chatId={chatId} />
      </div>
    </div>
  );
}

export default PromptOptions;
