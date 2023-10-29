// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";

export const getBrainstorm = async (input: string, metaInput: string) => {
  
  const editorTaskMsg =  `You will be shown some text by the user. You must improve the users writing by helping the user brainstorm. You should write several bullet points about possible ideas the user could use in order to improve their writing. These bullet points should be numbered. Try and make these diverse, so they usually discuss different sections of the writing, unless you have great ideas about one section.\n\nYou should only write bullet points of expert feedback about the users writing. If you cannot think of many good points of feedback, then only write a few bullet points. Always write up to five bullet points max.\n\nThe users writing may be a blog post, an essay, non-fiction writing, or writing in some other form. Figure out what medium they are writing in, then give appropriate feedback. If you are unsure, state your assumption on what you think it is before you produce the bullet points.\n\nIf the user has not written enough to give good ideas, or has written gibberish, politely prompt the user on how they could get their writing to get to a state where you can help.`;
  const messages = construct_editor_messages(input, metaInput, editorTaskMsg);
  
  const response = await query({
    model: "gpt-4",
    messages: messages,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
};

