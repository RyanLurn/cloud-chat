import { mutation, query } from "backend/_generated/server";
import getChatAccess from "backend/chat/lib/authorize";
import { v } from "convex/values";
import { MessageOutputSchema } from "backend/message/schema";

const send = mutation({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    name: v.string(),
    chatId: v.id("chats")
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });
    await ctx.db.insert("messages", {
      ...args,
      streamId: null,
      userId: chat.userId
    });
    const streamId = await ctx.db.insert("streams", {
      name: "Nimbus",
      content: ""
    });
    const assistantMessageInput = {
      role: "assistant",
      content: "",
      name: "Nimbus",
      streamId: streamId,
      userId: chat.userId,
      chatId: chat._id
    } as const;
    const assistantMessageId = await ctx.db.insert(
      "messages",
      assistantMessageInput
    );
    return assistantMessageId;
  }
});

const list = query({
  args: { chatId: v.id("chats") },
  returns: v.array(MessageOutputSchema),
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (query) => query.eq("chatId", chat._id))
      .collect();

    return messages;
  }
});

export { send, list };
