import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { EditorTypes } from "~/lib/editors-types";
import { getExpansion } from "~/server/editors/expander/prompt";

export const suggestionRouter = createTRPCRouter({
  submit: adminProcedure
    .input(
      z.object({
        editorType: EditorTypes,
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      let completion;

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
