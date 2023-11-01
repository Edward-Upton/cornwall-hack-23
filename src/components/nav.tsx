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

export default function Nav() {
  const userQuery = api.users.getUser.useQuery();
  const addOpenAIKey = api.users.addOpenAIKey.useMutation();

  const [openAIKey, setOpenAIKey] = useState(userQuery.data?.openAIKey ?? "");
  const debouncedOpenAIKey = useDebounce(openAIKey, 500);

  useEffect(() => {
    if (!debouncedOpenAIKey) return;

    addOpenAIKey.mutate({ key: debouncedOpenAIKey });
  }, [debouncedOpenAIKey]);

  useEffect(() => {
    setOpenAIKey(userQuery.data?.openAIKey ?? "");
  }, [userQuery.data]);

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
              className="mt-4 w-56 space-y-4 text-right"
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
