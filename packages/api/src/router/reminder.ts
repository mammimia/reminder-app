import type { TRPCRouterRecord } from "@trpc/server";

import { CreateReminderSchema, desc, Reminder } from "@acme/db";

import { publicProcedure } from "../trpc";

export const reminderRouter = {
  //Add Folder Details
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Reminder.findMany({
      orderBy: desc(Reminder.createdAt),
    });
  }),
  create: publicProcedure
    .input(CreateReminderSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Reminder).values(input);
    }),
} satisfies TRPCRouterRecord;
