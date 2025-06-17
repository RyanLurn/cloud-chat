import type { Id } from "backend/_generated/dataModel";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface HttpStream {
  id: Id<"streams">;
  content: string;
}

interface StreamStore {
  streams: HttpStream[];
  addStream: (streamId: Id<"streams">) => void;
  removeStream: (streamId: Id<"streams">) => void;
  updateStreamContent: (streamId: Id<"streams">, addedContent: string) => void;
}

const useStreamStore = create(
  devtools<StreamStore>(
    (set) => ({
      streams: [],
      addStream: (streamId: Id<"streams">) =>
        set((state) => ({
          streams: [...state.streams, { id: streamId, content: "" }]
        })),
      removeStream: (streamId: Id<"streams">) =>
        set((state) => ({
          streams: state.streams.filter((stream) => stream.id !== streamId)
        })),
      updateStreamContent: (streamId: Id<"streams">, addedContent: string) =>
        set((state) => ({
          streams: state.streams.map((stream) => {
            if (stream.id === streamId) {
              return { ...stream, content: stream.content + addedContent };
            }
            return stream;
          })
        }))
    }),
    { name: "Stream Store", store: "stream-store" }
  )
);

export default useStreamStore;
