// This code is for v4 of the openai package: npmjs.com/package/openai

import { query } from "~/server/openai-wrapper";

export const getStructure = async (input: string) => {
  const response = await query({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          'You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. This text will be a summary of the points the user wants to cover in their writing, You will convert this summary into a markdown structure of their writing. Use subtitles to indicate different sections. Under each subtitle, write several bullet points, for each discussing the key points. If you strongly believe that the user could benefit from including further content that wasn\'t in their summary, feel free to include this.\n\nBelow is an example input:\n"Somewhere in the training data for a large language model, there exists the result of a hash function, like SHA256, followed by the string of characters that were hashed to produce that result. In order to achieve zero loss language models must crack SHA256. Can language models do this? What would that require? High-level overview - language models are trained on a large amount of complex non-human data."\n\nBelow is an example of desired behaviour:\n\n# Can GPT-N crack SHA256?\n- Introduce quote by Elizier Yudkowsky, that in order for LMs to get perfect loss they must crack SHA256 to predict key from hash\n- Briefly discuss how LMs could crack this through next-word prediction\n\n## Language Models and Hash Functions\n- Brief explanation on what a language model is, and what a hash function is\n- Explain how language models could learn SHA256 in theory as they will have seen it during training\n\n## Maintaining a lookup table\n- Explain how language models could memorise a lookup table to crack SHA256\n- Discuss how this is computationally infeasible\n\n## Thoughts on the Thought Experiment\n- High-level overview on SHA256 problem. The quote is trying to indicate that language models are trained on non-human complex data that don\'t "just" require simulating human consciousness\n- Instead, language models have to build world model and understand non-human data like hash functions or weather patterns\n- Discuss the implications of this',
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
