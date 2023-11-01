import { createTRPCRouter } from "~/server/api/trpc";
import { suggestionRouter } from "./routers/suggestion";
import { filesRouter } from "./routers/files";
import { type inferRouterOutputs } from "@trpc/server";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  suggestion: suggestionRouter,
  files: filesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
