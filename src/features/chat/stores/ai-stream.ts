import { create } from "zustand";

interface AiStreamStore {
  content: string;
  streamMessageId: string | null;
  addContent: (newContent: string) => void;
  clearContent: () => void;
  setStreamMessageId: (streamMessageId: string | null) => void;
}

const useAiStreamStore = create<AiStreamStore>()((set) => ({
  content: "",
  streamMessageId: null,
  addContent: (newContent: string) =>
    set((state) => ({ content: state.content + newContent })),
  clearContent: () => set({ content: "" }),
  setStreamMessageId: (streamMessageId: string | null) =>
    set({ streamMessageId })
}));

export default useAiStreamStore;
