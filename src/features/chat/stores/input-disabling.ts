import type { Id } from "backend/_generated/dataModel";
import { create } from "zustand";

interface InputDisablingStore {
  isNewChatDisabled: boolean;
  disabledChats: Set<Id<"chats">>;
  disableNewChat: () => void;
  enableNewChat: () => void;
  disableChat: (chatId: Id<"chats">) => void;
  enableChat: (chatId: Id<"chats">) => void;
}

const useInputDisablingStore = create<InputDisablingStore>()((set) => ({
  isNewChatDisabled: false,
  disabledChats: new Set(),
  disableNewChat: () => set({ isNewChatDisabled: true }),
  enableNewChat: () => set({ isNewChatDisabled: false }),
  disableChat: (chatId: Id<"chats">) =>
    set((state) => ({
      disabledChats: new Set(state.disabledChats).add(chatId)
    })),
  enableChat: (chatId: Id<"chats">) =>
    set((state) => {
      const newSet = new Set(state.disabledChats);
      newSet.delete(chatId);
      return { disabledChats: newSet };
    })
}));

export default useInputDisablingStore;
