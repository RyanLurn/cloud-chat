import { create } from "zustand";

interface FirstMessage {
  role: "user";
  name: string;
  content: string;
}

interface FirstChatMessage extends FirstMessage {
  chatIdParam: string;
}

interface NewChatStore {
  firstMessage: FirstMessage | null;
  firstChatMessages: FirstChatMessage[];
  setFirstMessage: (message: FirstMessage | null) => void;
  addFirstChatMessage: (message: FirstChatMessage) => void;
  removeFirstChatMessage: (chatIdParam: string) => void;
}

const useNewChatStore = create<NewChatStore>((set) => ({
  firstMessage: null,
  firstChatMessages: [],
  setFirstMessage: (message: FirstMessage | null) => {
    set({ firstMessage: message });
  },
  addFirstChatMessage: (message: FirstChatMessage) => {
    set((state) => ({
      firstChatMessages: [...state.firstChatMessages, message]
    }));
  },
  removeFirstChatMessage: (chatIdParam: string) => {
    set((state) => ({
      firstChatMessages: state.firstChatMessages.filter(
        (m) => m.chatIdParam !== chatIdParam
      )
    }));
  }
}));

export default useNewChatStore;
export type { FirstMessage };
