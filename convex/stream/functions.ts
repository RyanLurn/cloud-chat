import { internalMutation } from "backend/_generated/server";
import { v } from "convex/values";

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

export { updateContent };
