import { defineSchema } from "convex/server";
import { usersTable } from "backend/auth/schema";

const appSchema = defineSchema({
  users: usersTable
});

export default appSchema;
