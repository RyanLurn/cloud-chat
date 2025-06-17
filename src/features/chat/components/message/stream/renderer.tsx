import MessageContent from "@/features/chat/components/message/content";
import { useAutoScrollContext } from "@/features/chat/contexts/auto-scroll";
import {
  CHARACTER_PER_INTERVAL,
  STREAM_SPEED
} from "@/features/chat/lib/constants";
import { useEffect, useRef, useState } from "react";

function StreamRenderer({
  bufferedContent,
  stopRendering
}: {
  bufferedContent: string;
  stopRendering: () => void;
}) {
  const [renderedContent, setRenderedContent] = useState("");
  const intervalRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (bufferedContent.length > renderedContent.length) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        setRenderedContent((prev) => {
          const nextIndex = prev.length;
          if (nextIndex < bufferedContent.length) {
            return bufferedContent.slice(0, nextIndex + CHARACTER_PER_INTERVAL);
          } else {
            window.clearInterval(intervalRef.current);
            return bufferedContent;
          }
        });
      }, 1000 / STREAM_SPEED);
    } else stopRendering();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bufferedContent, renderedContent, stopRendering]);

  const { scrollToBottom } = useAutoScrollContext();
  useEffect(() => {
    scrollToBottom();
  }, [renderedContent, scrollToBottom]);

  return <MessageContent content={renderedContent || "*Thinking...*"} />;
}

export default StreamRenderer;
