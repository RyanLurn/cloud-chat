import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import useNewChatStore from "@/features/chat/stores/new-chat";
import PromptContainer from "@/features/chat/components/prompt/container";
import MessageBubble from "@/features/chat/components/message/bubble";
import { useEffect } from "react";

export const Route = createFileRoute("/chat/")({
  component: NewChatPage
});

function NewChatPage() {
  const { user } = useUser();
  const newMessage = useNewChatStore((state) => state.newMessage);
  const setNewMessage = useNewChatStore((state) => state.setNewMessage);

  useEffect(() => {
    setNewMessage(null);
  }, [setNewMessage]);

  if (!user) return <ScreenLoader parentName="NewChatPage" />;

  return (
    <>
      {newMessage ? (
        <div className="w-full flex-1">
          <MessageBubble name={newMessage.name} content={newMessage.content} />
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
