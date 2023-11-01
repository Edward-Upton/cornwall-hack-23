"use client";

export default function Components() {
  return (
    <div className="grid grid-flow-row-dense grid-cols-5 gap-2 overflow-y-auto">
      <div className="col-span-2 p-4 bg-slate-900 text-primary rounded-md space-y-12">
        <p className="text-lg">
          📜 Welcome to Rubberduck
        </p>
        <p>
          <b>rubberduck.sh</b> is a collection of tools for people that write. It uses LMs to defeat blank page syndrome, help brainstorm, and polish your writing.
        </p>

        <p>Its open source, so please contribute on <a href="https://github.com/Edward-Upton/cornwall-hack-23" className="text-blue-500">GitHub</a>.
        </p>
        <p>Usage:
          <ul>
            <li>- Make sure your OpenAI key is set in settings.</li>
            <li>- Write some text in the box.</li>
            <li>- Highlight a section, and click on an Editor in the side bar.</li>
            <li>- When the suggestion appears, click accept to replace the selected text with the suggestion text.</li>
          </ul>
        </p>
        <p>Editors:
          <ul>
            <li>- <i>brainstorm</i>: takes a rough outline and brainstorms some angles you could take</li>
            <li>- <i>structure</i>: given some text, returns a bulletpoint structure you could use</li>
            <li>- <i>expand</i>: given a short paragraph, expands it into something more substantial</li>
            <li>- <i>summarise</i>: takes some verbose text and shortens it</li>
            <li>- <i>critique</i>: gives criticism for the given text</li>
            <li>- <i>citation</i>: given some uploaded PDF files, this Editor finds a quote from the paper that supports the claim made.</li>
          </ul>
        </p>

        <p><u>The Manager</u><br />
          A tool that tells you which tool to use. Use it when you are stuck.
        </p>

      </div>
      <div className="col-span-3 p-4 bg-accent text-primary rounded-md space-y-12 selection:bg-accent">
        <p className="text-lg"><u>Example: Brainstorm</u></p>
        <div className="space-y-6">
          <p className="text-lg">The user inputs the following into the text box to get started:</p>
          <div className="bg-primary/20 p-4 rounded-md selection:bg-accent">
              <p>What is the relationship between AI and democracy? In the short term, AI provides opportunities and can empower people and organisations, but over long term will erode autonomy. In 21st century, we are already seeing some effects.</p>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-lg">They click on the <b>Structure</b> Editor, and it comes back with the following:</p>
          <div className="bg-primary/10 p-4 rounded-md selection:bg-accent">
              # The Intricacies of AI and Democracy<br /><br />

              ## Short-Term Opportunities and Empowerment
              - Discuss how AI can provide opportunities and empower individuals and organizations
              - Examples of how AI has played a transformative role in businesses and individual lives in the short term
              - Understand how AI applications like Google sign in and AI-powered smart cities, provide comfort and ease in day to day life
              <br /><br />

              ## Erosion of Autonomy: A Long-term Concern
              - Gradual erosion of autonomy with the surge of AI tools being used
              - Explain how AI applications that are designed to be convenient inadvertently track users Internet presence
              - Discuss how AI assistants and smart cities build a digital profile of individuals by collecting their data
              <br /><br />

              ## The Cost of Convenience
              - Discuss how the believably negligible cost of using AI applications can escalate to considerable loss of autonomy
              - Contemplate on the cumulative effect of continuous data collection by different AI applications
              - Highlight the importance of conscious decision-making while using these applications
              <br /><br />

              ## Role of AGI in Democracy
              - Discuss the concept of AGI and the power of autonomous decision-making
              - Explain the possible scenario where the majority does not need to be satisfied to maintain a democracy
              - Discuss the potential consequences if a small section of AI-driven machines held the decision-making power
              <br /><br />

              ## AI, Bias, and Equitability
              - Dive into the problem of bias in AI and its implications on democracy
              - Discuss how a biased AI could overlook certain sections of society, leading to inequitable service delivery
              - Stress on the importance of combating bias while designing AI systems
              <br /><br />

              ## AI: An International Perspective
              - Compare and contrast Chinese and American governments approach towards AI
              - Discuss potential reasons behind the stark differences in AI policies between the two nations
              - Explore how these diverse approaches can impact global AI governance in the future
              <br /><br />

          </div>
        </div>
      </div>
    </div>

  );
}
