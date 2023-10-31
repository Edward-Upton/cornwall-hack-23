import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { EditorTypes } from "~/lib/editors-types";
import { getExpansion } from "~/server/editors/expander/prompt";
import { getSummary } from "~/server/editors/summariser/prompt";
import { getStructure } from "~/server/editors/structure/prompt";
import { getBrainstorm } from "~/server/editors/brainstorm/prompt";
import { getCitation } from "~/server/editors/citation/prompt";
import { getManager } from "~/server/editors/manager/prompt";
import { getCritique } from "~/server/editors/critic/prompt";

import { ChatCompletion } from "openai/resources/chat/completions";
import OpenAI from "openai";

export const suggestionRouter = createTRPCRouter({
  submit: adminProcedure
    .input(
      z.object({
        editorType: EditorTypes,
        text: z.string().min(1),
        metaText: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Perform the mutation specified by the EditorType.
      const completion = await strToCompletion(input.editorType, input.text, input.metaText)

      return completion?.choices[0]?.message;
    }),
});

export const strToCompletion = async (editorType: string, text: string, metaText: string): Promise<OpenAI.Chat.Completions.ChatCompletion | undefined> => {
  let completion;
  switch (editorType) {
    case "expansion":
      completion = await getExpansion(text, metaText);
      break;
    case "summarise":
      completion = await getSummary(text, metaText);
      break;
    case "structure":
      completion = await getStructure(text, metaText);
      break;
    case "brainstorm":
      completion = await getBrainstorm(text, metaText);
      break;
    case "manager":
      completion = await getManager(text, metaText);
      break;
    case "cite":
      // TODO: Add metaText to getCitation
      completion = await getCitation(text);
      break;
    case "critic":
      completion = await getCritique(text, metaText);
      break;
  }

    return completion
}
