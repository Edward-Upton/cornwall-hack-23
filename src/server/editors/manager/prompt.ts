// This code is for v4 of the openai package: npmjs.com/package/openai
import { query } from "~/server/openai-wrapper";
import { construct_editor_messages } from "~/server/editors/utils";
import { strToCompletion } from "~/server/api/routers/suggestion";
import { type EditorType } from "~/lib/editors-types";

export const getManager = async (
  input: string,
  metaInput: string,
  openAIKey: string,
  userId: string,
) => {
  const managerTaskMsg = `You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. You have several intelligent tools that can improve text. You can improve the users writing by suggesting the appropriate tool at the correct place within the text, or if the users writing is already good, then you can suggest no changes.\n\nYour tools are:\n- brainstorm, generate several novel and diverse ideas to assist the user in their writing. Useful for when there are several great ideas the user missed\n- summarise, shorten some text only keeping the key points. Only use this when there is an excessive amount of text describing a single concept. Do not apply this on multiple paragraphs of text, or on more than five sentences.\n- expansion, elaborate on specific section on text. Useful for when certain points aren't explained well, or would benefit from further explanation. Be conscious thsat the user may not always want to fully explan every point, for example, if it is clear that the writing is an introduction or conclusion.\n- structure, convert rough notes into markdown structure. Use this when the user hasn't written up much, only rough notes on their plan of their writing.\n\nOnly suggest the use of a tool when you see a significant improvement that could be made. When suggesting a model, write it exactly how it has appeared previously, with the tool written in lowercase. Don't make suggestions for small or insignificant changes, like minor spelling mistakes. If you don't see any good suggestions, just reply with \"{}\".\n\nYou should respond with the tool you wish to use, and which text you'd like to use it on. Your reply should be in json, like:\n{\"tool\": # write the name of the tool you want to use here, \"text\": # copy the text you want to apply the tool to here}\n\nBelow are some examples of your desired behaviour:\n\n# Input\nWho “won” the electricity “race”? Maybe Thomas Edison, but that didn’t cause Edison’s descendants to rule the world as emperors, or make Menlo Park a second Rome. It didn’t even especially advantage America. Edison personally got rich, the overall balance of power didn’t change, and today all developed countries have electricity.\n\nWho “won” the automobile race? Karl Benz? Henry Ford? There were many steps between the first halting prototype and widespread adoption. Benz and Ford both personally got rich, their companies remain influential today, and Mannheim and Detroit remain important auto manufacturing hubs. But other companies like Toyota and Tesla are equally important, the overall balance of power didn’t change, and today all developed countries have automobiles.\n\nWho “won” the computer “race”? Charles Babbage? Alan Turing? John von Neumann? Steve Jobs? Bill Gates? Again, it was a long path of incremental improvements. Jobs and Gates got rich, and their hometowns are big tech hubs, but other people have gotten even richer, and the world chip manufacturing center is in Taiwan now for some reason. The overall balance of power didn’t change (except maybe during a brief window when the Bombes broke Enigma) and today all developed countries have computers.\n\n# Output\n{}\n\n# Input\nTechnology has significantly improved human living standards. This is is noticeable when considering the increase in the poverty threshold due to technological advancements. The GDP witnessed from 1 AD to the advent of the Industrial Revolution, followed by a dramatic 57,000% increase over the subsequent 200 years from 1800-2015. Technological advancements have greatly enhanced human living standards, as seen in the increase in the poverty threshold and the remarkable growth of GDP. Between 1 AD and 1800 AD GDP grew by 500%. The Industrial Revolution (in combination with other factors) then skyrocketed global GDP by 57,000% in the ~2 centuries from 1800-2015.\n\nApplications of AI in improving human development index (HDI):\n\nIn healthcare, AI is instrumental in aiding discoveries and revolutionizing disease prediction source, source.\nApplications of AI technology in agriculture can significantly improve income source.\nIn education, AI can improve access and efficacy source.\n\n# Output\n{\"tool\": \"Expander\", \"text\": \"In healthcare, AI is instrumental in aiding discoveries and revolutionizing disease prediction source, source.\nApplications of AI technology in agriculture can significantly improve income source.\nIn education, AI can improve access and efficacy source.\"}\n\n# Input\nThe advent of AI presents significant challenges and opportunities for our society. In the short term, the pervasive nature of AI and its ability to sway public opinion can potentially undermine democratic processes, such as elections. This power can be harnessed either legitimately, through targeted political campaigns, or nefariously, as seen in recent instances of voter manipulation and misinformation campaigns. As AI applications become ever more embedded in our daily lives, there is also the risk of them slowly hijacking our biological instincts and preferences, shaping personal and societal decisions in subtle, practically invisible ways that may escape regulation or public scrutiny.\n\nIn the long term, our increasing dependence on AI can lead to it exercising a slow but steady erosion of our autonomy, leaving less room for free will, diversity and pluralism, pillars of any thriving democracy. As more decisions are delegated to AI in multiple domains - from personal choices regarding media consumption, purchases, lifestyle, all the way to collective decisions regarding city management, resource distribution, healthcare or education - humans will gradually be making a lesser proportion of the direct decisions that shape their own lives.\n\nShould the pace of AI development and integration in all aspects of life continue unabated and unregulated, the very far future could lead to a situation where humans, as a far less intelligent species, might find their interests overridden by AI objectives. Our democratic systems might struggle to function effectively in such a landscape, as the power dynamics that traditionally govern human societies get disrupted. The very promise of democracy, that every individual gets a say in shaping societal rules and decisions, could lose its meaning if the decisions that significantly influence our lives are made by AI algorithms instead of human beings.\n\nThis prospect reiterates the need for proactive regulation, ethical guidelines and public discourse around the use of AI in our societies. It is crucial that long-term societal implications are considered in parallel with the exhilarating technological advances. Democracy and AI can coexist, provided we acknowledge the challenges, act responsibly and shape AI advances to not only respect but also enhance the democratic fabric of our societies. Ultimately, it is up to us, humans, to determine the role AI will play in our future and how it will affect the democratic values we uphold.\n\n# Output\n{}\n\n# Input\nIf the LM can't grip onto any discernible patterns in the digest-input map sufficiently to learn the inverse mapping, it could instead store a table of digests and their corresponding output in its memory and consult the table when encountering a digest.\n\nHowever, given the nature of hashing algorithms, this is likely to be computationally infeasible. If we take SHA256, we would need 2^256 entries in our table, which is a number larger than the number of atoms in the universe.\n\nThe output space of SHA256 is 256 bits, which represented in hexidecimal would be 64 characters [0-9a-f].. For reference, the output space contains about 1.2*10^77 possible values, whilst the input space is essentially infinite. For some context, the age of the universe is about 3x10^27 nanoseconds. Storing such a large lookup table in a neural network is a long way off and can probably be written off as a possibility for now.\n\n# Output\n{}`;
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
