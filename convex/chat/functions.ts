import { mutation, query } from "backend/_generated/server";
import { v } from "convex/values";
import getChatAccess from "backend/chat/lib/authorize";
import { getCurrentUser } from "backend/auth/lib/authenticate";
import { ChatOutputSchema } from "backend/chat/schema";

const getChatById = query({
  args: { chatId: v.id("chats") },
  returns: ChatOutputSchema,
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });
    return chat;
  }
});

const listChatsFromUser = query({
  returns: v.array(ChatOutputSchema),
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    const chats = await ctx.db
      .query("chats")
      .withIndex("by_userId_and_lastOpenTime", (query) =>
        query.eq("userId", user._id)
      )
      .order("desc")
      .collect();

    return chats;
  }
});

const openChat = mutation({
  args: { chatId: v.id("chats") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await getChatAccess({ ctx, chatId: args.chatId });
    await ctx.db.patch(chat._id, { lastOpenTime: Date.now() });
  }
});

export { getChatById, listChatsFromUser, openChat };
