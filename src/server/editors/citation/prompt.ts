// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";

export const getCitation = async (input: string) => {
  const response = await query({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be given a block of text about a subject. You'll also be given some contextual information that is something to do with the text, as well as where that contextual information came from. I'd like you to modify the text to cite the information.\n",
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
};
