import { z } from "zod/v4";

const AiStreamRequestBody = z.object({
  streamMessageId: z.string(),
  chatId: z.string()
});

type AiStreamRequestBodyType = z.infer<typeof AiStreamRequestBody>;

export { AiStreamRequestBody };
export type { AiStreamRequestBodyType };
