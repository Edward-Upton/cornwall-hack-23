import { getServerAuthSession } from "~/server/auth";
import Input from "./_components/input";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div className="h-full">
      {session?.user ? <Input /> : <p>Please log in</p>}
    </div>
  );
}
