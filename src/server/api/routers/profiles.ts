import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {id: user.id, name: user.name, username: user.username, profilePicture: user.image!};
}

export const profilesRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ctx, input}) => {
      const user = await ctx.prisma.user.findFirst({
        where: {username: input.username},
      })
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        })
      }

      return filterUserForClient(user);
    }),
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ctx, input}) => {
      const user = await ctx.prisma.user.findFirst({
        where: {id: input.id},
      })
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        })
      }

      return filterUserForClient(user);
    })
});
