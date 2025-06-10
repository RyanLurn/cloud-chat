import ScreenLoader from "@/components/screen-loader";
import ChatMessages from "@/features/chat/components/messages";
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

  try {
    const chat = useQuery(api.chat.functions.getChatById, {
      chatId: chatId as Id<"chats">
    });
    if (!chat) return <ScreenLoader />;

    return (
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <div className="mx-auto mt-6 flex w-full max-w-3xl flex-1 flex-col gap-y-9">
          <ChatMessages chatId={chat._id} />
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof ConvexError ? (error.data as string) : "404 Not Found";

    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-destructive">
          {errorMessage}
        </h3>
        <Link to="/">New chat</Link>
      </div>
    );
  }
}
