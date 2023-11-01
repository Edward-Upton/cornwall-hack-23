import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    const {
      db,
      session: { user },
    } = ctx;
    return db.query.users.findFirst({
      where: eq(users.id, user.id),
    });
  }),
  addOpenAIKey: protectedProcedure
    .input(
      z.object({
        key: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { key } = input;
      const {
        db,
        session: { user },
      } = ctx;

      await db
        .update(users)
        .set({
          openAIKey: key,
        })
        .where(eq(users.id, user.id));
    }),
});
