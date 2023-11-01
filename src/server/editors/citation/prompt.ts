// This code is for v4 of the openai package: npmjs.com/package/openai
import { queryDocuments } from "~/server/embeddings/langchain/query-documents";
import { type Document } from "~/server/embeddings/document";
import { query } from "~/server/openai-wrapper";

export const getCitation = async (input: string, openAIKey: string, userId: string) => {
  const relDocs: Document[] = await queryDocuments(input, userId);

  const contextParts: Array<string> = [];
  relDocs.forEach((doc) => {
    const metadata = JSON.stringify(doc.metadata);
    let content = doc.pageContent;
    content = content.replace("<PAD>", "").replace("<EOS>", "")  // Bit hacky but it works
    contextParts.push(`{"metadata": ${metadata}, "content", "${content}"}`);
  })

  const prompt = `${input}`;

  const response = await query({
    model: "gpt-4",
    messages: [
      {
        "role": "system",
        "content": `You are an expert writer. You will be given some text from a user, and you must help the user with their essay by providing some
        additional context. You will first be shown the text from the user, and several relevant papers. You will later be asked to return the most
        relevant extract from all of the papers.
        `
      },
      {
        "role": "user",
        "content": "Prompt:" + prompt
      },
      {
        "role": "system",
        "content": `The contextual information is as follows:\n${contextParts.join("\n,")}`
      },
      {
        "role": "system",
        "content": 
        `
        Produce your output in JSON format, including the author(s) of the paper (in format et al. if there is more than one), the page number, and the year of publication. 
        Produce the most relevant section of text that is most similar to the user's input., You should select your quotation from the Context Pages provided:
        I need the answer in JSON format;
        Similar to Below:
  
        {"author": "Smith et al.", "year": 2021, "page_number": 1, "extract": "This is the extract."}
  
        
        `
      }
  
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }, openAIKey);

  const jsonData = JSON.parse(response.choices[0]?.message?.content ?? "") as { author: string, year: number, page_number: number, extract: string }

  const citation = {
    authors: jsonData.author,
    year: jsonData.year,
    page: jsonData.page_number,
    extract: jsonData.extract,
  }

  // Format the citation with: content [author, year, page]
  return `${citation.extract} [${citation.authors}, ${citation.year}, p.${citation.page}]`
}
