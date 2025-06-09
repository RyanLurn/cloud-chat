import { MutationCtx } from "backend/_generated/server";

async function getUserByExternalId({
  ctx,
  externalId
}: {
  ctx: MutationCtx;
  externalId: string;
}) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_externalId", (query) => query.eq("externalId", externalId))
    .unique();

  return user;
}

export { getUserByExternalId };
