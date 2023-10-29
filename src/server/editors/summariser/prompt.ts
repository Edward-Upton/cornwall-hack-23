// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getSummary = async (input: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system",
            "content": "You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. You must improve the users writing by compressing their text into a short text. Ensure that as much information is included as possible.\nIf you can confidently find the correct overarching message the text is trying to convey, feel free to describe that instead.\nTry to compress the text down two or three sentences max."
          }
        ],
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    return response;
}
