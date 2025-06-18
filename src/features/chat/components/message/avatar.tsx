import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { memo } from "react";
import nimbusImgUrl from "@/assets/nimbus-profile.jpg";

// Memoized because MessageBubble (this component's parent) can rerender because message.content changes
const MessageAvatar = memo(function MessageAvatar({
  role,
  name
}: {
  role: "user" | "assistant";
  name: string;
}) {
  const { user } = useUser();
  const fallback = name.slice(0, 2).toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={role === "user" ? user?.imageUrl : nimbusImgUrl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
});

export default MessageAvatar;
