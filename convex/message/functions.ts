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
    streamMessage: MessageOutputSchema
  },
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });
    await ctx.db.insert("messages", {
      ...args,
      isStreaming: false,
      userId: chat.userId
    });
    const assistantMessageInput = {
      role: "assistant",
      content: "",
      name: "Nimbus",
      isStreaming: true,
      userId: chat.userId,
      chatId: chat._id
    } as const;
    const assistantMessageId = await ctx.db.insert(
      "messages",
      assistantMessageInput
    );
    const streamMessage = {
      ...assistantMessageInput,
      _id: assistantMessageId,
      _creationTime: Date.now()
    };
    return {
      streamMessage
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
    text: v.string(),
    isStreaming: v.boolean()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.streamMessageId, {
      content: args.text,
      isStreaming: args.isStreaming
    });
  }
});

export { addMessagePairToChat, listMessagesFromChat, updateStreamMessage };
