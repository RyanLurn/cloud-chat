import { internalMutation, mutation, query } from "backend/_generated/server";
import getChatAccess from "backend/chat/lib/authorize";
import { v } from "convex/values";
import { MessageOutputSchema } from "backend/message/schema";

const addMessagePairToChat = mutation({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    name: v.string(),
    chatId: v.id("chats")
  },
  returns: {
    assistantMessageId: v.id("messages")
  },
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });
    await ctx.db.insert("messages", {
      ...args,
      userId: chat.userId
    });
    const assistantMessageId = await ctx.db.insert("messages", {
      role: "assistant",
      content: "",
      name: "Nimbus",
      userId: chat.userId,
      chatId: chat._id
    });
    return {
      assistantMessageId
    };
  }
});

const listMessagesFromChat = query({
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

const updateStreamMessage = internalMutation({
  args: {
    streamMessageId: v.id("messages"),
    text: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.streamMessageId, { content: args.text });
  }
});

export { addMessagePairToChat, listMessagesFromChat, updateStreamMessage };
