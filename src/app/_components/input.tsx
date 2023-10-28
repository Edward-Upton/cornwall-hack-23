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
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <Textarea
            value={input}
            onChange={(v) => setInput(v.target.value)}
            className="h-[40rem] resize-none font-mono text-lg"
          />
        </div>
        <div className="space-y-2">
          <Textarea
            value={result}
            onChange={(v) => setInput(v.target.value)}
            className="h-[37rem] resize-none font-mono text-lg"
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
    </div>
  );
};

export default Input;
