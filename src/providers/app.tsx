import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { api } from "backend/_generated/api";
import type { Doc } from "backend/_generated/dataModel";
import { useQuery } from "convex/react";

const router = createRouter({ routeTree, context: { user: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

interface AppRouterContext {
  user: Doc<"users">;
}

function AppProvider() {
  const user = useQuery(api.user.functions.get);
  return <RouterProvider router={router} context={{ user }} />;
}

export default AppProvider;
export type { AppRouterContext };
