import { create } from "zustand";

type NewChatFirstMessageType = {
  name: string;
  content: string;
};

interface NewChatStore {
  newChatFirstMessage: NewChatFirstMessageType | null;
  setNewChatFirstMessage: (
    newChatFirstMessage: NewChatFirstMessageType | null
  ) => void;
}

const useNewChatStore = create<NewChatStore>()((set) => ({
  newChatFirstMessage: null,
  setNewChatFirstMessage: (
    newChatFirstMessage: NewChatFirstMessageType | null
  ) => set({ newChatFirstMessage })
}));

export default useNewChatStore;
export type { NewChatFirstMessageType };
