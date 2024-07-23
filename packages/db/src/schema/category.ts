import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { Folder } from "./folder";

export const Category = pgTable("category", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const CategoryRelations = relations(Category, ({ many }) => ({
  folders: many(Folder),
}));
