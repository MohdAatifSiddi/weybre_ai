import { Hono } from "hono";
import z from "zod";
import { convertToModelMessages, stepCountIs, streamText, UIMessagePart, type UIMessage } from "ai";
import { ChatModel, DEVELOPMENT_CHAT_MODEL } from "@/lib/ai/model";
import { zValidator } from "@hono/zod-validator";
import { getAuthUser } from "@/lib/hono/hono-middleware";
import prisma from "@/lib/prisma";
import { checkGenerationLimit, generateTitleForUserMessage } from "@/app/actions/action";
import { isProduction, myProvider } from "@/lib/ai/provider";
import { generateUUID } from "@/lib/utils";
import { HTTPException } from "hono/http-exception";
import { createNote } from "@/lib/ai/tools/create-note";
import { searchNote } from "@/lib/ai/tools/search-note";
import { webSearch } from "@/lib/ai/tools/web-search";
import { extractWebUrl } from "@/lib/ai/tools/extract-url";
import { getSystemPrompt } from "@/lib/ai/prompt";
import { appendFile } from "fs/promises";

const LOG_PATH =
    "c:\\\\Users\\\\mekot\\\\Desktop\\\\Computer Science\\\\weybre_ai\\\\.cursor\\\\debug.log";

export const runtime = "nodejs";
const chatSchema = z.object({
    id: z.string().min(1),
    message: z.custom<UIMessage>(),
    selectedModelId: z.string() as z.ZodType<ChatModel["id"]>,
    selectedToolName: z.string().nullable(),
});

const chatIdSchema = z.object({
    id: z.string().min(1),
});

export const chatRoute = new Hono()
    .post("/", zValidator("json", chatSchema), getAuthUser, async (c) => {
        try {
            const user = c.get("user");
            const { id, message, selectedModelId, selectedToolName } = c.req.valid("json");

            const { isAllowed } = await checkGenerationLimit(user.id);

            if (!isAllowed) {
                throw new HTTPException(403, {
                    message: "Generation limit reached",
                });
            }
            let chat = await prisma.chat.findUnique({
                where: { id },
            });
            if (!chat) {
                const title = await generateTitleForUserMessage({
                    message,
                });
                chat = await prisma.chat.create({
                    data: {
                        id,
                        userId: user.id,
                        title: title,
                    },
                });
            }
            const messagesFromDB = await prisma.message.findMany({
                where: { chatId: id },
                orderBy: { createdAt: "desc" },
            });

            const historyPayload = {
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "H2",
                location: "app/api/[[...route]]/chat.ts:post",
                message: "Loaded chat history",
                data: {
                    count: messagesFromDB.length,
                    firstTimestamp: messagesFromDB[0]?.createdAt,
                    lastTimestamp: messagesFromDB[messagesFromDB.length - 1]?.createdAt,
                    order: "desc",
                },
                timestamp: Date.now(),
            };

            // #region agent log
            fetch("http://127.0.0.1:7242/ingest/9a8c17d4-8f35-4130-80ad-0b6a5c7837e1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(historyPayload),
            }).catch(() => { });
            appendFile(LOG_PATH, JSON.stringify(historyPayload) + "\n").catch(() => { });
            // #endregion

            const mapUIMessages: UIMessage[] = messagesFromDB.map((m) => ({
                id: m.id,
                role: m.role as "user" | "assistant" | "system",
                parts: m.parts as UIMessagePart<any, any>[],
                metadata: {
                    createdAt: m.createdAt,
                },
            }));
            const newUIMessages = [...mapUIMessages, message];

            const modelMessages = convertToModelMessages(newUIMessages);

            await prisma.message.create({
                data: {
                    id: message.id,
                    chatId: id,
                    role: "user",
                    parts: JSON.parse(JSON.stringify(message.parts)),
                },
            });
            const modelProvider = myProvider.languageModel(selectedModelId);

            const modelPayload = {
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "H3",
                location: "app/api/[[...route]]/chat.ts:post",
                message: "Streaming model selection",
                data: {
                    selectedModelId,
                    usedModelId: (modelProvider as any).modelId,
                    isProduction,
                    newMessageId: message.id,
                },
                timestamp: Date.now(),
            };

            // #region agent log
            fetch("http://127.0.0.1:7242/ingest/9a8c17d4-8f35-4130-80ad-0b6a5c7837e1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(modelPayload),
            }).catch(() => { });
            appendFile(LOG_PATH, JSON.stringify(modelPayload) + "\n").catch(() => { });
            // #endregion

            const result = streamText({
                model: modelProvider,
                system: getSystemPrompt(selectedToolName),
                messages: modelMessages,
                stopWhen: stepCountIs(5),
                tools: {
                    createNote: createNote(user.id),
                    searchNote: searchNote(user.id),
                    webSearch: webSearch(),
                    extractWebUrl: extractWebUrl(),
                },
                toolChoice: "auto",
                onError: (error) => {
                    console.log("Streaming error", error);
                },
            });
            return result.toUIMessageStreamResponse({
                sendReasoning: true,
                sendSources: true,
                generateMessageId: () => generateUUID(),

                onFinish: async ({ messages, responseMessage }) => {
                    console.log("complete message", responseMessage);
                    try {
                        await prisma.message.createMany({
                            data: messages.map((m: any) => ({
                                id: m.id || generateUUID(),
                                chatId: id,
                                role: m.role,
                                parts: JSON.parse(JSON.stringify(m.parts)),
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            })),
                            skipDuplicates: true,
                        });
                    } catch (error) {
                        console.log("error", error);
                    }
                },
            });
        } catch (error) {
            if (error instanceof HTTPException) {
                throw error;
            }
            throw new HTTPException(500, { message: "Internal server error" });
        }
    })
    .get("/", getAuthUser, async (c) => {
        try {
            const user = c.get("user");
            const chats = await prisma.chat.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
            });
            return c.json({
                success: true,
                data: chats,
            });
        } catch (error) {
            console.log(error, "Failed to fetch chats");
            throw new HTTPException(500, { message: "Internal server error" });
        }
    })
    .get("/:id", zValidator("param", chatIdSchema), getAuthUser, async (c) => {
        try {
            const user = c.get("user");
            const { id } = c.req.valid("param");

            const chat = await prisma.chat.findFirst({
                where: { id, userId: user.id },
                include: {
                    messages: {
                        orderBy: { createdAt: "asc" },
                    },
                },
            });
            if (!chat) {
                return c.json({ success: true, data: {} });
            }

            const uiMessages: UIMessage[] = chat.messages.map((m) => ({
                id: m.id,
                role: m.role as "user" | "assistant" | "system",
                parts: m.parts as UIMessagePart<any, any>[],
                metadata: { createdAt: m.createdAt },
            }));

            const chatWithMsg = {
                ...chat,
                messages: uiMessages,
            };
            return c.json({
                success: true,
                data: chatWithMsg,
            });
        } catch (error) {
            console.log(error, "Failed to fetch chat");
            throw new HTTPException(500, { message: "Internal server error" });
        }
    });