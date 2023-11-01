import { Button } from "~/components/ui/button";
import { type EditorType, Editors } from "~/lib/editors-types";

export default function EditorList({
  handleEditorClick,
}: {
  handleEditorClick: (editor: EditorType) => Promise<void>;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto py-4 md:flex-col md:overflow-y-auto md:overscroll-y-none">
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
  );
}
