import { httpAction } from "backend/_generated/server";
import verifyWebhook from "backend/features/auth/webhook/verifyWebhook";

const userEndpointHandler = httpAction(async (_ctx, req) => {
  const event = await verifyWebhook(req);
  if (!event) {
    return new Response("Error occured", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      console.log("User created", event.data);
      break;
    case "user.updated":
      console.log("User updated", event.data);
      break;
    case "user.deleted":
      console.log("User deleted", event.data);
      break;
    default:
      console.log("Ignored Clerk webhook event", event.type);
  }

  return new Response(null, { status: 200 });
});

export default userEndpointHandler;
