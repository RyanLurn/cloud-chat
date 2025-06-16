import { v } from "convex/values";
import { defineTable } from "convex/server";
import { SupportedModel } from "backend/ai/lib/models";
import systemFields from "backend/lib/systemFields";

const userFields = {
  model: SupportedModel,
  openRouterKey: v.optional(v.string()),
  externalId: v.string()
};

const UserInputSchema = v.object(userFields);
const UserOutputSchema = v.object({
  ...systemFields("users"),
  ...userFields
});

const usersTable = defineTable(UserInputSchema).index("by_externalId", [
  "externalId"
]);

export { usersTable, UserInputSchema, UserOutputSchema };
