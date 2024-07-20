import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { reminderRouter } from "./router/reminder";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  reminder: reminderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
