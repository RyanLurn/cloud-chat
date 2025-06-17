import MessageContent from "@/features/chat/components/message/content";
import { useAutoScrollContext } from "@/features/chat/contexts/auto-scroll";
import {
  CHARACTER_PER_INTERVAL,
  STREAM_SPEED
} from "@/features/chat/lib/constants";
import useRenderStore from "@/features/chat/stores/render";
import type { Id } from "backend/_generated/dataModel";
import { useEffect, useRef } from "react";

function StreamRenderer({
  bufferedContent,
  messageId,
  streamId
}: {
  bufferedContent: string;
  messageId: Id<"messages">;
  streamId: Id<"streams"> | null;
}) {
  const renderedContent = useRenderStore(
    (state) => state.renderedContentRegistry.get(messageId) ?? ""
  );
  const setRenderedContent = useRenderStore(
    (state) => state.setRenderedContent
  );
  const deleteRenderedContent = useRenderStore(
    (state) => state.deleteRenderedContent
  );
  const intervalRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (bufferedContent.length > renderedContent.length) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        const nextIndex = renderedContent.length;
        if (nextIndex < bufferedContent.length) {
          setRenderedContent(
            messageId,
            bufferedContent.slice(0, nextIndex + CHARACTER_PER_INTERVAL)
          );
        } else {
          window.clearInterval(intervalRef.current);
          setRenderedContent(messageId, bufferedContent);
        }
      }, 1000 / STREAM_SPEED);
    } else if (streamId === null) {
      deleteRenderedContent(messageId);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    bufferedContent,
    renderedContent,
    messageId,
    setRenderedContent,
    streamId,
    deleteRenderedContent
  ]);

  const { scrollToBottom } = useAutoScrollContext();
  useEffect(() => {
    scrollToBottom();
  }, [renderedContent, scrollToBottom]);

  return <MessageContent content={renderedContent} />;
}

export default StreamRenderer;
