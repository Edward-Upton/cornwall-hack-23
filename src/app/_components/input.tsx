"use client";

import { AlignVerticalSpaceAround, ArrowUpDown, type LucideIcon, Expand, Minimize, Minimize2, KanbanSquare, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { type EditorType } from "~/lib/editors-types";
import { api } from "~/trpc/react";

const editors: {
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

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="grid-cols-16 grid h-full w-full gap-4">
      {/* Input */}
      <div className="col-span-11 h-full">
        <Textarea
          value={input}
          onChange={(v) => setInput(v.target.value)}
          className="h-full resize-none font-mono text-lg"
        />
      </div>
      {/* Modas */}
      <div className="group flex h-full flex-col gap-2">
        {editors.map((editor) => (
          <Button
            key={editor.value}
            variant="ghost"
            className="h-16 hover:bg-accent/50"
            onClick={() =>
              submission.mutate({
                editorType: editor.value,
                text: input,
              }, {
                onSuccess: (data) => {
                  setResult(data?.content ?? "");
                }
              })
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
