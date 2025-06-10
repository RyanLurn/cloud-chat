import { Button } from "@/components/ui/button";
import useHandleSend from "@/features/chat/hooks/use-handle-send";
import usePromptStore from "@/features/chat/stores/prompt";
import type { Id } from "backend/_generated/dataModel";
import { ArrowUp, Loader2 } from "lucide-react";

function SendButton({ chatId }: { chatId: Id<"chats"> }) {
  const isSending = usePromptStore((state) => state.isSending);
  const handleSend = useHandleSend({ chatId });

  return (
    <Button size="icon" disabled={isSending} onClick={() => void handleSend()}>
      {isSending ? <Loader2 className="animate-spin" /> : <ArrowUp />}
    </Button>
  );
}

export default SendButton;
