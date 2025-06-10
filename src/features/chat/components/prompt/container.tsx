import { useState } from "react";
import PromptEditor from "@/features/chat/components/prompt/editor";
import { useMutation } from "convex/react";
import { api } from "backend/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "backend/_generated/dataModel";
import PromptOptions from "@/features/chat/components/prompt/options";

function PromptContainer({ chatId }: { chatId: Id<"chats"> }) {
  const [prompt, setPrompt] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const addMessageToChat = useMutation(api.message.functions.addMessageToChat);
  const { user } = useUser();

  function handlePromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
  }

  async function handleSend() {
    setIsSending(true);
    const userMessage = {
      role: "user",
      content: prompt,
      name: user?.fullName || "User"
    } as const;
    await addMessageToChat({ ...userMessage, chatId });
    setPrompt("");
    setIsSending(false);
  }

  return (
    <div className="sticky bottom-3 flex max-h-1/2 w-full flex-col gap-y-3 rounded-lg border-2 border-solid border-border bg-sidebar px-4 py-3">
      <PromptEditor
        prompt={prompt}
        isSending={isSending}
        handlePromptChange={handlePromptChange}
        handleSend={handleSend}
      />
      <PromptOptions isSending={isSending} handleSend={handleSend} />
    </div>
  );
}

export default PromptContainer;
