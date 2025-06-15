import AppSidebar from "@/components/app-sidebar/main";
import AppSidebarTrigger from "@/components/app-sidebar/utils/trigger";
import ScreenLoader from "@/components/screen-loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme";
import { SignIn, UserButton } from "@clerk/clerk-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export const Route = createRootRoute({
  component: RootLayout
});

function RootLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Unauthenticated>
          <div className="flex h-screen w-screen items-center justify-center">
            <SignIn />
          </div>
        </Unauthenticated>
        <Authenticated>
          <SidebarProvider>
            <AppSidebar />
            <main className="h-screen w-screen">
              <AppSidebarTrigger />
              <Outlet />
              <div className="fixed top-2 right-2">
                <UserButton />
              </div>
            </main>
          </SidebarProvider>
        </Authenticated>
        <AuthLoading>
          <div className="h-screen w-screen">
            <ScreenLoader />
          </div>
        </AuthLoading>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  );
}
