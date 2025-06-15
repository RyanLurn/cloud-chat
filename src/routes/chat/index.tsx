import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import PromptContainer from "@/features/chat/components/prompt/container";
import useNewChatStore from "@/features/chat/stores/new-chat";
import MessageBubble from "@/features/chat/components/message/bubble";
import type { Id } from "backend/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "backend/_generated/api";
import { ModelContext } from "@/features/chat/contexts/model";

export const Route = createFileRoute("/chat/")({
  component: NewChatPage
});

function NewChatPage() {
  const { user } = useUser();
  const firstMessage = useNewChatStore((state) => state.firstMessage);

  const convexUser = useQuery(api.user.functions.get);
  const changeModel = useMutation(api.user.functions.changeModel);

  if (!user) return <ScreenLoader parentName="new chat page" />;

  return (
    <>
      {firstMessage ? (
        <div className="flex w-full flex-1 flex-col gap-y-6">
          <MessageBubble
            id={crypto.randomUUID() as Id<"messages">}
            role={firstMessage.role}
            name={firstMessage.name}
            content={firstMessage.content}
            isStreaming={false}
            streamId={null}
          />
          <MessageBubble
            id={crypto.randomUUID() as Id<"messages">}
            role="assistant"
            name="Nimbus"
            content="*Thinking...*"
            isStreaming={false}
            streamId={null}
          />
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Welcome back, {user.fullName}
          </h3>
        </div>
      )}
      <ModelContext.Provider
        value={{
          model: convexUser?.model ?? null,
          changeModel: (newModel) => changeModel({ newModel })
        }}
      >
        <PromptContainer />
      </ModelContext.Provider>
    </>
  );
}
