"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { type EditEvent, Editors } from "~/lib/editors-types";
import { api } from "~/trpc/react";
import { Edit } from "./edit";

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [events, setEvents] = useState<EditEvent[]>([]);
  const [editLoading, setEditLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setInput("When we think about an entity's ability to dictate the arrangement of the atoms in our lightcone, we might be tempted to boil that capacity down to a single value like 'Intelligence' or 'IQ'. I don't think this is a helpful way of thinking about the problem.");
  }, []);

  // Handle new event checks if a pending event for the ID
  const handleNewEvent = (newEvent: EditEvent) => {
    // Search for the pending event
    const pendingEvent =
      events.find((event) => event.id === newEvent.id) ?? null;

    if (pendingEvent) {
    } else {
    }

    const allEvents = [...events];

    if (pendingEvent) {
      console.log("Found pending event; id: " + pendingEvent.id);
      console.log("Removing pending event: ", allEvents);
      allEvents.splice(events.indexOf(pendingEvent), 1);
      console.log("Removed pending event: ", allEvents);
      pendingEvent.id = newEvent.id;
      pendingEvent.input = newEvent.input;
      pendingEvent.output = newEvent.output;
      pendingEvent.editType = newEvent.editType;
      allEvents.push(pendingEvent);
    } else {
      console.log("No pending event found");
      console.log("Adding new event: ", allEvents.length);
      allEvents.push(newEvent);
      console.log("Added new event: ", allEvents.length);
    }

    setEvents(allEvents);
    setEditLoading(false);
  };

  return (
    <div className="grid h-full w-full grid-cols-16 gap-4">
      {/* Input */}
      <div className="col-span-11 flex h-full flex-col">
        <Textarea
          value={input}
          onChange={(v) => setInput(v.target.value)}
          className="h-full resize-none font-mono text-lg selection:bg-accent"
          placeholder="Start typing..."
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
      </div>
      {/* Editors */}
      <div className="group mt-4 flex h-full flex-col items-center gap-1">
        {Editors.map((editor) => (
          <>
            <Button
              key={editor.value}
              variant="ghost"
              className="h-16 w-16 hover:bg-accent/50"
              onClick={() => {
                const pendingID = crypto.randomUUID();
                setEditLoading(true);
                // Add a pending event.
                handleNewEvent({
                  id: pendingID,
                  input: selected.length > 0 ? selected : input,
                  output: "",
                  editType: editor.value,
                });
                submission.mutate(
                  {
                    editorType: editor.value,
                    text: selected.length > 0 ? selected : input,
                  },
                  {
                    onSuccess: (data) => {
                      handleNewEvent({
                        id: pendingID,
                        input: selected.length > 0 ? selected : input,
                        output: data?.content ?? "",
                        editType: editor.value,
                      });
                    },
                  },
                );
              }}
            >
              <editor.icon size={"36"} />
            </Button>
            <p className="mt-[-4px] w-full text-center text-sm opacity-0 transition-opacity group-hover:opacity-100">
              {editor.display}
            </p>
            <div className="space-y-1"></div>
          </>
        ))}
      </div>
      {/* Edit events */}
      <div className="col-span-4 flex h-full flex-col gap-2">
        {editLoading && (
          <div className="flex h-16 items-center justify-center rounded-md bg-primary">
            <p className="text-sm text-primary-foreground">Loading...</p>
            <LoaderIcon className="ml-2 h-6 w-6 animate-spin text-accent" />
          </div>
        )}
        {events.map((event) => (
          <Edit
            key={event.id}
            event={event}
            events={events}
            setEvents={setEvents}
            setInput={setInput}
          />
        ))}
      </div>
    </div>
  );
};

export default Input;
