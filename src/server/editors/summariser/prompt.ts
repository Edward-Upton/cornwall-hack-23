// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";

export const getSummary = async (input: string, metaInput: string) => {
  
  const editorTaskMsg = `You will be shown some text by the user. You must improve the users writing by compressing their text into a short text. Ensure that as much information is included as possible.\nIf you can confidently find the correct overarching message the text is trying to convey, feel free to describe that instead.\nTry to compress the text down two or three sentences max.`
  const messages = construct_editor_messages(input, metaInput, editorTaskMsg);
  
  const response = await query({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
};
