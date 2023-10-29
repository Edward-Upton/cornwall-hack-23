import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { EditorTypes, type EditorType } from "~/lib/editors-types";
import { getExpansion } from "~/server/editors/expander/prompt";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const suggestionRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(
      z.object({
        editorType: EditorTypes,
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      var completion;

      // Switch on editor type
      switch (input.editorType) {
        case "summarise":
          completion = await getExpansion(input.text);
        case "expansion":
          completion = await getExpansion(input.text);
        default:
          completion = await getExpansion(input.text);
      }

      return completion.choices[0]?.message;
    }),
});
