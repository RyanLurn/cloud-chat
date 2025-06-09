import { api } from "backend/_generated/api";
import { useQuery } from "convex/react";
import LoadingGroup from "@/components/app-sidebar/utils/loading-group";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar";
import ChatItem from "@/components/app-sidebar/chat/item";
import ChatGroupAction from "@/components/app-sidebar/chat/group-action";

function ChatGroup() {
  const chats = useQuery(api.chat.functions.listChatsFromUser);

  if (!chats) return <LoadingGroup items={5} />;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <ChatGroupAction />
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.map((chat) => (
            <ChatItem key={chat._id} chatId={chat._id} title={chat.title} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default ChatGroup;
