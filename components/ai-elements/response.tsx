"use client";
import { cn } from "@/lib/utils";
import { type ComponentProps, memo, useMemo } from "react";
import { Streamdown } from "streamdown";
import {
    InlineCitation,
    InlineCitationCard,
    InlineCitationCardBody,
    InlineCitationCardTrigger,
    InlineCitationCarousel,
    InlineCitationCarouselContent,
    InlineCitationCarouselHeader,
    InlineCitationCarouselIndex,
    InlineCitationCarouselItem,
    InlineCitationCarouselNext,
    InlineCitationCarouselPrev,
    InlineCitationQuote,
    InlineCitationSource,
} from "./inline-citation";

type ResponseProps = ComponentProps<typeof Streamdown> & {
    sources?: any[];
};

export const Response = memo(({ className, sources = [], children, ...props }: ResponseProps) => {
    const content = typeof children === 'string' ? children : '';

    const parts = useMemo(() => {
        if (!content || !sources.length) return [content];
        return content.split(/(\[\d+\])/g);
    }, [content, sources]);

    if (!sources.length) {
        return <Streamdown className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)} {...props}>{content}</Streamdown>;
    }

    return (
        <span className={cn("inline-block size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}>
            {parts.map((part, index) => {
                const match = part.match(/^\[(\d+)\]$/);
                if (match) {
                    const citationIndex = parseInt(match[1]) - 1;
                    const citation = sources[citationIndex];
                    if (citation) {
                        return (
                            <InlineCitation key={index} className="mx-1">
                                <InlineCitationCard>
                                    <InlineCitationCardTrigger sources={[citation.url]} />
                                    <InlineCitationCardBody>
                                        <InlineCitationCarousel>
                                            <InlineCitationCarouselHeader>
                                                <InlineCitationCarouselPrev />
                                                <InlineCitationCarouselNext />
                                                <InlineCitationCarouselIndex />
                                            </InlineCitationCarouselHeader>
                                            <InlineCitationCarouselContent>
                                                <InlineCitationCarouselItem>
                                                    <InlineCitationSource
                                                        title={citation.title}
                                                        url={citation.url}
                                                        description={citation.content || citation.description || "No description available"}
                                                    />
                                                </InlineCitationCarouselItem>
                                            </InlineCitationCarouselContent>
                                        </InlineCitationCarousel>
                                    </InlineCitationCardBody>
                                </InlineCitationCard>
                            </InlineCitation>
                        );
                    }
                }
                // Render text segments with Streamdown to preserve markdown formatting within segments
                return <Streamdown key={index} className="inline" {...props}>{part}</Streamdown>;
            })}
        </span>
    );
},
    (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.sources === nextProps.sources
);

Response.displayName = "Response";