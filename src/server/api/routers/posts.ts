import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {id: user.id, name: user.name, profilePicture: user.image!};
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });
    const users = (await ctx.prisma.user.findMany({take: 100}).then((users) => users.map(filterUserForClient)))

    return posts.map(post => {
      const author = users.find((user) => user.id === post.author_id)
      if (!author) throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Author for post not found"})
      return {
        post,
        author,
      }
    })

    // return posts;
  }),
});
