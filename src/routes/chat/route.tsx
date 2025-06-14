import { AutoScrollContext } from "@/features/chat/contexts/auto-scroll";
import useAutoScroll from "@/features/chat/hooks/use-auto-scroll";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component: ChatLayout
});

function ChatLayout() {
  const { containerRef, endRef, scrollToBottom, handleScroll } =
    useAutoScroll();
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex h-full w-full flex-col overflow-y-auto"
    >
      <AutoScrollContext.Provider value={{ endRef, scrollToBottom }}>
        <div className="mx-auto mt-6 flex w-full max-w-3xl flex-1 flex-col gap-y-9">
          <Outlet />
        </div>
      </AutoScrollContext.Provider>
    </div>
  );
}
