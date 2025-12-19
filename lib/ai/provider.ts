import { customProvider } from "ai";
import {
    LanguageModelV2,
    LanguageModelV2CallOptions,
    LanguageModelV2Content,
    LanguageModelV2StreamPart,
} from "@ai-sdk/provider";
import { randomUUID } from "crypto";
import { ReadableStream } from "stream/web";
import { appendFile } from "fs/promises";
import { chatModels } from "./model";

const LOG_PATH =
    "c:\\\\Users\\\\mekot\\\\Desktop\\\\Computer Science\\\\weybre_ai\\\\.cursor\\\\debug.log";

const NODE_ENV = process.env.NODE_ENV!;
export const isProduction = NODE_ENV === "production";

const getAzureConfig = () => {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION ?? "2025-12-11-preview";
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-5.2-chat";

    if (!endpoint || !apiKey) {
        throw new Error(
            "Missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY environment variables."
        );
    }
    // Normalize: allow either base endpoint or full responses URL.
    const normalizedEndpoint = endpoint.replace(/\/+$/, "");
    const isFullResponsesUrl =
        normalizedEndpoint.includes("/openai/responses") ||
        normalizedEndpoint.includes("api-version=");
    const makeUrl = () =>
        isFullResponsesUrl
            ? normalizedEndpoint
            : `${normalizedEndpoint}/openai/responses?api-version=${apiVersion}`;

    const payload = {
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "H1",
        location: "lib/ai/provider.ts:getAzureConfig",
        message: "Azure env presence",
        data: {
            hasEndpoint: !!endpoint,
            hasApiKey: !!apiKey,
            isFullResponsesUrl,
            normalizedEndpoint,
            apiVersion,
            deployment,
        },
        timestamp: Date.now(),
    };

    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/9a8c17d4-8f35-4130-80ad-0b6a5c7837e1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).catch(() => { });
    appendFile(LOG_PATH, JSON.stringify(payload) + "\n").catch(() => { });
    // #endregion

    return { apiKey, deployment, makeUrl };
};

// Map AI SDK prompt to Azure OpenAI Responses chat messages.
const toChatMessages = (prompt: LanguageModelV2CallOptions["prompt"]) => {
    return prompt.map((msg) => {
        if (msg.role === "system") {
            return { role: "system", content: msg.content };
        }
        if (msg.role === "user") {
            // concatenate text parts
            const text = msg.content
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
            return { role: "user", content: text };
        }
        if (msg.role === "assistant") {
            const text = msg.content
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
            return { role: "assistant", content: text };
        }
        if (msg.role === "tool") {
            // Map tool results as plain text; tool threading not supported in this adapter.
            const text = msg.content
                .map((p) => (p.type === "tool-result" ? JSON.stringify(p.output) : ""))
                .join("");
            return { role: "assistant", content: text };
        }
        return { role: "user", content: "" };
    });
};

// Minimal Azure Responses-backed language model (non-streaming and streaming as synthetic stream).
const azureResponsesModel: LanguageModelV2 = {
    specificationVersion: "v2",
    provider: "azure-openai",
    modelId: "gpt-5.2-chat",
    supportedUrls: {},
    async doGenerate(options: LanguageModelV2CallOptions) {
        const { apiKey, deployment, makeUrl } = getAzureConfig();
        const messages = toChatMessages(options.prompt);
        const url = makeUrl();

        const tools = (options as any).tools;
        const toolChoice = (options as any).toolChoice;

        const body: any = {
            model: deployment,
            input: messages,
            stream: false
        };

        if (tools?.length) {
            body.tools = tools;
        }

        // Azure Responses API specific: explicitly sending 'auto' triggers "Invalid value" error.
        // We only send tool_choice if it's NOT auto (e.g. required, or specific function).
        if (toolChoice) {
            const isAuto = toolChoice === 'auto' || (typeof toolChoice === 'object' && toolChoice.type === 'auto');
            if (!isAuto) {
                body.tool_choice = toolChoice;
            }
        }

        const payload = {
            sessionId: "debug-session",
            runId: "run1",
            hypothesisId: "H2",
            location: "lib/ai/provider.ts:doGenerate",
            message: "Azure request preflight",
            data: {
                url,
                deployment,
                promptCount: messages.length,
                toolCount: tools?.length ?? 0,
                isStreaming: false,
            },
            timestamp: Date.now(),
        };

        // #region agent log
        fetch("http://127.0.0.1:7242/ingest/9a8c17d4-8f35-4130-80ad-0b6a5c7837e1", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).catch(() => { });
        appendFile(LOG_PATH, JSON.stringify(payload) + "\n").catch(() => { });
        // #endregion

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(
                `Azure OpenAI Responses error: HTTP ${res.status} ${errorText}`
            );
        }
        const data: any = await res.json();

        // Handle Content
        const text =
            data.output?.[0]?.content?.[0]?.text ??
            data.choices?.[0]?.message?.content ??
            "";

        // Fix: Use any[] to avoid strict type issues during build for now
        const content: any[] = [];
        if (text) {
            content.push({ type: "text", text: text });
        }

        // Handle Tool Calls (if any)
        const toolCalls =
            data.output?.[0]?.message?.tool_calls ||
            data.choices?.[0]?.message?.tool_calls;

        if (toolCalls?.length) {
            toolCalls.forEach((tc: any) => {
                content.push({
                    type: "tool-call",
                    toolCallId: tc.id,
                    toolName: tc.function.name,
                    args: JSON.stringify(JSON.parse(tc.function.arguments)), // Ensure string
                });
            });
        }

        return {
            content: content as unknown as LanguageModelV2Content[],
            finishReason: toolCalls?.length ? "tool-calls" : "stop",
            usage: {
                inputTokens: data.usage?.prompt_tokens,
                outputTokens: data.usage?.completion_tokens,
                totalTokens: data.usage?.total_tokens,
            },
            warnings: [],
        };
    },
    async doStream(options: LanguageModelV2CallOptions) {
        const { apiKey, deployment, makeUrl } = getAzureConfig();
        const messages = toChatMessages(options.prompt);
        const url = makeUrl();

        const tools = (options as any).tools;
        const toolChoice = (options as any).toolChoice;

        const body: any = {
            model: deployment,
            input: messages,
            stream: true
        };

        if (tools?.length) {
            body.tools = tools;
        }

        if (toolChoice) {
            const isAuto = toolChoice === 'auto' || (typeof toolChoice === 'object' && toolChoice.type === 'auto');
            if (!isAuto) {
                body.tool_choice = toolChoice;
            }
        }

        const logPayload = (msg: string, data: any) => {
            const payload = {
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "H-stream",
                location: "lib/ai/provider.ts:doStream",
                message: msg,
                data: data,
                timestamp: Date.now(),
            };
            appendFile(LOG_PATH, JSON.stringify(payload) + "\n").catch(() => { });
        };

        logPayload("Starting fetch", { url, body });

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            logPayload("Fetch error", { status: res.status, errorText });
            throw new Error(
                `Azure OpenAI Responses error: HTTP ${res.status} ${errorText}`
            );
        }

        logPayload("Fetch success", { status: res.status, headers: Object.fromEntries(res.headers.entries()) });

        const contentType = res.headers.get("content-type");
        const isEventStream = contentType?.includes("text/event-stream");

        const stream = new ReadableStream<LanguageModelV2StreamPart>({
            async start(controller) {
                const id = randomUUID();
                controller.enqueue({ type: "text-start", id });

                if (!res.body) {
                    controller.enqueue({ type: "text-end", id });
                    controller.close();
                    return;
                }

                if (!isEventStream) {
                    try {
                        const data = await res.json();
                        logPayload("Non-stream response", data);

                        const text = data.output?.[0]?.content?.[0]?.text ??
                            data.choices?.[0]?.message?.content ??
                            "";
                        if (text) {
                            controller.enqueue({ type: "text-delta", id, delta: text });
                        }
                    } catch (e) {
                        logPayload("JSON fallback error", e);
                        controller.error(e);
                    } finally {
                        controller.enqueue({ type: "text-end", id });
                        controller.close();
                    }
                    return;
                }

                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split("\n");
                        buffer = lines.pop() || "";

                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (!trimmed || trimmed === "data: [DONE]") continue;
                            if (trimmed.startsWith("data: ")) {
                                const dataStr = trimmed.slice(6);
                                try {
                                    logPayload("Stream chunk", { dataStr: dataStr.substring(0, 100) });
                                    const data = JSON.parse(dataStr);

                                    // Handle reasoning delta (Azure or OpenAI compatible)
                                    const deltaReasoning = data.choices?.[0]?.delta?.reasoning_content;

                                    if (deltaReasoning) {
                                        controller.enqueue({
                                            type: "reasoning-delta",
                                            id,
                                            delta: deltaReasoning,
                                        });
                                    }

                                    // Handle text delta
                                    const deltaText = data.choices?.[0]?.delta?.content
                                        ?? data.output?.[0]?.content?.[0]?.text
                                        ?? (data.type === "response.output_text.delta" ? data.delta : undefined); // Support new Azure format

                                    if (deltaText) {
                                        controller.enqueue({
                                            type: "text-delta",
                                            id,
                                            delta: deltaText,
                                        });
                                    }
                                } catch (e) {
                                    // console.error("Error parsing stream data chunk", e);
                                    // Sometimes chunks are split in weird places or multiple chunks in one line? 
                                    // But we are splitting by newline, so usually it's fine.
                                    // If we get here it might be because trimmed was not complete JSON
                                }
                            }
                        }
                    }
                } catch (e) {
                    controller.error(e);
                } finally {
                    controller.enqueue({ type: "text-end", id });
                    controller.close();
                }
            },
        });

        return {
            stream: stream as unknown as ReadableStream<LanguageModelV2StreamPart>,
            request: undefined,
            response: undefined,
        } as any;
    },
};

// ... (azureResponsesModel implementation)

// --- Azure Anthropic Adapter ---

const getAnthropicConfig = () => {
    // metadata: using specific env vars for Anthropic
    const apiKey = process.env.ANTHROPIC_KEY || process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.ANTHROPIC_API_URL || process.env.AZURE_OPENAI_ENDPOINT;

    if (!apiKey || !endpoint) {
        throw new Error("Missing ANTHROPIC_KEY/ANTHROPIC_API_URL or AZURE_OPENAI_API_KEY/AZURE_OPENAI_ENDPOINT for Anthropic.");
    }

    try {
        const urlObj = new URL(endpoint);

        // Standardize the path for Azure AI Foundry
        // Base: https://<resource>.cognitiveservices.azure.com

        // Reverting to standard /anthropic/messages as deployment path failed
        urlObj.pathname = "/anthropic/messages";

        // CRITICAL: Clear any existing query params
        urlObj.search = "";

        // Set the required version
        urlObj.searchParams.set("api-version", "2023-06-01");

        return { apiKey, url: urlObj.toString() };

    } catch (e) {
        return { apiKey, url: endpoint };
    }
};

const toAnthropicMessages = (prompt: LanguageModelV2CallOptions["prompt"]) => {
    let system: string | undefined = undefined;
    const messages: any[] = [];

    prompt.forEach((msg) => {
        if (msg.role === "system") {
            system = msg.content;
        } else if (msg.role === "user" || msg.role === "assistant") {
            const content = msg.content.map(p => {
                if (p.type === 'text') return { type: 'text', text: p.text };
                // Tool calls/results handling would go here for full support
                return { type: 'text', text: '' };
            }).filter(p => p.text);

            // Simple text join for now to match basic requirement
            const textContent = content.map(c => c.text).join("");
            messages.push({ role: msg.role, content: textContent });
        }
    });

    return { system, messages };
};

const azureAnthropicModel: LanguageModelV2 = {
    specificationVersion: "v2",
    provider: "azure-anthropic",
    modelId: "claude-opus-4-5",
    supportedUrls: {},
    async doGenerate(options: LanguageModelV2CallOptions) {
        const { apiKey, url } = getAnthropicConfig();
        const { system, messages } = toAnthropicMessages(options.prompt);

        const body = {
            model: "claude-opus-4-5",
            max_tokens: 1024,
            messages,
            system,
            stream: false
        };

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Azure Anthropic Error: ${res.status} ${text}`);
        }

        const data: any = await res.json();
        const text = data.content?.[0]?.text ?? "";

        return {
            content: [{ type: "text", text }] as LanguageModelV2Content[],
            finishReason: "stop",
            usage: {
                inputTokens: data.usage?.input_tokens,
                outputTokens: data.usage?.output_tokens,
                totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
            },
            warnings: [],
        };
    },
    async doStream(options: LanguageModelV2CallOptions) {
        const { apiKey, url } = getAnthropicConfig();
        const { system, messages } = toAnthropicMessages(options.prompt);

        const body = {
            model: "claude-opus-4-5",
            max_tokens: 1024,
            messages,
            system,
            stream: true, // Enable streaming
        };

        const logPayload = (msg: string, data: any) => {
            const payload = {
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "H-anthropic-stream",
                location: "lib/ai/provider.ts:azureAnthropicModel.doStream",
                message: msg,
                data: data,
                timestamp: Date.now(),
            };
            appendFile(LOG_PATH, JSON.stringify(payload) + "\n").catch(() => { });
        };

        logPayload("Starting Anthropic fetch", { url, bodyModel: body.model });

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
                "x-api-key": apiKey,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const text = await res.text();
            logPayload("Anthropic Fetch error", { status: res.status, errorText: text, url });
            throw new Error(`Azure Anthropic Error: ${res.status} ${text}`);
        }

        logPayload("Anthropic Fetch success", { status: res.status });

        const stream = new ReadableStream<LanguageModelV2StreamPart>({
            async start(controller) {
                const id = randomUUID();
                controller.enqueue({ type: "text-start", id });

                if (res.body) {
                    const reader = res.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = "";

                    try {
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            buffer += decoder.decode(value, { stream: true });
                            const lines = buffer.split("\n");
                            buffer = lines.pop() || "";

                            for (const line of lines) {
                                const trimmed = line.trim();
                                if (!trimmed || trimmed.startsWith("event: ")) continue;
                                if (trimmed.startsWith("data: ")) {
                                    const dataStr = trimmed.slice(6);
                                    if (dataStr === "[DONE]") continue;

                                    try {
                                        const data = JSON.parse(dataStr);

                                        // Handle correct Anthropic stream events
                                        if (data.type === "content_block_delta") {
                                            if (data.delta?.type === "text_delta") {
                                                controller.enqueue({
                                                    type: "text-delta",
                                                    id,
                                                    delta: data.delta.text,
                                                });
                                            } else if (data.delta?.type === "input_json_delta") {
                                                // Handle partial tool inputs if needed
                                            } else if (data.delta?.type === "thinking_delta" || data.delta?.type === "reasoning_delta") {
                                                // Hypothetical "thinking" support
                                                controller.enqueue({
                                                    type: "reasoning-delta",
                                                    id,
                                                    delta: data.delta.thinking || data.delta.reasoning || data.delta.text, // Adjust based on actual payload
                                                });
                                            }
                                        }
                                        // Also check for OpenAI-like reasoning if the proxy normalizes
                                        else if (data.choices?.[0]?.delta?.reasoning_content) {
                                            controller.enqueue({
                                                type: "reasoning-delta",
                                                id,
                                                delta: data.choices[0].delta.reasoning_content,
                                            });
                                        }
                                        // Fallback text delta (OpenAI style)
                                        else if (data.choices?.[0]?.delta?.content) {
                                            controller.enqueue({
                                                type: "text-delta",
                                                id,
                                                delta: data.choices[0].delta.content,
                                            });
                                        }

                                    } catch (e) {
                                        // console.error("Error parsing Anthropic stream", e);
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        controller.error(e);
                    }
                }

                controller.enqueue({ type: "text-end", id });
                controller.close();
            },
        });

        return {
            stream: stream as unknown as ReadableStream<LanguageModelV2StreamPart>,
            request: undefined,
            response: undefined,
        } as any;
    }
};

const languageModels: Record<string, LanguageModelV2> = {};
chatModels.forEach((model) => {
    if (model.id === "claude-opus-4-5") {
        languageModels[model.id] = azureAnthropicModel;
    } else {
        languageModels[model.id] = azureResponsesModel;
    }
});
languageModels["title-model"] = azureResponsesModel;

export const myProvider = customProvider({
    languageModels,
});