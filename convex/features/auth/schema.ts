import { v } from "convex/values";
import { defineTable } from "convex/server";

const userFields = {
  name: v.string(),
  externalId: v.string()
};

const UserInputSchema = v.object(userFields);

const usersTable = defineTable(UserInputSchema).index("by_externalId", [
  "externalId"
]);

export { usersTable, UserInputSchema };
