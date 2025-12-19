import { ExternalLink } from "lucide-react";
import { FC, memo } from "react";
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "../ai-elements/chain-of-thought";

interface Props {
  type: "webSearch" | "extractWebUrl";
  input: any;
  output: any;
}

export const SearchExtractPreview: FC<Props> = memo(
  ({ type, input, output }) => {
    const results = output?.results || [];
    const hasError = output?.success === false;
    const errorMessage = output?.error || output?.message || "Unknown error";

    const headerText =
      type === "webSearch"
        ? `Query: "${input?.query}"`
        : `URLs: "${input?.urls?.join(", ") || ""}"`;

    const countText = hasError
      ? `Error: ${errorMessage}`
      : type === "webSearch"
        ? `Used ${results.length} sources`
        : `Found ${results.length} pages`;

    const itemText = (item: any) =>
      type === "webSearch" ? item.title || "No title" : item.url || "No URL";

    const getHostname = (url?: string) => {
      if (!url) return "unknown";
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    };

    return (
      <ChainOfThought className="w-full border border-border/40 rounded-lg py-3 px-3">
        <ChainOfThoughtHeader>{headerText}</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            label={
              type === "webSearch"
                ? `Searching the web for "${input?.query}"`
                : `Fetching and extracting content from URLs`
            }
            status="complete"
          />
          <ChainOfThoughtStep
            label={countText}
            status="complete"
          >
            {Array.isArray(results) && results.length > 0 && (
              <ChainOfThoughtSearchResults>
                {results.map((item: any, i: number) => (
                  <a
                    key={i}
                    href={item?.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ChainOfThoughtSearchResult>
                      {item?.favicon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.favicon}
                          alt="favicon"
                          className="h-3 w-3 rounded-sm"
                        />
                      )}
                      <span className="text-[11px]">
                        {getHostname(item?.url)}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </ChainOfThoughtSearchResult>
                  </a>
                ))}
              </ChainOfThoughtSearchResults>
            )}
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    );
  }
);

SearchExtractPreview.displayName = "SearchExtractPreview";
