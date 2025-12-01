import { tavily } from "@tavily/core";
import { tool } from "ai";
import { title } from "process";
import z, { success } from "zod";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });


export const webSearch = () => {
    return tool({
        description: "Search the web for current information, Use when you need up-to-date info or when user asks to search the internet.",
        inputSchema: z.object({
            query: z.string().describe("Search web query"),
        }),
        execute: async ({ query }) => {
            try {
                const response = await tvly.search(query, {
                    includeAnswer: true,
                    includeFavicon: true,
                    includeImages: false,
                    maxResults: 3,
                });
            const results = (response.results || []).map((r: any) => ({
                title: r.title,
                url: r.url,
                content: r.content,
                favicon: r.favicon || null,
            }));
            return {
                success: true,
                answer: response.answer || "No summary avilable",
                results: results,
                response_time: response.responseTime,
            };
            } catch (error) {
                return {
                    success: false,
                    message: "Web search failed",
                    error: error instanceof Error ? error.message : "Unknown error",
                };
            }
        },
    });
}