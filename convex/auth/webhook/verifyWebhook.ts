import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { env } from "backend/auth/lib/env";

async function verifyWebhook(req: Request): Promise<WebhookEvent | null> {
  const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!
  };

  if (
    !svixHeaders["svix-id"] ||
    !svixHeaders["svix-timestamp"] ||
    !svixHeaders["svix-signature"]
  ) {
    console.error("Missing svix headers on request", req);
    return null;
  }

  const payloadString = await req.text();

  try {
    const event = webhook.verify(payloadString, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("Error verifying webhook event", error);
    return null;
  }
}

export default verifyWebhook;
