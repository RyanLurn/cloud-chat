function PromptEditor({
  prompt,
  isSending,
  handlePromptChange,
  handleSend
}: {
  prompt: string;
  isSending: boolean;
  handlePromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSend: () => Promise<void>;
}) {
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
