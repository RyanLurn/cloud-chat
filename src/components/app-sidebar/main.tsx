import AppSidebarHeader from "@/components/app-sidebar/header";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import ChatGroup from "@/components/app-sidebar/chat/group";

function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>
        <ChatGroup />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
