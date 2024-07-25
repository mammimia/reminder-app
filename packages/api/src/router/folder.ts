import type { TRPCRouterRecord } from "@trpc/server";

import { CreateFolderSchema, Folder } from "@acme/db";

import { publicProcedure } from "../trpc";

export const folderRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Folder.findMany({
      orderBy: Folder.id,
      limit: 10,
    });
  }),
  create: publicProcedure
    .input(CreateFolderSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Folder).values(input);
    }),
} satisfies TRPCRouterRecord;
