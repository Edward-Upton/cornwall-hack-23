import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getExpansion } from "~/server/editors/expander/prompt";

export const expansionRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {

      const completion = await getExpansion(input.text);

      return completion.choices[0]?.message;
    }),
});
