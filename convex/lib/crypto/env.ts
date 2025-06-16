import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    ENCRYPTION_KEY: z.string().min(1)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
