import PromptEditor from "@/features/chat/components/prompt/editor";
import PromptOptions from "@/features/chat/components/prompt/options";
import useHandleSend from "@/features/chat/hooks/use-handle-send";
import { useParams } from "@tanstack/react-router";
import type { Id } from "backend/_generated/dataModel";
import useInputDisablingStore from "@/features/chat/stores/input-disabling";
function PromptContainer() {
  const { chatId } = useParams({ strict: false });
  const isDisabled = useInputDisablingStore((state) => {
    if (chatId) {
      return state.disabledChats.has(chatId as Id<"chats">);
    } else return state.isNewChatDisabled;
  });

  const handleSend = useHandleSend();

  return (
    <div className="sticky bottom-3 flex max-h-1/2 w-full flex-col gap-y-3 rounded-lg border-2 border-solid border-border bg-sidebar px-4 py-3">
      <PromptEditor isDisabled={isDisabled} handleSend={handleSend} />
      <PromptOptions isDisabled={isDisabled} handleSend={handleSend} />
    </div>
  );
}

export default PromptContainer;
