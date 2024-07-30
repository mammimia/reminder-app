import { sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dailyRoutineType = pgEnum("daily_routine_type", [
  "sleep",
  "work",
  "eat",
  "gaming",
  "scrolling",
  "exercise",
  "family",
  "custom",
]);

export const DailyRoutine = pgTable("daily_routine", {
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
  name: varchar("name", { length: 64 }),
  startTime: timestamp("start_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  endTime: timestamp("end_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  type: dailyRoutineType("type").default("custom").notNull(),
  details: varchar("details", { length: 256 }),
});

export const CreateDailyRoutineSchema = createInsertSchema(DailyRoutine, {
  type: z.enum(dailyRoutineType.enumValues),
  name: z
    .string()
    .min(3)
    .max(64)
    .transform((v) => v.trim())
    .nullable(),
  startTime: z.string(),
  endTime: z.string(),
  details: z.string().max(256).nullable(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export type DailyRoutine = typeof DailyRoutine.$inferSelect;
export type CreateDailyRoutine = typeof CreateDailyRoutineSchema;
