import OpenAI from "openai";
import { type Readable } from "openai/_shims";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const query = (
  body: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
  options?:
    | OpenAI.RequestOptions<Record<string, unknown> | Readable>
    | undefined,
) => {
  const response = openai.chat.completions.create(body, options);

  return response;
};
