import type { Id } from "backend/_generated/dataModel";
import { create } from "zustand";

type NewChatFirstMessageType = {
  role: "user";
  name: string;
  content: string;
  chatId?: Id<"chats">;
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
