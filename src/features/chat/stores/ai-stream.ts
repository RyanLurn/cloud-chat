import { create } from "zustand";

interface AiStreamStore {
  content: string;
  isStreaming: boolean;
  addContent: (newContent: string) => void;
  startStreaming: () => void;
  stopStreaming: () => void;
}

const useAiStreamStore = create<AiStreamStore>()((set) => ({
  content: "",
  isStreaming: false,
  addContent: (newContent: string) =>
    set((state) => ({ content: state.content + newContent })),
  startStreaming: () => set({ isStreaming: true }),
  stopStreaming: () => set({ isStreaming: false })
}));

export default useAiStreamStore;
