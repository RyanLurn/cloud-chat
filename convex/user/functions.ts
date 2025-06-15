import { mutation, query } from "backend/_generated/server";
import { SupportedModel } from "backend/ai/lib/models";
import { getCurrentUser } from "backend/auth/lib/authenticate";
import { UserOutputSchema } from "backend/user/schema";
import { v } from "convex/values";

const get = query({
  returns: UserOutputSchema,
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return user;
  }
});

const changeModel = mutation({
  args: {
    newModel: SupportedModel
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    await ctx.db.patch(user._id, { model: args.newModel });
  }
});

export { get, changeModel };
