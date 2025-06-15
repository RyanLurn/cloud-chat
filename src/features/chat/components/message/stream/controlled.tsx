import MessageContent from "@/features/chat/components/message/content";
import { useAutoScrollContext } from "@/features/chat/contexts/auto-scroll";
import {
  CHARACTER_PER_INTERVAL,
  STREAM_SPEED
} from "@/features/chat/lib/constants";
import usePromptStore from "@/features/chat/stores/prompt";
import useStreamStore from "@/features/chat/stores/stream";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";

function ControlledStream({
  id,
  content,
  isStreaming,
  streamId
}: {
  id: Id<"messages">;
  content: string;
  isStreaming: boolean;
  streamId: Id<"streams">;
}) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [buffer, setBuffer] = useState("");
  const intervalRef = useRef<number | undefined>(undefined);

  const clearStream = useMutation(api.message.functions.clearStream);
  const removeStream = useStreamStore((state) => state.removeStream);
  const stopSending = usePromptStore((state) => state.stopSending);

  const { scrollToBottom } = useAutoScrollContext();

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
    if (isStreaming === false && buffer.length === displayedContent.length) {
      void clearStream({ messageId: id });
      return () => {
        removeStream(streamId);
        stopSending();
      };
    }
  }, [
    buffer,
    displayedContent,
    id,
    isStreaming,
    streamId,
    clearStream,
    removeStream,
    stopSending
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedContent, scrollToBottom]);

  return <MessageContent content={displayedContent || "*Thinking...*"} />;
}

export default ControlledStream;
