import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/nav";
import { ThemeProvider } from "~/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cornwall Hack 23",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TRPCReactProvider headers={headers()}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={`relative flex min-h-screen flex-col bg-background font-sans text-foreground ${inter.variable}`}
          >
            <Nav />
            <div className="grow px-64 py-32">{children}</div>
          </body>
        </ThemeProvider>
      </TRPCReactProvider>
    </html>
  );
}
