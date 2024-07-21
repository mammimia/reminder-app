import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
