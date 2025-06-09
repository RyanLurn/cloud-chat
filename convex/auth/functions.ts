import { internalMutation } from "backend/_generated/server";
import { UserJSON, DeletedObjectJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import { getUserByExternalId } from "backend/auth/lib/utils";

const insertFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getUserByExternalId({ ctx, externalId: args.data.id });

    if (user === null) {
      await ctx.db.insert("users", {
        tier: "free",
        externalId: args.data.id
      });
    } else {
      console.warn("User already exists. Event's data:", args.data);
    }
  }
});

const deleteFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<DeletedObjectJSON>
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getUserByExternalId({ ctx, externalId: args.data.id! }); // Webhook user.deleted event always has id according to Clerk event catalog

    if (user === null) {
      console.warn("User does not exist. Event's data:", args.data);
    } else {
      await ctx.db.delete(user._id);
    }
  }
});

export { insertFromClerk, deleteFromClerk };
