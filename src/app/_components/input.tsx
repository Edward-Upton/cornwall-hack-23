"use client";

import {
  AlignVerticalSpaceAround,
  List,
  BookOpenText,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { type EditorType } from "~/lib/editors-types";
import { api } from "~/trpc/react";
import TextAnim from "./text-anim";

const editors: {
  display: string;
  value: EditorType;
  icon: LucideIcon;
}[] = [
  {
    display: "Expand",
    value: "expansion",
    icon: List,
  },
  {
    display: "Summarise",
    value: "summarise",
    icon: AlignVerticalSpaceAround,
  },
  {
    display: "Cite",
    value: "cite",
    icon: BookOpenText,
  },
];

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState("");

  return (
    <div className="grid h-full w-full grid-cols-16 gap-4">
      {/* Input */}
      <div className="col-span-11 flex h-full flex-col">
        <Textarea
          value={input}
          onChange={(v) => setInput(v.target.value)}
          className="h-full resize-none font-mono text-lg"
          // A tad annoying, but React seems to have its types mixed up
          onSelect={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            const selected: string = (e as any).target.value.substring(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
              (e as any).target.selectionStart,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
              (e as any).target.selectionEnd,
            );
            setSelected(selected);
          }}
        />
        {selected}
        <TextAnim text={result} duration={5} />
      </div>
      {/* Modas */}
      <div className="group flex h-full flex-col gap-2">
        {editors.map((editor) => (
          <Button
            key={editor.value}
            variant="ghost"
            className="h-16 hover:bg-accent/50"
            onClick={() =>
              submission.mutate(
                {
                  editorType: editor.value,
                  text: selected.length > 0 ? selected : input,
                },
                {
                  onSuccess: (data) => {
                    setResult(data?.content ?? "");
                  },
                },
              )
            }
          >
            <div className="space-y-3 px-2">
              <editor.icon className="w-full" />
              <p className="text-sm opacity-0 transition-opacity group-hover:opacity-100">
                {editor.display}
              </p>
            </div>
          </Button>
        ))}
      </div>
      {/* Suggestion */}
      <div className="col-span-4 flex h-full flex-col gap-2">
        <Textarea
          value={result}
          className="grow resize-none font-mono text-lg"
        />
      </div>
    </div>
  );
};

export default Input;
