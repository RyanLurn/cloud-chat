import type {
  ActionCtx,
  MutationCtx,
  QueryCtx
} from "backend/_generated/server";
import { ConvexError } from "convex/values";

async function getUserByExternalId({
  ctx,
  externalId
}: {
  ctx: QueryCtx | MutationCtx;
  externalId: string;
}) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_externalId", (query) => query.eq("externalId", externalId))
    .unique();

  return user;
}

async function getCurrentIdentity(ctx: QueryCtx | MutationCtx | ActionCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new ConvexError("Not authenticated.");
  }
  return identity;
}

async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const { subject } = await getCurrentIdentity(ctx);
  const user = await getUserByExternalId({ ctx, externalId: subject });
  if (user === null) {
    throw new ConvexError("Current user does not exist.");
  }
  return user;
}

export { getUserByExternalId, getCurrentIdentity, getCurrentUser };
