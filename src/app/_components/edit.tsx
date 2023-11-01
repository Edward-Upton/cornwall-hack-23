"use client";

import { Check, FileQuestion, LoaderIcon, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Editors, type EditEvent } from "~/lib/editors-types";

export function Edit({
  event,
  events,
  setEvents,
  // setInput,
  replacementCallback,

}: {
  event: EditEvent, 
  events: EditEvent[], 
  setEvents: (events: EditEvent[]) => void
  // setInput: (text: string) => void
  replacementCallback: (start: number, end: number, replacement: string) => void
}) {
  const handleAccept = () => {
    replacementCallback(event.start ?? 0, event.end ?? 0, event.output);
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
        {(() => {
        if(event.output?.length > 0) {
          return <Textarea className="bg-foreground/50 text-accent" defaultValue={event.output}></Textarea>
        } else if (event.output == undefined) {
          return <Textarea className="bg-foreground/50 text-accent" defaultValue="SERVER ERROR"></Textarea>
        } else {
          return (
            <div className="bg-primary flex rounded-md justify-center items-center h-16">
              <LoaderIcon className="w-6 h-6 animate-spin text-accent"/>
            </div>
          )
        }
        })()}
      </div>
      <div className="flex justify-end gap-2 space-2">
        <Button className="bg-green-500 hover:bg-green-600" disabled={event.output == ""} onClick={handleAccept}>
          <Check />
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleReject}>
          <X/>
        </Button>
      </div>
      <p className="text-accent">{event.id}</p>
    </div>
  );
}