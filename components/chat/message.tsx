import { UIMessage } from "ai";
import React from "react";
import { Message, MessageContent } from "../ai-elements/message";
import { cn } from "@/lib/utils";
import { Response } from "../ai-elements/response";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "../ai-elements/reasoning";
import { ToolTypeEnum } from "@/lib/ai/tools/constant";
import ToolCall from "./tool-call";
import MessageAction from "./message-action";
import { Source, Sources, SourcesContent, SourcesTrigger } from "../ai-elements/sources";

interface Props {
  message: UIMessage;
  isLoading: boolean;
}

const PreviewMessage = React.memo(({ message, isLoading }: Props) => {
  const sources = message.parts
    .filter((part) => part.type === ToolTypeEnum.WebSearch && part.state === "output-available")
    .flatMap((part) => (part as any).output?.results || []);

  const uniqueSources = sources.filter((source, index, self) =>
    index === self.findIndex((t) => (
      t.url === source.url
    ))
  );

  return (
    <Message from={message.role} key={message.id} className={cn("", message.role !== "user" && "!max-w-full")}>
      <MessageContent className={cn("text-[15.5px] dark:text-white", message.role !== "user" ? "!w-full !max-w-full !px-1 !pb-0 !bg-transparent !m-0 !min-h-0" : "!bg-muted !p-2.5 text-[14.5px] !text-foreground")}>
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text": {
              return (
                <Response key={`${message.id}-${i}`} sources={uniqueSources}>{part.text}</Response>
              );
            }
            case "reasoning": {
              return (
                <Reasoning key={`${message.id}-reason-${i}`}>
                  <ReasoningTrigger />
                  <ReasoningContent>{part.text}</ReasoningContent>
                </Reasoning>
              );
            }
            case ToolTypeEnum.CreateNote: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  state={state}
                  output={output}
                  errorText={errorText}
                  isLoading={isLoading}
                />
              );
            }
            case ToolTypeEnum.SearchNote: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  state={state}
                  output={output}
                  errorText={errorText}
                  isLoading={isLoading}
                />
              );
            }
            case ToolTypeEnum.WebSearch: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  state={state}
                  output={output}
                  errorText={errorText}
                  isLoading={isLoading}
                />
              );
            }
            case ToolTypeEnum.ExtractWebUrl: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  state={state}
                  output={output}
                  errorText={errorText}
                  isLoading={isLoading}
                />
              );
            }
            default:
              return null;
          }
        })}

        {uniqueSources.length > 0 && (
          <Sources>
            <SourcesTrigger count={uniqueSources.length} />
            <SourcesContent>
              {uniqueSources.map((source: any, i: number) => (
                <Source key={i} href={source.url} title={source.title} />
              ))}
            </SourcesContent>
          </Sources>
        )}
        <MessageAction key={`action-${message.id}`} message={message} isLoading={isLoading} />
      </MessageContent>
    </Message>
  );
});

PreviewMessage.displayName = "PreviewMessage";
export default PreviewMessage;