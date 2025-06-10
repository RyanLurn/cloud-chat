import { create } from "zustand";

interface PromptStore {
  prompt: string;
  isSending: boolean;
  setPrompt: (newPrompt: string) => void;
  startSending: () => void;
  stopSending: () => void;
}

const usePromptStore = create<PromptStore>()((set) => ({
  prompt: "",
  isSending: false,
  setPrompt: (newPrompt: string) => set({ prompt: newPrompt }),
  startSending: () => set({ isSending: true }),
  stopSending: () => set({ isSending: false })
}));

export default usePromptStore;
