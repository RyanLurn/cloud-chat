import { create } from "zustand";

interface NewChatStore {
  isCreating: boolean;
  startCreating: () => void;
  stopCreating: () => void;
}

const useNewChatStore = create<NewChatStore>()((set) => ({
  isCreating: false,
  startCreating: () => set({ isCreating: true }),
  stopCreating: () => set({ isCreating: false })
}));

export default useNewChatStore;
