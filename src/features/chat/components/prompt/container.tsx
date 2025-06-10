import PromptEditor from "@/features/chat/components/prompt/editor";
import type { Id } from "backend/_generated/dataModel";
import PromptOptions from "@/features/chat/components/prompt/options";

function PromptContainer({ chatId }: { chatId: Id<"chats"> }) {
  return (
    <div className="sticky bottom-3 flex max-h-1/2 w-full flex-col gap-y-3 rounded-lg border-2 border-solid border-border bg-sidebar px-4 py-3">
      <PromptEditor chatId={chatId} />
      <PromptOptions chatId={chatId} />
    </div>
  );
}

export default PromptContainer;
