import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { folderRouter } from "./router/folder";
import { postRouter } from "./router/post";
import { reminderRouter } from "./router/reminder";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  reminder: reminderRouter,
  folder: folderRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
