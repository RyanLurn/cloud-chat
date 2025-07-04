import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: "/chat" });
  },
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
