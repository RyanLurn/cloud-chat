import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import useNewChatStore from "@/features/chat/stores/new-chat";
import PromptContainer from "@/features/chat/components/prompt/container";
import NewChatFirstMessage from "@/features/chat/components/new-chat-first-message";

export const Route = createFileRoute("/chat/")({
  component: NewChatPage
});

function NewChatPage() {
  const { user } = useUser();
  const newChatFirstMessage = useNewChatStore(
    (state) => state.newChatFirstMessage
  );

  if (!user) return <ScreenLoader parentName="new chat page" />;

  return (
    <>
      {newChatFirstMessage ? (
        <NewChatFirstMessage newChatFirstMessage={newChatFirstMessage} />
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
