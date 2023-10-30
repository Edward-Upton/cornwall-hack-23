import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { files } from "~/server/db/schema";
import { uploadEmbeddings } from "~/server/embeddings/langchain/upload-embeddings";

const f = createUploadthing();

const auth = async (_: Request) => {
  const session = await getServerAuthSession();
  return session?.user;
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await db.insert(files).values({
        key: file.key,
        userId: metadata.userId,
        url: file.url,
        name: file.name,
      });

      // CALL EMBEDDINGS HERE!!!
      await uploadEmbeddings(file.url, file.key, metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
