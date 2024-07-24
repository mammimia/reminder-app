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
  isActive: boolean("isActive").default(true),
});

export const CategoryRelations = relations(Category, ({ many }) => ({
  folders: many(Folder),
}));

export const CreateCategorySchema = createInsertSchema(Category, {
  name: z.string().min(3).max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});
