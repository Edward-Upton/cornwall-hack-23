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

      // Perform the mutation specified by the EditorType.
      switch (input.editorType) {
        case "expansion":
          completion = await getExpansion(input.text);
        case "points":
          completion = await getExpansion(input.text);
          // completion = await getBulletPoints(input.text);
        case "summarise":
          completion = await getExpansion(input.text);
          // completion = await getSummarisation(input.text);
      }

      return completion.choices[0]?.message;
    }),
});
