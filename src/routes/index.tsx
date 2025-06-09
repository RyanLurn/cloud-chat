import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import ScreenLoader from "@/components/screen-loader";
export const Route = createFileRoute("/")({
  component: App
});

function App() {
  const { user } = useUser();

  if (!user) return <ScreenLoader />;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-y-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Welcome back, {user.fullName}
      </h3>
    </div>
  );
}
