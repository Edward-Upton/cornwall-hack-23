import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { EditorTypes } from "~/lib/editors-types";
import { getExpansion } from "~/server/editors/expander/prompt";
import { getSummary } from "~/server/editors/summariser/prompt";
import { getStructure } from "~/server/editors/structure/prompt";
import { getBrainstorm } from "~/server/editors/brainstorm/prompt";
import { getCitation } from "~/server/editors/citation/prompt";

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
          break;
        case "summarise":
          completion = await getSummary(input.text);
          break;
        case "structure":
          completion = await getStructure(input.text);
          break;
        case "brainstorm":
          completion = await getBrainstorm(input.text);
          break;
        // completion = await getBulletPoints(input.text);
        case "summarise":
          completion = await getExpansion(input.text);
          break;
        // completion = await getSummarisation(input.text);
        case "cite":
          completion = await getCitation(input.text);
          break;
      }

      return completion.choices[0]?.message;
    }),
});
