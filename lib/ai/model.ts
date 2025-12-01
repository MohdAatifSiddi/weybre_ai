export interface ChatModel {
    id: string;
    name: string;
    description: string;
}

export const chatModels: ChatModel[] =[
    {
        id: "anthropic/claude-sonnet-4",
        name: "Claude 4",
        description: "Claude 4 is a large language model developed by Anthropic. It is based on the GPT-4 architecture and is trained on a massive dataset of text data. It is designed to be a versatile and powerful language model that can be used for a wide range of tasks, including natural language generation, text summarization, and question answering. Claude 4 is known for its ability to generate human-like text and is particularly well-suited for tasks that require creative and expressive language. It is also known for its strong understanding of language and context, which makes it a valuable tool for a wide range of applications."
    },
    {
        id: "xai/grok-4",
        name: "Grok 4",
        description: "Grok 4 is a large language model developed by XAI. It is based on the GPT-4 architecture and is trained on a massive dataset of text data. It is designed to be a versatile and powerful language model that can be used for a wide range of tasks, including natural language generation, text summarization, and question answering. Grok 4 is known for its ability to generate human-like text and is particularly well-suited for tasks that require creative and expressive language. It is also known for its strong understanding of language and context, which makes it a valuable tool for a wide range of applications."
    },
    {
        id: "openai/gpt-4.1",
        name: "GPT-4 Chat",
        description: "GPT-4 is a large language model developed by OpenAI. It is based on the GPT-4 architecture and is trained on a massive dataset of text data. It is designed to be a versatile and powerful language model that can be used for a wide range of tasks, including natural language generation, text summarization, and question answering. GPT-4 is known for its ability to generate human-like text and is particularly well-suited for tasks that require creative and expressive language. It is also known for its strong understanding of language and context, which makes it a valuable tool for a wide range of applications."
    },
    {
        id: "google/gemini-2.5-flash",
        name: "Gemini 2.5 Flash",
        description: "Gemini 2.5 Flash is a large language model developed by Google. It is based on the GPT-4 architecture and is trained on a massive dataset of text data. It is designed to be a versatile and powerful language model that can be used for a wide range of tasks, including natural language generation, text summarization, and question answering. Gemini 2.5 Flash is known for its ability to generate human-like text and is particularly well-suited for tasks that require creative and expressive language. It is also known for its strong understanding of language and context, which makes it a valuable tool for a wide range of applications."
    },
];

export const DEFAULT_MODEL_ID = chatModels[0].id;
export const DEVELOPMENT_CHAT_MODEL = "models/gemini-1.5-flash";

export const MODEL_OPTIONS = chatModels.map((m) => ({
    value: m.id,
    label: m.name,
}))