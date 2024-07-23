import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { Category } from "./category";
import { Reminder } from "./reminder";

export const Folder = pgTable("folder", {
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
  color: varchar("color", { length: 7 }).default("#000000"),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => Category.id, { onDelete: "cascade" }),
});

export const FolderRelations = relations(Folder, ({ many }) => ({
  reminders: many(Reminder),
}));
