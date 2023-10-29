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
