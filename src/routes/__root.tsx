import ScreenLoader from "@/components/screen-loader";
import { SignIn, UserButton } from "@clerk/clerk-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export const Route = createRootRoute({
  component: () => (
    <>
      <Unauthenticated>
        <div className="flex h-screen w-screen items-center justify-center">
          <SignIn />
        </div>
      </Unauthenticated>
      <Authenticated>
        <main className="h-screen w-screen">
          <div className="h-full w-full overflow-y-auto">
            <Outlet />
            <div className="fixed top-2 right-2">
              <UserButton />
            </div>
          </div>
        </main>
      </Authenticated>
      <AuthLoading>
        <div className="h-screen w-screen">
          <ScreenLoader />
        </div>
      </AuthLoading>
      <TanStackRouterDevtools />
    </>
  )
});
