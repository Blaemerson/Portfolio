import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {id: user.id, name: user.name, username: user.username, profilePicture: user.image};
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure .input(z.object({ article_id: z.string() }))
  .query(async ({ ctx, input }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{createdAt: "asc"}],
      where: {article_id: input.article_id}
    });
    const users = (await ctx.prisma.user.findMany({take: 100}).then((users) => users.map(filterUserForClient)))

    return posts.map(post => {
      const author = users.find((user) => user.id === post.author_id)
      if (!author) throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Author for post not found"})
      return {
        post,
        author,
      };
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(3).max(1000),
        article_id: z.string().min(0).max(255)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const post = await ctx.prisma.post.create({
        data: {
          author_id: authorId,
          content: input.content,
          article_id: input.article_id,
        }
      })

      return post;
  }),
});
