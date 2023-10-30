import React, { useState, useEffect, ReactEventHandler } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable'
import { selected } from './input';
import { start } from 'repl';

export const Editable = ({
    html,
    setHtml,
    setSelected,
}: {
    html: string;
    setHtml: (html: string) => void;
    setSelected: (selected: selected) => void;
}) => {
  const contentEditable = React.createRef();

  useEffect(()=>{
    highlight(6, 11);
  }, [])

const handleChange = (e: ContentEditableEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setHtml(e.target.value);
}

const highlight = (start: number, end: number) => {
    const originalText = html;
    const beforeText = originalText.slice(0, start);
    const highlightedText = originalText.slice(start, end);
    const afterText = originalText.slice(end);

    // Add this CSS to the span
    // :focus {
    //     outline: none; /* no outline - for most browsers */
    //     box-shadow: none; /* no box shadow - for some browsers or if you are using Bootstrap */
    // }
    setHtml(`${beforeText}<span style='background-color: blue; outline: none; box-shadow: none; '>${highlightedText}</span>${afterText}`);
}


return (
    <div className="rounded-md p-2 outline-dotted">
    {/* <div className="h-2 mb-3 w-full resize-none font-mono text-lg selection:bg-accent"> */}

    <ContentEditable
        innerRef={contentEditable as React.RefObject<HTMLElement>}
        html={html}
        disabled={false}
        onChange={handleChange}
        tagName='article'
        onSelect={(e) => {
            console.log(e);
        //   const selectedText = e.target.value.substring(
        //     e.target.selectionStart,
        //     e.target.selectionEnd,
        //   );
        //   setSelected({
        //     value: selectedText,
        //     start: e.target.selectionStart,
        //     end: e.target.selectionEnd,
        //   });
        }}
    />
    </div>
)
}