import { Loader2 } from "lucide-react";

export default function ScreenLoader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary sm:h-12 sm:w-12" />
      <p className="text-lg font-medium text-muted-foreground sm:text-xl">
        Loading, please wait...
      </p>
    </div>
  );
}
