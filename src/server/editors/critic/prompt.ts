// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";

export const getExpansion = async (input: string, metaInput: string) => {
  
  const editorTaskMsg = `You will be shown some text by the user. You must critically evaluate the users writing by highlighting the key issues you see with the text. If you do not think that there are any obvious issues, you do not need to point any out\n\n Here is an example of a well reasoned and persuasive argument: Hold to your own convictions. You air line the evidence and
  if that evidence or the lack of that evidence doesn’t give rise
  to that still, small voice, that there is a reasonable doubt, you
  just keep it that way and beware, and justice may be done
  … It’s so much better, and I think the law provides, that a
  thousand guilty ones go free than one innocent defendant here
  be convicted. I place the welfare of my clients in your hands
  Whereas here is a badly reasoned and justified argument:
  
  Think of a person who makes a crucial mistake on a driving test and almost causing an accident on the road. 
  Then the person’s actions were invalid and therefore, bad. Of course, the driving instructor might have reasons to think that the person should pass the driving test, 
  even though the driver endangered others on the road is bad – given the meaning of the word ‘bad’. `
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
