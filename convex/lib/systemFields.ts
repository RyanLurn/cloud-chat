import { v } from "convex/values";
import type { TableNames } from "backend/_generated/dataModel";

const systemFields = (tableName: TableNames) => ({
  _id: v.id(tableName),
  _creationTime: v.number()
});

export default systemFields;
