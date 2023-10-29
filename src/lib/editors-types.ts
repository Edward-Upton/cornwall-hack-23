import { AlignVerticalSpaceAround, List, type LucideIcon } from "lucide-react";
import { z } from "zod";

export const EditorTypes = z.enum(["expansion", "points", "summarise", "cite"]);
export type EditorType = z.infer<typeof EditorTypes>;

export interface EditEvent {
  input: string;
  output: string;
  editType: EditorType;
};

export const Editors: {
  display: string;
  value: EditorType;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    display: "Expand",
    value: "expansion",
    icon: List,
    color: "bg-slate-400",
  },
  {
    display: "Summarise",
    value: "summarise",
    icon: AlignVerticalSpaceAround,
    color: "bg-gray-200",
  },
];