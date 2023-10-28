import { z } from "zod";

export const EditorTypes = z.enum(["summarise", "simplify"]);
export type EditorType = z.infer<typeof EditorTypes>;
