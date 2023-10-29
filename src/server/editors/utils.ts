import { ChatCompletionMessageParam } from "openai/resources/chat";

const prePromptDefault: string = "You are an expert in creative writing. You will interact with a user who is currently writing their work. Don't write anything more than what is required by your tasks."
const prePromptUserGuidance: string = " The next message is a summary from the user about the intention of their writing."

export function construct_editor_messages(
    input: string,
    metaInput: string,
    editorTaskMsg: string,
): ChatCompletionMessageParam[] {
  let messages: ChatCompletionMessageParam[]  = [
    {
      role: "system",
      content: editorTaskMsg,
    },
    {
      role: "user",
      content: input,
    },
  ];

  // Add user guidance if included, otherwise include generic message
  if (metaInput != "") {
    const prePrompt = prePromptDefault + prePromptUserGuidance
    let metaSystemMsg: {role: "system" | "function" | "user" | "assistant", content: string } = {"role": "system", "content": prePrompt};
    let metaUserMsg: {role: "system" | "function" | "user" | "assistant", content: string } = {"role": "user", "content": metaInput};
    messages.unshift(metaUserMsg);
    messages.unshift(metaSystemMsg);
  } else {
    let metaSystemMsg: {role: "system" | "function" | "user" | "assistant", content: string } = {"role": "system", "content": prePromptDefault};
    messages.unshift(metaSystemMsg);
  }

  return messages;
}