// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";


export const getSummary = async (input: string, metaInput: string, openAIKey: string) => {

  const editorTaskMsg = `You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. You must summarise the users writing in a way that improves the text.\n\nYour summarisation should:\n- Ensure the message of the text is still conveyed after being summarised\n- Remove any buzzwords or unnecessary explanations\n- If possible, find the correct overarching message of the text and describe that instead\n-  Should be at most half the length of the original text, and two or three sentences max.`
  const messages = construct_editor_messages(input, metaInput, editorTaskMsg);

  const response = await query({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }, openAIKey);

  return response;
};
