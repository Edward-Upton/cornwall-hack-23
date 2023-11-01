"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { type EditEvent, Editors, type EditorType } from "~/lib/editors-types";
import { api } from "~/trpc/react";
import { Edit } from "./edit";
import React from "react";
import { type ChatCompletionMessage } from "openai/resources";
import UploadFile from "./upload-file";

interface selected {
  start: number;
  end: number;
  value: string;
}

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [metaInput, setMetaInput] = useState("");
  const [events, setEvents] = useState<EditEvent[]>([]);
  const [selected, setSelected] = useState<selected>({ start: 0, end: 0, value: "" });
  const [files, setFiles] = useState<
    { key: string; url: string; name: string }[]
  >([]);

  const filesQuery = api.files.getUserFiles.useQuery();
  const deleteFileMutation = api.files.deleteFile.useMutation();

  useEffect(() => {
    setFiles(
      filesQuery.data?.map((file) => ({
        key: file.key,
        url: file.url,
        name: file.name,
      })) ?? [],
    );
  }, [filesQuery.data]);

  const replaceText = (start: number, end: number, replacement: string) => {
    if (start === 0 && end === 0) {
      setInput(replacement);
    } else {
      setInput((prev) => {
        return prev.substring(0, start) + replacement + prev.substring(end);
      });
    }
  }

  const eventsRef = useRef<EditEvent[]>();
  eventsRef.current = events;

  useEffect(() => {
    setMetaInput("Intelligence, Humanity and AI: A Conversation")
    setInput("When we think about an entity's ability to dictate the arrangement of the atoms in our lightcone, we might be tempted to boil that capacity down to a single value like 'Intelligence' or 'IQ'. I don't think this is a helpful way of thinking about the problem.");
  }, []);

  // Add an event to the display of EditEvents, prior to the API request finishing.
  const addPendingEvent = (event: EditEvent) => {
    eventsRef.current = [...events, event];
    setEvents([...events, event]);
  };

  // Update the pending event when the API request finishes.
  const updatePendingEvent = (newEvent: EditEvent) => {
    // Get the updated list of events from the ref.
    const allEvents = eventsRef.current;

    if (!allEvents) {
      throw new Error("Events ref is undefined. This should never happen.");
    }

    // Find the pending event using the UUID.
    const pendingEvent = allEvents.findIndex((e) => e.id === newEvent.id);

    if (pendingEvent === undefined) {
      throw new Error("Pending event not found. This should never happen.");
    }

    // Replace the pending event with the new event that has the API response.
    allEvents.splice(pendingEvent, 1, newEvent);

    eventsRef.current = allEvents;
    setEvents([...allEvents]);
  };

  const mutationCallback = React.useCallback((data: string | null | undefined, pendingID: string, editType: EditorType) => {
    updatePendingEvent({
      id: pendingID,
      input: selected.value.length > 0 ? selected.value : input,
      output: data,
      editType: editType,
      start: selected.value.length > 0 ? selected.start : 0,
      end: selected.value.length > 0 ? selected.end : 0,
    });
  }, [input, selected]);

  const handleEditorClick = async (type: EditorType) => {
    const pendingID = crypto.randomUUID();

    // Do nothing if user hasn't written anything
    if (input.length == 0) {
      return undefined;
    }
    
    // Add a pending event.
    addPendingEvent({
      id: pendingID,
      input: selected.value.length > 0 ? selected.value : input,
      output: "",
      editType: type,
      start: selected.value.length > 0 ? selected.start : 0,
      end: selected.value.length > 0 ? selected.end : 0,
    });
    const result = await submission.mutateAsync(
      {
        text: selected.value.length > 0 ? selected.value : input,
        editorType: type,
        metaText: metaInput,
      }
    );
    mutationCallback(result, pendingID, type);
  };

  return (
    <div className="mx-auto rounded-xl shadow-md md:max-w-8xl">
      <div className="md:flex">
        <div className="">
          <div className="h-24 w-full space-y-4 flex flex-row flex-wrap object-cover md:h-full md:w-32 bg-inherit">
            {/* Editors */}
            <div className="flex max-md:flex-row md:flex-col justify-center items-center gap-4 py-4">
              {Editors.map((editor) => (
                <div key={editor.value} className="group text-center opacity-80">
                  <Button
                    variant="ghost"
                    className="h-16 w-16 hover:bg-accent/50"
                    onClick={() => handleEditorClick(editor.value)}
                  >
                    <editor.icon size={"36"} />
                  </Button>
                  <p className="w-full text-sm opacity-20 transition-opacity group-hover:opacity-100">
                    {editor.display}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:p-4 grow">
          {/* Input */}
          <div className="tracking-wide text-indigo-500 mb-4 font-semibold">
            <p>type your title and a brief description to get started</p>
          </div>
          <div className="text-sm mt-4 h-full flex flex-col gap-3">
            <Textarea
              defaultValue={metaInput}
              onChange={(v) => setMetaInput(v.target.value)}
              className="h-2 w-full resize-none font-mono text-lg selection:bg-accent"
              placeholder="What are you writing about?"
            />
            <Textarea
              value={input}
              onChange={(v) => setInput(v.target.value)}
              className="w-full grow font-mono selection:bg-accent"
              placeholder="Let your imagination go wild..."
              onSelect={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const selectedText = e.target.value.substring(
                  e.target.selectionStart,
                  e.target.selectionEnd,
                );
                setSelected({
                  value: selectedText,
                  start: e.target.selectionStart,
                  end: e.target.selectionEnd,
                });
              }}
            />
          </div>
        </div>

        {/* Edit events */}
        <div className="py-4 space-y-2">
          {events.map((event) => (
            <Edit
              key={event.id}
              event={event}
              events={events}
              setEvents={setEvents}
              replacementCallback={replaceText}
            />
          ))}
        </div>
      </div>
      <div>
        <UploadFile
          onSuccess={(res) => {
            if (!res) return;
            const file = res[0];
            if (!file) return;
            setFiles((files) => [
              ...files,
              {
                key: file.key,
                url: file.url,
                name: file.name,
              },
            ]);
          }}
        />
        <div className="flex gap-2">
          {files.map((file) => (
            <div
              key={file.key}
              className="w-32 h-32 space-y-1 text-ellipsis rounded-lg bg-accent p-2 text-center flex flex-col justify-between items-center"
            >
              <p className="overflow-hidden text-ellipsis">{file.name}</p>
              <Button
                size="sm"
                onClick={() =>
                  deleteFileMutation.mutate(
                    { key: file.key },
                    {
                      onSuccess: () => {
                        setFiles((files) =>
                          files.filter((f) => f.key !== file.key),
                        );
                      },
                    },
                  )
                }
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Input;
