import {
  Expand,
  KanbanSquare,
  Lightbulb,
  Minimize2,
  type LucideIcon,
} from "lucide-react";
import { z } from "zod";

export const EditorTypes = z.enum([
  "expansion",
  "summarise",
  "structure",
  "brainstorm",
  "cite",
]);
export type EditorType = z.infer<typeof EditorTypes>;

export interface EditEvent {
  id: string;
  input: string;
  output: string;
  editType: EditorType;
  start?: number;
  end?: number;
}

export const Editors: {
  display: string;
  value: EditorType;
  icon: LucideIcon;
}[] = [
  {
    display: "Brainstorm",
    value: "brainstorm",
    icon: Lightbulb,
  },
  {
    display: "Structure",
    value: "structure",
    icon: KanbanSquare,
  },
  {
    display: "Expand",
    value: "expansion",
    icon: Expand,
  },
  {
    display: "Summarise",
    value: "summarise",
    icon: Minimize2,
  },
];
