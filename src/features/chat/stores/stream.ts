import type { Doc, Id } from "backend/_generated/dataModel";
import { create } from "zustand";

interface StreamStore {
  streamMessages: Doc<"messages">[];
  addStreamMessage: (streamMessage: Doc<"messages">) => void;
  removeStreamMessage: (targetMessageId: Id<"messages">) => void;
  addStreamingContent: (
    targetMessageId: Id<"messages">,
    addedContent: string
  ) => void;
  finishStreaming: (targetMessageId: Id<"messages">) => void;
}

const useStreamStore = create<StreamStore>()((set) => ({
  streamMessages: [],
  addStreamMessage: (streamMessage: Doc<"messages">) =>
    set((state) => ({
      streamMessages: [...state.streamMessages, streamMessage]
    })),
  removeStreamMessage: (targetMessageId: Id<"messages">) =>
    set((state) => ({
      streamMessages: state.streamMessages.filter(
        (message) => message._id !== targetMessageId
      )
    })),
  addStreamingContent: (
    targetMessageId: Id<"messages">,
    addedContent: string
  ) =>
    set((state) => ({
      streamMessages: state.streamMessages.map((message) => {
        if (message._id === targetMessageId) {
          return {
            ...message,
            content: message.content + addedContent
          };
        }
        return message;
      })
    })),
  finishStreaming: (targetMessageId: Id<"messages">) =>
    set((state) => ({
      streamMessages: state.streamMessages.map((message) => {
        if (message._id === targetMessageId) {
          return {
            ...message,
            isStreaming: false
          };
        }
        return message;
      })
    }))
}));

export default useStreamStore;
