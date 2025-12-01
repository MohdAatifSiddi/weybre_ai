import prisma from "@/lib/prisma";
import { tool } from "ai";
import { title } from "process";
import { success, z } from "zod";

export const createNote = (userId: string) =>
    tool({
        description: "Create a note or Save to Note with title and content. use this when the user ask to create, save, or make a note.",
        inputSchema: z.object({
            title: z.string().describe("THe title of the note"),
            content: z.string().describe("The content/body of the note"),
        }),
        execute: async ({ title, content }) => {
            console.log("CREATE NOTE TOOL CALL");
            try {
                const note = await prisma.note.create({
                    data: {
                        userId,
                        title: title,
                        content: content,
                    },
                });
                return {
                    success: true,
                    message: `Note "${title}" created sucessfully with ID: ${note.id}`,
                    noteId: note.id,
                    title: note.title,
                    content: note.content,
                };

            } catch (error) {
                return {
                    success: false,
                    message: "Failed to create note..",
                    error: error instanceof Error ? error.message : "Unknown error",
                };
            }
        },
    });