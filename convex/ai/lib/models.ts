import { v } from "convex/values";

const SupportedModel = v.union(
  v.object({
    provider: v.literal("groq"),
    name: v.literal("meta-llama/llama-4-maverick-17b-128e-instruct")
  }),
  v.object({
    provider: v.literal("groq"),
    name: v.literal("deepseek-r1-distill-llama-70b")
  })
);

export { SupportedModel };
