import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Buffer } from "buffer";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {id: user.id, name: user.name, username: user.username, profilePicture: user.image};
}

export const articlesRouter = createTRPCRouter({
  getArticleByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ctx, input}) => {
      const article = await ctx.prisma.article.findFirst({
        where: {title: input.title},
      })
      if (!article) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Article not found",
        })
      }

      return article;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(30),
        content: z.string().min(3).max(2000)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const article = await ctx.prisma.article.create({
        data: {
          author_id: authorId,
          title: input.title,
          content: Buffer.from(input.content).toString('base64'),
        }
      })

      return article;
  }),
});
