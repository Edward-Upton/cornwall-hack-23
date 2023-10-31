import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { files } from "~/server/db/schema";
import { z } from "zod";
import { utapi } from "~/server/uploadthing";
import { deleteEmbeddingsForFile } from "~/server/embeddings/langchain/delete-embeddings-for-file";

export const filesRouter = createTRPCRouter({
  getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userFiles = await ctx.db.query.files.findMany({
      where: eq(files.userId, userId),
    });

    return userFiles;
  }),
  deleteFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const file = await ctx.db.query.files.findFirst({
        where: eq(files.key, input.key),
      });

      if (!file) throw new Error("File not found");

      if (file.userId !== userId) throw new Error("Unauthorized");

      await utapi.deleteFiles([input.key]);
      await ctx.db.delete(files).where(eq(files.key, input.key));
      // Delete embeddings
      await deleteEmbeddingsForFile(file.key, userId);

      return true;
    }),
});
