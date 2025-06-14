import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import PromptContainer from "@/features/chat/components/prompt/container";
import useNewChatStore from "@/features/chat/stores/new-chat";
import MessageBubble from "@/features/chat/components/message/bubble";

export const Route = createFileRoute("/chat/")({
  component: NewChatPage
});

function NewChatPage() {
  const { user } = useUser();
  const firstMessage = useNewChatStore((state) => state.firstMessage);

  if (!user) return <ScreenLoader parentName="new chat page" />;

  return (
    <>
      {firstMessage ? (
        <div className="flex w-full flex-1 flex-col gap-y-6">
          <MessageBubble
            role={firstMessage.role}
            name={firstMessage.name}
            content={firstMessage.content}
          />
          <MessageBubble
            role="assistant"
            name="Nimbus"
            content="*Thinking...*"
          />
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Welcome back, {user.fullName}
          </h3>
        </div>
      )}
      <PromptContainer />
    </>
  );
}
