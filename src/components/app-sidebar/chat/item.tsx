import { memo } from "react";
import type { Id } from "backend/_generated/dataModel";
import { api } from "backend/_generated/api";
import { Link, useParams } from "@tanstack/react-router";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Loader2, MessageSquare } from "lucide-react";
import { useMutation } from "convex/react";

const ChatItem = memo(function ChatItem({
  chatId,
  title
}: {
  chatId: Id<"chats">;
  title: string;
}) {
  const { chatId: activeChatId } = useParams({ strict: false });
  const openChat = useMutation(api.chat.functions.openChat);
  const isNewChat = title === "New chat";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={chatId === activeChatId}
        disabled={isNewChat}
      >
        <Link
          to="/chat/$chatId"
          params={{
            chatId
          }}
          onClick={() => void openChat({ chatId })}
        >
          {isNewChat ? <Loader2 className="animate-spin" /> : <MessageSquare />}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

export default ChatItem;
