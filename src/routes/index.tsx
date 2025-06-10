import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
import PromptContainer from "@/features/chat/components/prompt/container";
import useNewChatStore from "@/features/chat/stores/new-chat";
export const Route = createFileRoute("/")({
  component: App
});

function App() {
  const { user } = useUser();
  const isCreating = useNewChatStore((state) => state.isCreating);

  if (!user) return <ScreenLoader />;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="mx-auto mt-6 flex w-full max-w-3xl flex-1 flex-col gap-y-9">
        {isCreating ? (
          <ScreenLoader />
        ) : (
          <>
            <div className="w-full flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Welcome back, {user.fullName}
              </h3>
            </div>
            <PromptContainer />
          </>
        )}
      </div>
    </div>
  );
}
