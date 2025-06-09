import AppSidebarHeader from "@/components/app-sidebar/header";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>Chat</SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
