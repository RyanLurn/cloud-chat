import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

function AppSidebarTrigger() {
  const { open, toggleSidebar } = useSidebar();

  if (open) {
    return null;
  }

  return (
    <div className="fixed top-2 left-2">
      <Button onClick={toggleSidebar} variant="outline" size="icon">
        <PanelLeftOpen className="size-5" />
      </Button>
    </div>
  );
}

export default AppSidebarTrigger;
