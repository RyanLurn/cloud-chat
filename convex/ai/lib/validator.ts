import { z } from "zod/v4";

const AiStreamRequestBody = z.object({
  assistantMessageId: z.string(),
  streamId: z.string(),
  chatId: z.string(),
  isResumable: z.boolean()
});

type AiStreamRequestBodyType = z.infer<typeof AiStreamRequestBody>;

export { AiStreamRequestBody };
export type { AiStreamRequestBodyType };
