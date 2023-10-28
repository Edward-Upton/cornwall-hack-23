import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { HelpCircleIcon } from "lucide-react";
import { hasOwn } from "openai/core";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const suggestionRouter = createTRPCRouter({
  submit: protectedProcedure
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
