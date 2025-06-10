import useHandleSend from "@/features/chat/hooks/use-handle-send";
import usePromptStore from "@/features/chat/stores/prompt";
import type { Id } from "backend/_generated/dataModel";

function PromptEditor({ chatId }: { chatId: Id<"chats"> }) {
  const prompt = usePromptStore((state) => state.prompt);
  const isSending = usePromptStore((state) => state.isSending);
  const setPrompt = usePromptStore((state) => state.setPrompt);
  const handleSend = useHandleSend({ chatId });

  function handlePromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
  }
  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSend();
    }
  }

  return (
    <textarea
      id="prompt"
      autoFocus
      className="field-sizing-content min-h-16 resize-none focus:outline-none"
      rows={3}
      placeholder={isSending ? "Sending..." : "Enter your message"}
      disabled={isSending}
      value={prompt}
      onChange={(e) => handlePromptChange(e)}
      onKeyDown={(e) => void handleKeyDown(e)}
    />
  );
}

export default PromptEditor;
