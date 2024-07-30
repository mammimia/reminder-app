import { sql } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const accountingType = pgEnum("accounting_type", ["expense", "income"]);

export const Accounting = pgTable("accounting", {
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
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 256 }),
  type: accountingType("type").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const CreateAccountingSchema = createInsertSchema(Accounting, {
  title: z
    .string()
    .min(3)
    .max(64)
    .transform((v) => v.trim()),
  description: z
    .string()
    .max(256)
    .nullable()
    .transform((v) => v?.trim()),
  type: z.enum(accountingType.enumValues),
  amount: z.number().min(0),
  date: z.string(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export type Accounting = typeof Accounting.$inferSelect;
export type CreateAccounting = typeof CreateAccountingSchema;
