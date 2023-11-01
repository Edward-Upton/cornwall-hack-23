// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";


export const getBrainstorm = async (
  input: string,
  metaInput: string,
  openAIKey: string,
) => {
  const editorTaskMsg =  `You are an expert in creative writing. You will interact with a user who is currently writing their work.\n\nYou will be shown some text by the user. You must improve the users writing by brainstorming ideas that the user could use. Identify the purpose of the users writing and the message they are trying to communicate, then generare several novel and diverse ideas that haven't been considered or discussed before.\nWrite each idea in a separate bullet point. Just write your ideas in bullet points, nothing else.\nEnsure these ideas are diverse, so you don't repeat the same point multiple times.\nEnsure these ideas are high-quality. If you can't think of any good suggestions, then don't produce any.\n\nIf the user has not written enough to give good ideas, or has written gibberish, politely prompt the user on how they could get their writing to get to a state where you can help.`
  const messages = construct_editor_messages(input, metaInput, editorTaskMsg);

  const response = await query(
    {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    openAIKey,
  );

  return response;
};
