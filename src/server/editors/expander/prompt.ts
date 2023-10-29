// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";

export const getExpansion = async (input: string) => {
  const response = await query({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You will be given a title for a section of an essay; expand it into a bullet point structure that the author should follow to write a succint yet convincing essay section for that point. \n\nExample input:\nThe Scaling Hypothesis made simple\n\nExample output: \n- What is the scaling hypothesis\n- Evidence that bigger is better\n- What does it mean to scale?\n- Worries about scaling\n- Pitfalls of scaling\n- Conclusion\n",
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
