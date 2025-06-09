import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton
} from "@/components/ui/sidebar";

function LoadingGroup({ items }: { items: number }) {
  return (
    <SidebarMenu>
      {Array.from({ length: items }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default LoadingGroup;
