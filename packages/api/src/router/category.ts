import type { TRPCRouterRecord } from "@trpc/server";

import { Category, CreateCategorySchema, eq, Folder, Reminder } from "@acme/db";

import { publicProcedure } from "../trpc";

export const categoryRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Category.findMany({
      orderBy: Category.createdAt,
    });
  }),
  create: publicProcedure
    .input(CreateCategorySchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Category).values(input);
    }),
  getCategoriesWithFolders: publicProcedure.query(async ({ ctx }) => {
    // TODO: Need a better way to do this
    const categories = await ctx.db.query.Category.findMany({
      orderBy: Category.createdAt,
    });

    const categoriesWithFoldersAndReminders = await Promise.all(
      categories.map(async (category) => {
        const folders = await ctx.db.query.Folder.findMany({
          where: eq(Folder.categoryId, category.id),
        });

        const foldersWithReminders = await Promise.all(
          folders.map(async (folder) => {
            const reminders = await ctx.db.query.Reminder.findMany({
              where: eq(Reminder.folderId, folder.id),
            });

            return { ...folder, reminders };
          }),
        );

        return { ...category, folders: foldersWithReminders };
      }),
    );

    return categoriesWithFoldersAndReminders;
  }),
} satisfies TRPCRouterRecord;
