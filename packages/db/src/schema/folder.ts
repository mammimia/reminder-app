import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  isActive: boolean("isActive").default(true),
  color: varchar("color", { length: 7 }).default("#000000"),
  categoryId: uuid("categoryId").references(() => Category.id, {
    onDelete: "cascade",
  }),
});

export const FolderRelations = relations(Folder, ({ many }) => ({
  reminders: many(Reminder),
}));

export const CreateFolderSchema = createInsertSchema(Folder, {
  name: z.string().min(3).max(256),
  color: z.string().length(7),
  categoryId: z.string(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});
