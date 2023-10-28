import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env.mjs";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const suggestionRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input.text }],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
      });

      return completion.choices[0]?.message;
    }),
});
