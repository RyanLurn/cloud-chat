import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import useNewChatStore from "@/features/chat/stores/new-chat";

export const Route = createFileRoute("/chat/")({
  component: NewChatPage
});

function NewChatPage() {
  const { user } = useUser();
  const isCreating = useNewChatStore((state) => state.isCreating);

  if (!user || isCreating) return <ScreenLoader />;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Welcome back, {user.fullName}
      </h3>
    </div>
  );
}
