import { Id } from "backend/_generated/dataModel";
import { MutationCtx, QueryCtx } from "backend/_generated/server";
import { getCurrentUser } from "backend/auth/lib/authenticate";
import { ConvexError } from "convex/values";

async function getChatAccess({
  ctx,
  chatId
}: {
  ctx: QueryCtx | MutationCtx;
  chatId: Id<"chats">;
}) {
  const user = await getCurrentUser(ctx);

  const chat = await ctx.db.get(chatId);

  if (chat === null) {
    throw new ConvexError("Chat not found.");
  }

  if (chat.isPublic) {
    return chat;
  }

  if (chat.userId === user._id) {
    return chat;
  } else {
    throw new ConvexError("Not authorized.");
  }
}

export default getChatAccess;
