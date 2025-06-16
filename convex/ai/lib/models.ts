import { Infer, v } from "convex/values";

const SupportedModel = v.union(
  v.object({
    provider: v.literal("groq"),
    name: v.literal("meta-llama/llama-4-maverick-17b-128e-instruct")
  }),
  v.object({
    provider: v.literal("groq"),
    name: v.literal("deepseek-r1-distill-llama-70b")
  }),
  v.object({
    provider: v.literal("openrouter"),
    name: v.literal("openai/o4-mini")
  }),
  v.object({
    provider: v.literal("openrouter"),
    name: v.literal("anthropic/claude-sonnet-4")
  }),
  v.object({
    provider: v.literal("openrouter"),
    name: v.literal("deepseek/deepseek-r1-0528")
  })
);

type SupportedModelType = Infer<typeof SupportedModel>;

export { SupportedModel };
export type { SupportedModelType };
