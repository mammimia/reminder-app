import type { TRPCRouterRecord } from "@trpc/server";

import { desc } from "@acme/db";
import { Reminder } from "@acme/db/schema";

import { publicProcedure } from "../trpc";

export const reminderRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.Reminder.findMany({
      orderBy: desc(Reminder.id),
      limit: 10,
    });
  }),
} satisfies TRPCRouterRecord;
