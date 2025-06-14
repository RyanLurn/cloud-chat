import systemFields from "backend/lib/systemFields";
import { defineTable } from "convex/server";
import { v } from "convex/values";

const messageFields = {
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
  name: v.string(),
  streamId: v.union(v.id("streams"), v.null()),
  userId: v.id("users"),
  chatId: v.id("chats")
};

const MessageInputSchema = v.object(messageFields);
const MessageOutputSchema = v.object({
  ...systemFields("messages"),
  ...messageFields
});

const messagesTable = defineTable(MessageInputSchema).index("by_chatId", [
  "chatId"
]);

export { messagesTable, MessageInputSchema, MessageOutputSchema };
