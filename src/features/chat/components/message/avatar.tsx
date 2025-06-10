import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { memo } from "react";

// Memoized because MessageBubble (this component's parent) can rerender because message.content changes
const MessageAvatar = memo(function MessageAvatar({ name }: { name: string }) {
  const { user } = useUser();
  const fallback = name.slice(0, 2).toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
});

export default MessageAvatar;
