import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { EditorTypes, type EditorType } from "~/lib/editors-types";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const systemMessage: Record<EditorType, string> = {
  simplify: "Simplify the following text",
  summarise: "Summarise the following text into bullet points",
};

export const suggestionRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(
      z.object({
        editorType: EditorTypes,
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage[input.editorType] },
          { role: "user", content: input.text },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
      });

      return completion.choices[0]?.message;
    }),
});
