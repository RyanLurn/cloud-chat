import { internalMutation, query } from "backend/_generated/server";
import { getCurrentUser } from "backend/auth/lib/authenticate";
import { v } from "convex/values";

const getContent = query({
  args: { streamId: v.id("streams") },
  returns: v.string(),
  handler: async (ctx, args) => {
    await getCurrentUser(ctx);
    const stream = await ctx.db.get(args.streamId);
    if (stream === null) {
      console.warn("Stream not found");
      return "";
    }
    return stream.content;
  }
});

const updateContent = internalMutation({
  args: {
    streamId: v.id("streams"),
    newContent: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.streamId, { content: args.newContent });
  }
});

export { getContent, updateContent };
