import { defineSchema } from "convex/server";
import { usersTable } from "backend/auth/schema";
import { chatsTable } from "backend/chat/schema";
import { messagesTable } from "backend/message/schema";
import { streamsTable } from "backend/stream/schema";

const appSchema = defineSchema({
  users: usersTable,
  chats: chatsTable,
  messages: messagesTable,
  streams: streamsTable
});

export default appSchema;
