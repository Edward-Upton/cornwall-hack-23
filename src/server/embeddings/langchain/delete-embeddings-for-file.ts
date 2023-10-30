import {createClient} from "redis";

export const deleteEmbeddingsForFile = async (
  fileId: string,
  userId: string,
) => {
  const client = createClient({url: process.env.REDIS_URL});
  await client.connect();

  const docs = await client.ft.search("docs", `@metadata:(${userId} ${fileId})`)

  await client.del(docs.documents.map((doc) => doc.id))
}
