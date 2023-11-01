# rubberduck.sh

[**rubberduck.sh**](https://rubberduck.sh) is a collection of tools for people that write. It uses LMs to defeat blank page syndrome, help brainstorm, and polish your writing.

Usage:
- Make sure your OpenAI key is set in settings.
- Write some text in the box.
- Highlight a section, and click on an Editor in the side bar.
- When the suggestion appears, click accept to replace the selected text with the suggestion text.

Editors:
- **brainstorm**: takes a rough outline and brainstorms some angles you could take
- **structure**: given some text, returns a bulletpoint structure you could use
- **expand**: given a short paragraph, expands it into something more substantial
- **summarise**: takes some verbose text and shortens it
- **critique**: gives criticism for the given text
- **citation**: given some uploaded PDF files, this Editor finds a quote from the paper that supports the claim made.

# Developing

This is a [T3 Stack](https://create.t3.gg/) that uses:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

To fet started: 
- `curl -fsSL https://bun.sh/install | bash`
- `bun install`
- Copy `.env.example` to `.env` and fill in the values
- `bun dev`

# License

MIT



