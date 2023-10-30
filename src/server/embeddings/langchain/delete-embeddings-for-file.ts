import { createClient } from "redis";

export const deleteEmbeddingsForFile = async (
  fileId: string,
  userId: string,
) => {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();

  // Escape `-`
  const escapedUserID = userId.replace(/-/g, "\\-");
  const escapedFileID = fileId.replace(/-/g, "\\-");

  const docs = await client.ft.search(
    "docs",
    `@metadata:(${escapedUserID} ${escapedFileID})`,
  );

  await client.del(docs.documents.map((doc) => doc.id));
};
