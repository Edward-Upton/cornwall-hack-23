import { createClient } from "redis";
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { type Document } from "~/server/embeddings/document";
import { type Document as LangchainDocument } from "langchain/dist/document";

export const queryDocuments = async (
  input: string,
  userId: string,
  filters: string[] = [],
  numResults = 5
) => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  await client.connect();
  const vectorStore = new RedisVectorStore(new OpenAIEmbeddings(), {
    redisClient: client,
    indexName: "docs",
  });

  const langchainDocs = await vectorStore.similaritySearch(
    input,
    numResults,
    [userId].concat(filters)
  );

  return langchainDocs.map((langchainDoc: LangchainDocument) => {
    const doc: Document = {
      pageContent: langchainDoc.pageContent,
      metadata: {
        fileId: String(langchainDoc.metadata.file_id) ?? "",
        userIds: Array.isArray(langchainDoc.metadata.user_ids) ? langchainDoc.metadata.user_ids.map((userId) => String(userId)) : [],
        hash: String(langchainDoc.metadata.hash) ?? "",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        pageNumber: Number(langchainDoc.metadata.loc.pageNumber) ?? 0,
      },
    }

    return doc;
  });
}
