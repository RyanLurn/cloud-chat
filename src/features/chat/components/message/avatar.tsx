import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";

// Memoized because MessageBubble (this component's parent) can rerender because message.content changes
const MessageAvatar = memo(function MessageAvatar({
  name,
  imgUrl,
  imgAlt
}: {
  name: string;
  imgUrl?: string;
  imgAlt?: string;
}) {
  const fallback = name.slice(0, 2).toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={imgUrl} alt={imgAlt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
});

export default MessageAvatar;
