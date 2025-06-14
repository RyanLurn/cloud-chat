import MessageContent from "@/features/chat/components/message/content";
import {
  CHARACTER_PER_INTERVAL,
  STREAM_SPEED
} from "@/features/chat/lib/constants";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";

function ControlledStream({
  id,
  content,
  isStreaming
}: {
  id: Id<"messages">;
  content: string;
  isStreaming: boolean;
}) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [buffer, setBuffer] = useState("");
  const intervalRef = useRef<number | undefined>(undefined);

  const clearStream = useMutation(api.message.functions.clearStream);

  useEffect(() => {
    setBuffer(content);
  }, [content]);

  useEffect(() => {
    if (buffer.length > displayedContent.length) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        setDisplayedContent((prev) => {
          const nextIndex = prev.length;
          if (nextIndex < buffer.length) {
            return buffer.slice(0, nextIndex + CHARACTER_PER_INTERVAL);
          } else {
            window.clearInterval(intervalRef.current);
            return buffer;
          }
        });
      }, 1000 / STREAM_SPEED);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [buffer, displayedContent]);

  useEffect(() => {
    if (isStreaming === false && buffer.length === displayedContent.length)
      void clearStream({ messageId: id });
  });

  return <MessageContent content={displayedContent || "*Thinking...*"} />;
}

export default ControlledStream;
