import type { Id } from "backend/_generated/dataModel";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RenderStore {
  renderedContentRegistry: Map<Id<"messages">, string>;
  setRenderedContent: (messageId: Id<"messages">, content: string) => void;
  deleteRenderedContent: (messageId: Id<"messages">) => void;
}

const useRenderStore = create(
  devtools<RenderStore>(
    (set) => ({
      renderedContentRegistry: new Map(),
      setRenderedContent: (messageId, content) =>
        set((state) => ({
          renderedContentRegistry: new Map(state.renderedContentRegistry).set(
            messageId,
            content
          )
        })),
      deleteRenderedContent: (messageId) =>
        set((state) => {
          const newRegistry = new Map(state.renderedContentRegistry);
          newRegistry.delete(messageId);
          return { renderedContentRegistry: newRegistry };
        })
    }),
    { name: "Render Store", store: "render-store" }
  )
);

export default useRenderStore;
