import { create } from "zustand";

interface AiStreamStore {
  content: string;
  streamMessageId: string | null;
  showStreaming: boolean;
  addContent: (newContent: string) => void;
  clearContent: () => void;
  setStreamMessageId: (streamMessageId: string | null) => void;
  startShowingStream: () => void;
  stopShowingStream: () => void;
}

const useAiStreamStore = create<AiStreamStore>()((set) => ({
  content: "",
  streamMessageId: null,
  showStreaming: false,
  addContent: (newContent: string) =>
    set((state) => ({ content: state.content + newContent })),
  clearContent: () => set({ content: "" }),
  setStreamMessageId: (streamMessageId: string | null) =>
    set({ streamMessageId }),
  startShowingStream: () => set({ showStreaming: true }),
  stopShowingStream: () => set({ showStreaming: false })
}));

export default useAiStreamStore;
