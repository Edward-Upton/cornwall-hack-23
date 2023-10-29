import { z } from "zod";

export const EditorTypes = z.enum(["expansion", "points", "summarise", "structure", "brainstorm"]);
export type EditorType = z.infer<typeof EditorTypes>;
