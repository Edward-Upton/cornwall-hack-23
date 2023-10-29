"use client";

import { AlignVerticalSpaceAround, List, LoaderIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { EditEvent, Editors, type EditorType } from "~/lib/editors-types";
import { api } from "~/trpc/react";
import { Edit } from "./edit";
import { loadBindings } from "next/dist/build/swc";
import TextAnim from "./text-anim";

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [events, setEvents] = useState<EditEvent[]>([]);
  const [editLoading, setEditLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");

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
      </div>
      {/* Editors */}
      <div className="group flex h-full flex-col gap-2">
        {Editors.map((editor) => (
          <Button
            key={editor.value}
            variant="ghost"
            className="h-16 hover:bg-accent/50"
            onClick={() => {
              setEditLoading(true);
              submission.mutate({
                editorType: editor.value,
                text: selected.length > 0 ? selected : input,,
              }, {
                onSuccess: (data) => {
                  const newEvent = {
                    input: selected.length > 0 ? selected : input,,
                    output: data?.content ?? "",
                    editType: editor.value,
                  }
                  const eventsLog = [...events, newEvent];
                  setEvents(eventsLog);
                  setEditLoading(false);
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
        {editLoading && (
          <div className="bg-primary flex rounded-md justify-center items-center h-16">
            <p className="text-sm text-primary-foreground">Loading...</p>
            <LoaderIcon className="w-6 h-6 ml-2 animate-spin text-accent" />
          </div>
        )}
        {events.map((event) => (
          <Edit event={event} events={events} setEvents={setEvents} setInput={setInput} />
        ))}
      </div>
    </div>
  );
};

export default Input;
