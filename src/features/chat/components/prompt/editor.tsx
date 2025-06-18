import usePromptStore from "@/features/chat/stores/prompt";

function PromptEditor({
  isDisabled,
  handleSend
}: {
  isDisabled: boolean;
  handleSend: () => Promise<void>;
}) {
  const prompt = usePromptStore((state) => state.prompt);
  const setPrompt = usePromptStore((state) => state.setPrompt);

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
      placeholder={isDisabled ? "Sending..." : "Enter your message"}
      disabled={isDisabled}
      value={prompt}
      onChange={(e) => handlePromptChange(e)}
      onKeyDown={(e) => void handleKeyDown(e)}
    />
  );
}

export default PromptEditor;
