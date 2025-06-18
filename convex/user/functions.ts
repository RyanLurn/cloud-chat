import { internal } from "backend/_generated/api";
import {
  action,
  internalMutation,
  mutation,
  query
} from "backend/_generated/server";
import { SupportedModel } from "backend/ai/lib/models";
import {
  getCurrentIdentity,
  getCurrentUser
} from "backend/auth/lib/authenticate";
import encrypt from "backend/lib/crypto/encrypt";
import { ConvexError, v } from "convex/values";

const getModel = query({
  returns: SupportedModel,
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return user.model;
  }
});

const checkKey = query({
  returns: v.boolean(),
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return user.openRouterKey !== undefined;
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

const updateOpenRouterKey = internalMutation({
  args: {
    key: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const encryptedKey = await encrypt(args.key);
    await ctx.db.patch(user._id, { openRouterKey: encryptedKey });
  }
});

const saveOpenRouterKey = action({
  args: {
    key: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getCurrentIdentity(ctx);

    const url = "https://openrouter.ai/api/v1/key";
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${args.key}` }
    };

    const response = await fetch(url, options);
    if (response.status === 500) {
      console.error("Get Key Request Internal Server Error");
      throw new ConvexError(
        "There's a problem with OpenRouter's api server. Please try again later."
      );
    }
    if (response.status === 401) {
      console.error("Get Key Request Unauthorized Error");
      throw new ConvexError(
        "Your OpenRouter key is invalid. Please enter a different key."
      );
    }

    await ctx.runMutation(internal.user.functions.updateOpenRouterKey, {
      key: args.key
    });
  }
});

const revokeOpenRouterKey = mutation({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    await ctx.db.patch(user._id, { openRouterKey: undefined });
  }
});

export {
  getModel,
  checkKey,
  changeModel,
  updateOpenRouterKey,
  saveOpenRouterKey,
  revokeOpenRouterKey
};
