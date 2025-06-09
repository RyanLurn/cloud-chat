import { defineSchema } from "convex/server";
import { usersTable } from "backend/auth/schema";
import { chatsTable } from "backend/chat/schema";

const appSchema = defineSchema({
  users: usersTable,
  chats: chatsTable
});

export default appSchema;
