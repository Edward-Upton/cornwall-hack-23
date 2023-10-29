"use client";

import { AlignVerticalSpaceAround, List, LoaderIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { EditEvent, Editors, type EditorType } from "~/lib/editors-types";
import { api } from "~/trpc/react";
import { Edit } from "./edit";
import { loadBindings } from "next/dist/build/swc";


const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [events, setEvents] = useState<EditEvent[]>([]);
  const [editLoading, setEditLoading] = useState(false);

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
                text: input,
              }, {
                onSuccess: (data) => {
                  const newEvent = {
                    input: input,
                    output: data?.content ?? "",
                    editType: editor.value,
                  }
                  const eventsLog = [...events, newEvent];
                  setEvents(eventsLog);
                  setEditLoading(false);
                }
              })
            }

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
          <Edit event={event} events={events} setEvents={setEvents} />
        ))}
      </div>
    </div>
  );
};

export default Input;
