import { create } from "zustand";

interface NewMessage {
  name: string;
  content: string;
}

interface NewChatStore {
  newMessage: NewMessage | null;
  setNewMessage: (newMessage: NewMessage | null) => void;
}

const useNewChatStore = create<NewChatStore>()((set) => ({
  newMessage: null,
  setNewMessage: (newMessage: NewMessage | null) => set({ newMessage })
}));

export default useNewChatStore;
export type { NewMessage };
