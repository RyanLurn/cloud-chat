import { createGroq } from "@ai-sdk/groq";
import { env } from "backend/ai/lib/env";

const groq = createGroq({
  apiKey: env.GROQ_API_KEY
});

export { groq };
