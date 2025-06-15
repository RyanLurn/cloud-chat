import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { env } from "@/lib/env";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient(env.VITE_CONVEX_URL);

function ServiceProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ServiceProviders;
