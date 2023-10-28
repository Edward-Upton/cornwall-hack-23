import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";
import Theme from "./theme";
import ActiveLink from "./active-link";

export default async function Nav() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between border-b-2 px-16 py-2 font-mono shadow-lg">
      <div className="flex items-center gap-8">
        {/* Page Title */}
        <h1 className="text text-lg font-bold text-primary">
          rubberduck.sh
        </h1>
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <ActiveLink href="/" display="Home" />
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <ActiveLink href="/components" display="Components" />
          </Button>
        </div>
      </div>
      {/* Theme + Login */}
      <div className="flex items-center gap-4">
        <Theme />
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 hover:cursor-pointer">
                <AvatarImage src={session.user?.image ?? ""} />
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/api/auth/signout"}>Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!session && (
          <Button variant="outline" asChild>
            <Link href={"/api/auth/signin"}>Sign in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
