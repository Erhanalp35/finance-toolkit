import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const financeStates = sqliteTable("finance_states", {
  userId: text("user_id").primaryKey(),
  payload: text("payload").notNull().default('{"transactions":[],"budgets":[],"goals":[]}'),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
