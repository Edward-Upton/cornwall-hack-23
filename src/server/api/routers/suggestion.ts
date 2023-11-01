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

import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export const suggestionRouter = createTRPCRouter({
  submit: adminProcedure
    .input(
      z.object({
        editorType: EditorTypes,
        text: z.string().min(1),
        metaText: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get OpenAI key from user
      const {
        db,
        session: { user },
      } = ctx;

      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      });

      if (!dbUser?.openAIKey) {
        throw new Error("No OpenAI key found");
      }

      // Perform the mutation specified by the EditorType.
      const completion = await strToCompletion(
        input.editorType,
        input.text,
        input.metaText,
        dbUser.openAIKey,
        user.id,
      );

      return completion;
    }),
});

export const strToCompletion = async (
  editorType: string,
  text: string,
  metaText: string,
  openAIKey: string,
  userId: string,
): Promise<string | null | undefined> => {
  let completion;
  switch (editorType) {
    case "expansion":
      completion = (await getExpansion(text, metaText, openAIKey))?.choices[0]
        ?.message.content;
      break;
    case "summarise":
      completion = (await getSummary(text, metaText, openAIKey))?.choices[0]
        ?.message.content;
      break;
    case "structure":
      completion = (await getStructure(text, metaText, openAIKey))?.choices[0]
        ?.message.content;
      break;
    case "brainstorm":
      completion = (await getBrainstorm(text, metaText, openAIKey))?.choices[0]
        ?.message.content;
      break;
    case "manager":
      completion = await getManager(text, metaText, openAIKey, userId);
      break;
    case "cite":
      // TODO: Add metaText to getCitation
      completion = await getCitation(text, openAIKey, userId);
      break;
    case "critic":
      completion = (await getCritique(text, metaText, openAIKey))?.choices[0]
        ?.message.content;
      break;
  }

  return completion;
};
