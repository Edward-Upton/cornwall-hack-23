"use client";

import { Camera, Check, CroissantIcon, Cross, CrossIcon, Crosshair, FileQuestion, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { EditorType, EditorTypes, Editors, EditEvent } from "~/lib/editors-types";
import { cn } from "~/lib/utils";

import { api } from "~/trpc/react";

export function Edit({
  event,
  events,
  setEvents,
}: {event: EditEvent, events: EditEvent[], setEvents: (events: EditEvent[]) => void}) {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const Icon = Editors.find((e) => e.value === event.editType)?.icon ?? FileQuestion;
  const editorName = Editors.find((e) => e.value === event.editType)?.display ?? "Unknown";

  return (
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createPost.mutate({ name });
    //   }}
    //   className="flex flex-col gap-2"
    // >
    // CSS hack to allow us to pass in a custom color
      <div className="bg-primary gap-2 space-2 flex flex-col w-full rounded-md p-4">
        <div className="flex flex-row gap-2">
          <Icon className="text-accent"/> 
          <p className="text-primary-foreground">{editorName}</p>
        </div>
        <div className="">
          <Textarea className="bg-foreground/50 text-accent">{event.output}</Textarea>
        </div>
        <div className="flex justify-end gap-2 space-2">
          <Button className="bg-green-500 hover:bg-green-600">
            <Check />
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={
            () => {
              setEvents(events.filter((e) => e !== event));
            }
          }>
            <X/>
          </Button>
        </div>
      </div>

  );
}
      {/* <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button> */}
    {/* </form> */}
