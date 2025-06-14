import { env } from "@/lib/env";
import type { AiStreamRequestBodyType } from "backend/ai/lib/validator";

async function fetchAiStream({
  assistantMessageId,
  streamId,
  chatId,
  isResumable,
  token
}: AiStreamRequestBodyType & { token: string | null }) {
  const convexUrl = env.VITE_CONVEX_URL.replace(/\.cloud$/, ".site");
  const response = await fetch(`${convexUrl}/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      assistantMessageId,
      streamId,
      chatId,
      isResumable
    })
  });
  return response;
}

export default fetchAiStream;
