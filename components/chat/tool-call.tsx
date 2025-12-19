import { ToolUIPart } from "ai";
import React, { useEffect, useState } from "react";
import { getToolStatus } from "./tool-status";
import { LoaderIcon, LucideIcon } from "lucide-react";
import { ToolTypeEnum } from "@/lib/ai/tools/constant";
import { NoteCardPreview, NoteItemPreview } from "./tool-note-preview";
import { SearchExtractPreview } from "./tool-search-extract-preview";
import {
  Tool as AITool,
  ToolHeader as AIToolHeader,
  ToolContent as AIToolContent,
  ToolInput as AIToolInput,
  ToolOutput as AIToolOutput,
} from "../ai-elements/tool";

const formatToolName = (type?: string | null) => {
  // Ensure type is defined and is a string before calling replace
  if (!type || typeof type !== 'string' || type.trim() === '') {
    console.warn('Invalid tool type received:', type);
    return '';
  }
  return type.replace("tool-", "");
};

const ToolLoadingIndicator = React.memo(
  ({ loadingText }: { loadingText: string }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => setTime((time) => time + 1), 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full rounded-md bg-background/50 shadow-sm relative">
        <div className="absolute top-2 right-2 text-xs text-primary">{time}s</div>
        <div className="flex items-center gap-2 p-4">
          <LoaderIcon className="w-4 h-4 animate-spin" />
          <span className="text-sm">{loadingText}</span>
        </div>
        <div className="w-full h-1 bg-background/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progressBar" />
        </div>
      </div>
    );
  }
);

ToolLoadingIndicator.displayName = "ToolLoadingIndicator";

const toolRenders: Record<ToolUIPart["type"], (output: any, input: any) => React.ReactNode> = {
  [ToolTypeEnum.CreateNote]: (output) => (
    <div className="mb-1.5 mt-1">
      <NoteCardPreview noteId={output?.noteId} title={output?.title} content={output?.content} />
    </div>
  ),

  [ToolTypeEnum.SearchNote]: (output, input) => {
    const notes = output?.notes ?? [];
    return (
      <div className="w-full border border-border/40 rounded-lg py-3 px-1.5">
        <p className="text-sm pl-2">Searched for "{input?.query}"</p>
        <ul className="w-full pb-4 pt-2 space-y-1 max-h-48 overflow-y-auto">
          {notes.map((note: any) => (
            <li key={note.id}>
              <NoteItemPreview noteId={note.id} title={note.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  },
  [ToolTypeEnum.ExtractWebUrl]: (output, input) => {
    return (
      <SearchExtractPreview
        type="extractWebUrl"
        input={input}
        output={output}
      />
    );
  },
  [ToolTypeEnum.WebSearch]: (output, input) => {
    return (
      <SearchExtractPreview
        type="webSearch"
        input={input}
        output={output}
      />
    );
  },
};

interface ToolCallProps {
  toolCallId: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  output?: any;
  input?: any;
  errorText?: string;
  isLoading: boolean;
}

const ToolCall: React.FC<ToolCallProps> = ({
  isLoading,
  type,
  output,
  state,
  input,
  errorText,
}) => {
  const toolName = formatToolName(type);

  const { text, icon } = getToolStatus(toolName, state, output);

  console.log(type, "type");
  console.log(output, "output");
  console.log(state, "state");
  console.log(input, "input");


  const renderOutput = () => {
    if (state === "output-available") {
      const renderer = toolRenders[type];
      return renderer ? (
        renderer(output, input)
      ) : (
        <div className="mt-2">{JSON.stringify(output)}</div>
      );
    }

    if (state === "output-error") {
      return <div className="text-destructive">{errorText}</div>
    }

    return null;
  };
  if (isLoading && (state === "input-streaming" || state === "input-available")) {
    return <ToolLoadingIndicator loadingText={text} />;
  }

  return (
    <AITool defaultOpen={type === ToolTypeEnum.CreateNote}>
      <AIToolHeader
        title={toolName}
        type={type}
        state={state}
        className="border-b"
      />
      <AIToolContent>
        <AIToolInput input={input} />
        <AIToolOutput output={output} errorText={errorText} />
        <div className="mt-2">{renderOutput()}</div>
      </AIToolContent>
    </AITool>
  );
};

export default ToolCall;