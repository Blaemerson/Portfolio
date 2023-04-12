import { createTRPCRouter } from "~/server/api/trpc";
import { commentsRouter } from "~/server/api/routers/comments";
import { profilesRouter } from "./routers/profiles";
import { articlesRouter } from "./routers/articles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  comments: commentsRouter,
  profiles: profilesRouter,
  articles: articlesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
