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
      <Textarea
        value={input}
        onChange={(v) => setInput(v.target.value)}
        className="h-[40rem] resize-none font-mono text-lg"
      />
      <Button
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
      <p className="whitespace-pre-wrap">{result}</p>
    </div>
  );
};

export default Input;
