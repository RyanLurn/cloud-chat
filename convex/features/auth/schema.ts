import { v } from "convex/values";
import { defineTable } from "convex/server";

const userFields = {
  tier: v.union(v.literal("free"), v.literal("pro")),
  externalId: v.string()
};

const UserInputSchema = v.object(userFields);

const usersTable = defineTable(UserInputSchema).index("by_externalId", [
  "externalId"
]);

export { usersTable, UserInputSchema };
