// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";


export const getExpansion = async (input: string, metaInput: string, openAIKey: string, model: string) => {

  const editorTaskMsg = `You are an expert in creative writing. You will interact with a user who is currently writing their work.\n\nYou will be shown some text by the user. You must expand upon the users writing in a way that improves the text. Rewrite the given text into a longer text.\n\nYou should:\n- Include the same message within the text. If you can instead confidently identify the overarching message, include this instead\n- Discuss additional points if you believe them to be related and useful\n\nYou should not:\n- Overuse descriptive and buzzwords\n\nBelow is an example input:\n\"One of the most important aspects of surfing is safety. It is important to be aware of the waves and their potential power. Big waves can cause serious injury, so it is important to know your limits and be aware of the ocean conditions.\"\n\nAnd below is an example of desired behaviour:\nOne of the most important aspects of surfing is safety. It is important to be aware of the waves and their potential power. Big waves can cause serious injury, so it is important to know your limits and be aware of the ocean conditions. It is also important to wear a life jacket, especially in rougher waters, for an added layer of security.\n\nAnother key element for a safe surf experience is to know your equipment. Having a board that fits you, as well as the right fins and leash will make all the difference when out on the waves. Not only do these items provide necessary safety measures, but they also help you get better performance out of your ride.\n\nIn addition to safety tips, it is also good to have certain supplies with you while surfing in order to ensure that you are prepared for any situation that may arise. These supplies include sunscreen, a first-aid kit, water, snacks and extra layers like neoprene wetsuits or rash guards for added warmth when in cold water or windy situations.\n\nFinally, it’s essential to be aware of any local regulations or laws regarding surfing in an area before boarding up and heading out into the surf! Knowledge is key when it comes to being safe and having a great experience on the waves!`
  const messages = construct_editor_messages(input, metaInput, editorTaskMsg);

  const response = await query({
    model: model,
    messages: messages,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }, openAIKey);

  return response;
};
