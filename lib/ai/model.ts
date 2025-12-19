export interface ChatModel {
    id: string;
    name: string;
    description: string;
}

// Single-source all chat traffic to Azure OpenAI Responses (deployment: gpt-5.2-chat).
export const chatModels: ChatModel[] = [
    {
        id: "gpt-5.2-chat",
        name: "GPT-5.2",
        description:
            "Azure OpenAI Responses API deployment (model version 2025-12-11, Preview).",
    },
    {
        id: "claude-opus-4-5",
        name: "Claude Opus 4.5",
        description: "Azure Anthropic API deployment (model version 20251101, Preview).",
    },
];

export const DEFAULT_MODEL_ID = chatModels[0].id;
export const DEVELOPMENT_CHAT_MODEL = chatModels[0].id;

export const MODEL_OPTIONS = chatModels.map((m) => ({
    value: m.id,
    label: m.name,
}));