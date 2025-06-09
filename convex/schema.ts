import { defineSchema } from "convex/server";
import { usersTable } from "backend/features/auth/schema";

const appSchema = defineSchema({
  users: usersTable
});

export default appSchema;
