"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Theme from "./theme";
import ActiveLink from "./active-link";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useDebounce } from "~/lib/debounce";
import { z } from "zod";

export default function Nav() {
  const userQuery = api.users.getUser.useQuery();
  const addOpenAIKey = api.users.addOpenAIKey.useMutation();
  const updateModelSelection = api.users.updateModelSelection.useMutation();

  const [openAIKey, setOpenAIKey] = useState<string>(userQuery.data?.openAIKey ?? "");
  const debouncedOpenAIKey = useDebounce(openAIKey, 500);

  const [model, setModel] = useState<"gpt-4" | "gpt-3.5-turbo">(userQuery.data?.openAIModel ?? "");

  console.log(userQuery.data?.openAIModel);

  useEffect(() => {
    addOpenAIKey.mutate({ key: debouncedOpenAIKey });
  }, [debouncedOpenAIKey]);

  useEffect(() => {
    setOpenAIKey(userQuery.data?.openAIKey ?? "");
  }, [userQuery.data]);

  useEffect(() => {
    // Get the model as an enum
    updateModelSelection.mutate({ model });
  }, [model]);


  return (
    <nav className="flex items-center justify-between border-b-2 px-16 py-2 font-mono shadow-lg">
      <div className="flex items-center gap-8">
        {/* Page Title */}
        <h1 className="text text-lg font-bold text-primary">rubberduck.sh</h1>
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <ActiveLink href="/" display="home" />
          </Button>
          <Button variant="link" size="sm" asChild>
            <ActiveLink href="/components" display="components" />
          </Button>
          <Button variant="link" size="sm" asChild>
            <ActiveLink href="/documentation" display="documentation" />
          </Button>
        </div>
      </div>
      {/* Theme + Login */}
      <div className="flex items-center gap-4">
        <Theme />
        {userQuery.data && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-8 w-8 hover:cursor-pointer">
                <AvatarImage src={userQuery.data.image ?? ""} />
                <AvatarFallback>{userQuery.data.name}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="mt-4 w-128 space-y-4 text-right"
            >
              <p className="border-b-2 pb-2">{userQuery.data.email}</p>
        
              <Input
                placeholder="OpenAI key..."
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
              />
              <div className="w-full">
                <Link href={"/api/auth/signout"}>Sign out</Link>
                
              </div>
              <div className="w-full flex flex-row justify-between gap-x-2">
                <Button onClick={() => setModel("gpt-4")} variant="outline" className={
                  model === "gpt-4" ? "bg-accent text-primary" : "text-background/50"
                }>
                  gpt-4
                </Button>
                <Button onClick={() => setModel("gpt-3.5-turbo")} variant="outline" className={
                  model === "gpt-3.5-turbo" ? "bg-accent text-primary" : "text-background/50"
                }>
                  gpt-3.5-turbo
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
        {!userQuery.data && (
          <Button variant="outline" asChild>
            <Link href={"/api/auth/signin"}>Sign in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
