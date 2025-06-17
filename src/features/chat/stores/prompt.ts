import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PromptStore {
  prompt: string;
  isSending: boolean;
  setPrompt: (newPrompt: string) => void;
  startSending: () => void;
  stopSending: () => void;
}

const usePromptStore = create(
  devtools<PromptStore>(
    (set) => ({
      prompt: "",
      isSending: false,
      setPrompt: (newPrompt: string) => set({ prompt: newPrompt }),
      startSending: () => set({ isSending: true }),
      stopSending: () => set({ isSending: false })
    }),
    { name: "Prompt Store", store: "prompt-store" }
  )
);

export default usePromptStore;
