import type { TRPCRouterRecord } from "@trpc/server";

import { Category, CreateCategorySchema } from "@acme/db";

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
} satisfies TRPCRouterRecord;
