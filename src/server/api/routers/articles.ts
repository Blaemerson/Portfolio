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
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    profilePicture: user.image,
  };
};

export const articlesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const articles = await ctx.prisma.article.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    const users = await ctx.prisma.user
      .findMany({ take: 100 })
      .then((users) => users.map(filterUserForClient));

    return articles.map((article) => {
      const author = users.find((user) => user.id === article.author_id);
      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for article not found",
        });
      return {
        article,
        author,
      };
    });
  }),
  getArticleById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const article = await ctx.prisma.article.findFirst({
        where: { id: input.id },
      });
      if (!article) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Article not found",
        });
      }
      const users = await ctx.prisma.user
        .findMany({ take: 100 })
        .then((users) => users.map(filterUserForClient));

      const author = users.find((user) => user.id === article.author_id);
      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for article not found",
        });
      return {
        article,
        author,
      };
    }),
  getArticleByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      const article = await ctx.prisma.article.findFirst({
        where: { title: input.title },
      });
      if (!article) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Article not found",
        });
      }

      return article;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.article.delete({
        where: { id: input.id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(255),
        content: z.string().min(3).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const article = await ctx.prisma.article.create({
        data: {
          author_id: authorId,
          title: input.title,
          content: input.content,
        },
      });

      return article;
    }),
});
