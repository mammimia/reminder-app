import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { Folder } from "./folder";

export const Reminder = pgTable("reminder", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updateAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
  isActive: boolean("isActive").default(true),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  expiryDate: timestamp("expiryDate", {
    mode: "date",
    withTimezone: true,
  }),
  folderId: uuid("folderId")
    .notNull()
    .references(() => Folder.id, { onDelete: "cascade" }),
});

export const CreateReminderSchema = createInsertSchema(Reminder, {
  title: z.string().max(256),
  content: z.string().max(256),
  folderId: z.string(),
  expiryDate: z.string().nullable(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});
