"use client";

import { Check, FileQuestion, LoaderIcon, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Editors, type EditEvent } from "~/lib/editors-types";

export function Edit({
  event,
  events,
  setEvents,
  replacementCallback,
}: {
  event: EditEvent;
  events: EditEvent[];
  setEvents: (events: EditEvent[]) => void;
  replacementCallback: (
    start: number,
    end: number,
    replacement: string,
  ) => void;
}) {
  const handleAccept = () => {
    replacementCallback(event.start ?? 0, event.end ?? 0, event.output);
    removeEvent();
  };

  const handleReject = () => {
    removeEvent();
  };

  const removeEvent = () => {
    setEvents(events.filter((e) => e !== event));
  };

  const Icon =
    Editors.find((e) => e.value === event.editType)?.icon ?? FileQuestion;
  const editorName =
    Editors.find((e) => e.value === event.editType)?.display ?? "Unknown";

  return (
    <div className="w-full space-y-2 rounded-md bg-primary p-4 text-primary-foreground">
      {/* Editor title */}
      <div className="flex gap-2">
        <Icon />
        <p>{editorName}</p>
      </div>
      {/* Content to replace */}
      {event.output?.length > 0 ? (
        <Textarea
          className="bg-foreground/50 text-accent"
          defaultValue={event.output}
        ></Textarea>
      ) : (
        <div className="flex h-16 items-center justify-center rounded-md bg-primary">
          <LoaderIcon className="h-6 w-6 animate-spin text-accent" />
        </div>
      )}
      {/* Accept/Reject buttons */}
      <div className="flex w-full justify-end gap-2 text-white">
        <Button
          className="bg-green-500 hover:bg-green-600"
          disabled={event.output == ""}
          onClick={handleAccept}
        >
          <Check />
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleReject}>
          <X />
        </Button>
      </div>
    </div>
  );
}
