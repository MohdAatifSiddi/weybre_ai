import React from "react";
import type { UIMessage } from "ai";
import { Action, Actions } from "../ai-elements/action";
import { ArrowBigDownIcon, CopyIcon, ShareIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateNote } from "@/features/use-note";


interface Props {
    message: UIMessage;
    isLoading: boolean;
}

const MessageAction = React.memo(({ isLoading, message }: Props) => {
    const { mutateAsync } = useCreateNote();

    if (message.role === "user") return null;

    // console.log("MessageAction rendering", { isLoading, messageId: message.id });

    const getText = () => {
        return message.parts
            ?.filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("\n")
            .trim();
    };

    const onCopy = async () => {
        const text = getText();
        if (!text) return toast.error("No text to copy");
        await navigator.clipboard.writeText(text);
        toast.success("Copied!");
    };
    const onSave = async () => {
        const text = getText();
        if (!text) return toast.error("No text to save");
        toast.promise(
            mutateAsync({
                title: "Untitled",
                content: text,
            }),
            {
                loading: "Saving note...",
                success: () => "Note saved!",
                error: "Failed to save note",
            }
        );
    };

    const onShare = async () => {
        const text = getText();
        if (!text) return toast.error("No text to share");
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Shared Message',
                    text: text,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        }
    };
    return (
        <Actions className="mt-2 !text-base">
            <Action className="!h-auto !bg-muted !rounded-full cursor-pointer" title="Copy" onClick={onCopy}>
                <CopyIcon className="size-4" />
                <span>Copy</span>
            </Action>
            <Action className="!h-auto !w-auto !bg-muted !rounded-full cursor-pointer" title="Save as note" onClick={onSave}>
                <ArrowBigDownIcon className="size-4" />
                <span>Save as note</span>
            </Action>
            <Action className="!h-auto !bg-muted !rounded-full cursor-pointer" title="Share" onClick={onShare}>
                <ShareIcon className="size-4" />
                <span>Share</span>
            </Action>
        </Actions>
    );
});

MessageAction.displayName = "MessageAction";

export default MessageAction;