import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postsRouter } from "~/server/api/routers/posts";
import { profilesRouter } from "./routers/profiles";
import { articlesRouter } from "./routers/articles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profiles: profilesRouter,
  articles: articlesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
