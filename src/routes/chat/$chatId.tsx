import ScreenLoader from "@/components/screen-loader";
import ChatMessages from "@/features/chat/components/messages";
import NewChatFirstMessage from "@/features/chat/components/new-chat-first-message";
import PromptContainer from "@/features/chat/components/prompt/container";
import useNewChatStore from "@/features/chat/stores/new-chat";
import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";

export const Route = createFileRoute("/chat/$chatId")({
  component: ChatPage
});

function ChatPage() {
  const { chatId } = Route.useParams();
  const newChatFirstMessage = useNewChatStore(
    (state) => state.newChatFirstMessage
  );

  try {
    const chat = useQuery(api.chat.functions.getChatById, {
      chatId: chatId as Id<"chats">
    });

    return (
      <>
        {chat ? (
          <ChatMessages chatId={chat._id} />
        ) : newChatFirstMessage && newChatFirstMessage.chatId === chatId ? (
          <NewChatFirstMessage newChatFirstMessage={newChatFirstMessage} />
        ) : (
          <ScreenLoader parentName="your chat" />
        )}
        <PromptContainer />
      </>
    );
  } catch (error) {
    const errorMessage =
      error instanceof ConvexError ? (error.data as string) : "404 Not Found";

    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-destructive">
          {errorMessage}
        </h3>
        <Link to="/">New chat</Link>
      </div>
    );
  }
}
