import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Cloud, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

function AppSidebarHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarHeader>
      <div className="ml-2 flex items-center gap-x-2">
        <Cloud className="size-5" />
        <span>Cloud Chat</span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto cursor-pointer"
          onClick={toggleSidebar}
        >
          <PanelLeftClose className="size-5" />
        </Button>
      </div>
    </SidebarHeader>
  );
}

export default AppSidebarHeader;
