"use client";

import { Check, FileQuestion, LoaderIcon, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Editors, type EditEvent } from "~/lib/editors-types";

export function Edit({
  event,
  events,
  setEvents,
  setInput,
}: {
  event: EditEvent, 
  events: EditEvent[], 
  setEvents: (events: EditEvent[]) => void
  setInput: (text: string) => void
}) {
  const handleAccept = () => {
    setInput(event.output);
    removeEvent();
  }

  const handleReject = () => {
    removeEvent();
  }

  const removeEvent = () => {
    setEvents(events.filter((e) => e !== event));
  }

  const Icon = Editors.find((e) => e.value === event.editType)?.icon ?? FileQuestion;
  const editorName = Editors.find((e) => e.value === event.editType)?.display ?? "Unknown";

  return (
    <div className="bg-primary gap-2 space-2 flex flex-col w-full rounded-md p-4">
      <div className="flex flex-row gap-2">
        <Icon className="text-accent"/> 
        <p className="text-primary-foreground">{editorName}</p>
      </div>
      <div className="">
        {event.output?.length > 0 ? (
          <Textarea className="bg-foreground/50 text-accent">{event.output}</Textarea>
          ): (
            <div className="bg-primary flex rounded-md justify-center items-center h-16">
              <LoaderIcon className="w-6 h-6 animate-spin text-accent"/>
            </div>
          )
          }
      </div>
      <div className="flex justify-end gap-2 space-2">
        <Button className="bg-green-500 hover:bg-green-600" disabled={event.output == ""} onClick={handleAccept}>
          <Check />
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleReject}>
          <X/>
        </Button>
      </div>
    </div>
  );
}