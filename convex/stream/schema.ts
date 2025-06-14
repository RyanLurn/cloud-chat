import { defineTable } from "convex/server";
import { v } from "convex/values";

const streamFields = {
  content: v.string(),
  name: v.string()
};

const StreamInputSchema = v.object(streamFields);

const streamsTable = defineTable(StreamInputSchema);

export { streamsTable, StreamInputSchema };
