import { Id } from "backend/_generated/dataModel";
import { MutationCtx, QueryCtx } from "backend/_generated/server";
import { getCurrentUser } from "backend/auth/lib/authenticate";
import { ConvexError } from "convex/values";

async function getMessageAccess({
  ctx,
  messageId
}: {
  ctx: QueryCtx | MutationCtx;
  messageId: Id<"messages">;
}) {
  const user = await getCurrentUser(ctx);

  const message = await ctx.db.get(messageId);

  if (message === null) {
    throw new ConvexError("Message not found.");
  }

  if (message.userId === user._id) {
    return message;
  } else {
    throw new ConvexError("Not authorized.");
  }
}

export default getMessageAccess;
