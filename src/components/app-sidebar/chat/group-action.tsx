import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { memo } from "react";

const ChatGroupAction = memo(function ChatGroupAction() {
  return (
    <SidebarGroupAction title="New chat" asChild>
      <Link to="/">
        <Plus />
      </Link>
    </SidebarGroupAction>
  );
});

export default ChatGroupAction;
