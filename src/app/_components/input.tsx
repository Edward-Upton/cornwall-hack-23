"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

const Input = () => {
  const submission = api.suggestion.submit.useMutation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="grid h-full w-full grid-cols-12">
      <div className="col-span-7 h-full">
        <Textarea
          value={input}
          onChange={(v) => setInput(v.target.value)}
          className="h-full resize-none font-mono text-lg"
        />
      </div>
      <div className="h-full"></div>
      <div className="col-span-4 flex h-full flex-col gap-2">
        <Textarea
          value={result}
          onChange={(v) => setInput(v.target.value)}
          className="grow resize-none font-mono text-lg"
        />
        <Button
          className="w-full"
          onClick={() =>
            submission.mutate(
              { text: input },
              {
                onSuccess: (data) => {
                  setResult(data?.content ?? "");
                },
              },
            )
          }
        >
          Suggest
        </Button>
      </div>
    </div>
  );
};

export default Input;
