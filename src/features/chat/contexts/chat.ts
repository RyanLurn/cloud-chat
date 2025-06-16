import type { Doc } from "backend/_generated/dataModel";
import { createContext } from "react";

const ChatContext = createContext<Doc<"chats"> | undefined>(undefined);

export default ChatContext;
