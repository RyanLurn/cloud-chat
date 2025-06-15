import { SupportedModel } from "backend/ai/lib/models";
import systemFields from "backend/lib/systemFields";
import { defineTable } from "convex/server";
import { v } from "convex/values";

const chatFields = {
  title: v.string(),
  lastOpenTime: v.number(),
  model: SupportedModel,
  isPublic: v.boolean(),
  userId: v.id("users")
};

const ChatInputSchema = v.object(chatFields);
const ChatOutputSchema = v.object({
  ...systemFields("chats"),
  ...chatFields
});

const chatsTable = defineTable(ChatInputSchema).index(
  "by_userId_and_lastOpenTime",
  ["userId", "lastOpenTime"]
);

export { chatsTable, ChatInputSchema, ChatOutputSchema };
