import {createClient} from "redis";
import {RedisVectorStore} from "langchain/vectorstores/redis";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {WebPDFLoader} from "langchain/document_loaders/web/pdf";
import crypto from "crypto";
import { env } from "~/env.mjs";

export const uploadEmbeddings = async (fileUrl: string, fileId: string, userId: string) => {
  const client = createClient({
    url: env.REDIS_URL,
    // socket : {
    //   tls: true,
    //   ss
    // }
  });
  await client.connect();

  const blob = await fetch(fileUrl).then(r => r.blob());
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  docs.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      file_id: fileId,
      user_ids: [userId],
      hash: crypto.createHash('md5').update(doc.pageContent).digest("hex"),
    }
  });

  await RedisVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(),
    {
      redisClient: client,
      indexName: "docs",
    }
  );
}
