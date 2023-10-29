// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getBrainstorm = async (input: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system",
            "content": "You are an expert in creative writing. You will interact with a user who is currently writing their work. \n\nYou will be shown some text by the user. You must improve the users writing by helping the user brainstorm. You should write several bullet points about possible ideas the user could use in order to improve their writing. These bullet points should be numbered. Try and make these diverse, so they usually discuss different sections of the writing, unless you have great ideas about one section.\n\nYou should only write bullet points of expert feedback about the users writing. If you cannot think of many good points of feedback, then only write a few bullet points. Always write up to five bullet points max.\n\nThe users writing may be a blog post, an essay, non-fiction writing, or writing in some other form. Figure out what medium they are writing in, then give appropriate feedback. If you are unsure, state your assumption on what you think it is before you produce the bullet points.\n\nIf the user has not written enough to give good ideas, or has written gibberish, politely prompt the user on how they could get their writing to get to a state where you can help."
          },
          {
            "role": "user",
            "content": "The advent of AI presents significant challenges and opportunities for our society. In the short term, the pervasive nature of AI and its ability to sway public opinion can potentially undermine democratic processes, such as elections. This power can be harnessed either legitimately, through targeted political campaigns, or nefariously, as seen in recent instances of voter manipulation and misinformation campaigns. As AI applications become ever more embedded in our daily lives, there is also the risk of them slowly hijacking our biological instincts and preferences, shaping personal and societal decisions in subtle, practically invisible ways that may escape regulation or public scrutiny.\n\nIn the long term, our increasing dependence on AI can lead to it exercising a slow but steady erosion of our autonomy, leaving less room for free will, diversity and pluralism, pillars of any thriving democracy. As more decisions are delegated to AI in multiple domains - from personal choices regarding media consumption, purchases, lifestyle, all the way to collective decisions regarding city management, resource distribution, healthcare or education - humans will gradually be making a lesser proportion of the direct decisions that shape their own lives.\n\nShould the pace of AI development and integration in all aspects of life continue unabated and unregulated, the very far future could lead to a situation where humans, as a far less intelligent species, might find their interests overridden by AI objectives. Our democratic systems might struggle to function effectively in such a landscape, as the power dynamics that traditionally govern human societies get disrupted. The very promise of democracy, that every individual gets a say in shaping societal rules and decisions, could lose its meaning if the decisions that significantly influence our lives are made by AI algorithms instead of human beings.\n\nThis prospect reiterates the need for proactive regulation, ethical guidelines and public discourse around the use of AI in our societies. It is crucial that long-term societal implications are considered in parallel with the exhilarating technological advances. Democracy and AI can coexist, provided we acknowledge the challenges, act responsibly and shape AI advances to not only respect but also enhance the democratic fabric of our societies. Ultimately, it is up to us, humans, to determine the role AI will play in our future and how it will affect the democratic values we uphold."
          },
          {
            "role": "assistant",
            "content": "It seems like this text is part of an essay or opinion piece about the challenges and possible impacts of artificial intelligence on democratic societies. Here are some ideas to flesh out and improve the concepts highlighted in the writing:\n\n1. Delve deeper into real-world examples: Use concrete examples to illustrate recent instances of AI-driven voter manipulation and misinformation. These case studies will add real-world context, making the concerns more tangible.\n\n2. Develop a counter-argument: Demonstrate a balanced view by also discussing potential benefits of using AI in democratic processes, such as the potential for reduced bias in decision making or increased efficiency in managing resources. \n\n3. The human aspect: Dive deeper into how AI's influence might change our daily lives, perhaps leading to societal shifts. Painting a clearer picture on AI's influence in behavioral change in society could make your writing more compelling.\n\n4. Provide specific regulatory measures: Instead of vagueness, suggest concrete regulatory measures or guidelines that could mitigate the risks you've identified. \n\n5. Discuss critically AI and the future: Expand on your thoughts about the far future where AIs might overshadow human will, perhaps by considering different potential scenarios or the ideas and concerns of prominent thinkers on this subject."
          }
        ],
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response
}
