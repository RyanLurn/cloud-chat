import type { Doc } from "backend/_generated/dataModel";
import { useEffect, useRef, useState } from "react";

function useAutoScroll({
  messages,
  isStreaming
}: {
  messages: Doc<"messages">[] | undefined;
  isStreaming: boolean;
}) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleScroll() {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
      setShouldAutoScroll(isAtBottom);
    }
  }

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    if (isStreaming && shouldAutoScroll) {
      scrollToBottom();
    }
  }, [isStreaming, shouldAutoScroll]);

  return {
    messagesContainerRef,
    messagesEndRef,
    handleScroll
  };
}

export default useAutoScroll;
