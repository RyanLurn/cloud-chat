import { useCallback, useRef, useState } from "react";

function useAutoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const isAutoScrollingRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (shouldAutoScroll && container) {
      isAutoScrollingRef.current = true;
      container.scrollTop = container.scrollHeight;

      requestAnimationFrame(() => {
        isAutoScrollingRef.current = false;
      });
    }
  }, [shouldAutoScroll]);

  const handleScroll = useCallback(() => {
    if (isAutoScrollingRef.current) return;
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setShouldAutoScroll(isAtBottom);
    }
  }, []);

  return {
    containerRef,
    endRef,
    scrollToBottom,
    handleScroll
  };
}

export default useAutoScroll;
