import { ActionCtx, MutationCtx, QueryCtx } from "backend/_generated/server";
import { ConvexError } from "convex/values";

async function getIdentity(ctx: QueryCtx | MutationCtx | ActionCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new ConvexError("Not authenticated.");
  }
  return identity;
}

export default getIdentity;
