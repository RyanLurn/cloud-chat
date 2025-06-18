import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PromptStore {
  prompt: string;
  setPrompt: (newPrompt: string) => void;
}

const usePromptStore = create(
  devtools<PromptStore>(
    (set) => ({
      prompt: "",
      setPrompt: (newPrompt: string) => set({ prompt: newPrompt })
    }),
    { name: "Prompt Store", store: "prompt-store" }
  )
);

export default usePromptStore;
