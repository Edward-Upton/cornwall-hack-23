// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";
import { strToCompletion } from "~/server/api/routers/suggestion";
import type { EditorType } from "~/lib/editors-types";


export const getManager = async (
  input: string,
  metaInput: string,
  openAIKey: string,
  userId: string,
) => {
  const managerTaskMsg = `You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. You have several intelligent tools that can improve text. If the text has some significant flaws, you can use these tools to improve the text. Your job must be to identify if the text has any significant flaws, then to suggest where in the text you should apply the tool.\n\nYour tools are:\n- brainstorm. Following a certain topic, generate several novel and diverse ideas that haven't been considered or discussed before.\n- summarise. Shorten some text whilst only keeping key points, or the key overarching message. Only apply when a section of text contains an unnecessary amount of buzzwords or explanations. Do not apply this on multiple paragraphs, or more than four sentences. Do not apply if \n- expansion. Elaborate on a specific section of text. Useful for when certain sections haven't been explained well and would benefit from further explanation.\n- structure, convert rough notes into markdown structure. Use this when the user hasn't written up much, only rough notes on their plan of their writing.\n\nOnly suggest the use of a tool when you see a significant improvement that could be made. When suggesting a model, write it exactly how it has appeared previously, with the correct casing. Don't make suggestions for small or insignificant changes, like minor spelling mistakes.\n\nYou should respond in JSON format. First write up to a few sentences about your reasoning, then write the tool you wish to use, then write the section of text you'd like to apply it on. An example format is shown below:\n{\"reasoning\": # write your reasoning here, \"tool\": # tool you wish to use, \"text\": # text you want to apply the tool on}\n\nIf you don't see any significant suggestions, just reply with \"{\"reasoning\": # something, \"tool\": \"None\", \"text\": \"None\"}\".\n\nBelow are some examples of your perfect behaviour:\n\n# Example 1\n## Input\nWho “won” the electricity “race”? Maybe Thomas Edison, but that didn’t cause Edison’s descendants to rule the world as emperors, or make Menlo Park a second Rome. It didn’t even especially advantage America. Edison personally got rich, the overall balance of power didn’t change, and today all developed countries have electricity.\n\nWho “won” the automobile race? Karl Benz? Henry Ford? There were many steps between the first halting prototype and widespread adoption. Benz and Ford both personally got rich, their companies remain influential today, and Mannheim and Detroit remain important auto manufacturing hubs. But other companies like Toyota and Tesla are equally important, the overall balance of power didn’t change, and today all developed countries have automobiles.\n\nWho “won” the computer “race”? Charles Babbage? Alan Turing? John von Neumann? Steve Jobs? Bill Gates? Again, it was a long path of incremental improvements. Jobs and Gates got rich, and their hometowns are big tech hubs, but other people have gotten even richer, and the world chip manufacturing center is in Taiwan now for some reason. The overall balance of power didn’t change (except maybe during a brief window when the Bombes broke Enigma) and today all developed countries have computers.\n\n## Output\n{\"reasoning\": \"This is a high-quality piece of text that is well-explained. I don't see any improvements to suggest here.\", \"tool\": \"None\", \"text\": \"None\"}`
  const messages = construct_editor_messages(input, metaInput, managerTaskMsg);

  const manager_response = await query(
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
  const manager_response_msg = manager_response.choices[0]?.message;

  let editor_type;
  try {
    editor_type = JSON.parse(manager_response_msg?.content ?? "") as {
      tool: EditorType;
      text: string;
    };
  } catch (e) {
    return undefined;
  }

  const editor_response = await strToCompletion(
    editor_type?.tool,
    editor_type?.text,
    metaInput,
    openAIKey,
    userId,
  );
  return editor_response;
};
