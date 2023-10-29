import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { EditorTypes } from "~/lib/editors-types";
import { getExpansion } from "~/server/editors/expander/prompt";
import { getSummary } from "~/server/editors/summariser/prompt";
import { getStructure } from "~/server/editors/structure/prompt";
import { getBrainstorm } from "~/server/editors/brainstorm/prompt";

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

      // Switch on editor type
      switch (input.editorType) {
        case "expansion":
          completion = await getExpansion(input.text);
        case "summarise":
          completion = await getSummary(input.text);
        case "structure":
          completion = await getStructure(input.text);
        case "brainstorm":
          completion = await getBrainstorm(input.text);
        default:
          completion = await getExpansion(input.text);
      }

      return completion.choices[0]?.message;
    }),
});
