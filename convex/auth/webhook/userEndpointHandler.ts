import { httpAction } from "backend/_generated/server";
import { internal } from "backend/_generated/api";
import verifyWebhook from "backend/auth/webhook/verifyWebhook";

const userEndpointHandler = httpAction(async (ctx, req) => {
  const event = await verifyWebhook(req);
  if (!event) {
    return new Response("Error occured", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.auth.functions.insertFromClerk, {
        data: event.data
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.auth.functions.deleteFromClerk, {
        data: event.data
      });
      break;
    default:
      console.log("Ignored Clerk webhook event", event.type);
  }

  return new Response(null, { status: 200 });
});

export default userEndpointHandler;
