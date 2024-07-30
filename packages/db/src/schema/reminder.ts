import { sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { Folder } from "./folder";

export const reminderStatus = pgEnum("reminder_status", [
  "todo",
  "inProgress",
  "pending",
  "done",
  "cancelled",
]);

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
  status: reminderStatus("status").default("todo").notNull(),
  folderId: uuid("folderId")
    .notNull()
    .references(() => Folder.id, { onDelete: "cascade" }),
});

export const CreateReminderSchema = createInsertSchema(Reminder, {
  title: z.string().min(3).max(256),
  content: z.string().min(3).max(256),
  folderId: z.string(),
  expiryDate: z.string().nullable(),
  status: z.enum(reminderStatus.enumValues),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export type Reminder = typeof Reminder.$inferSelect;
export type CreateReminder = typeof CreateReminderSchema;
