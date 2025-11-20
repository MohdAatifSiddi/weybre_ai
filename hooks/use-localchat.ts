import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocalChatState {
    localModeId: string;
    isHistoryOpen: boolean;
    onToggleHistory: () => void;
    setLocalModeId: (id: string) => void;
}

export const useLocalChat = create<LocalChatState>()(
    persist(
        (set, get) => ({
            localModeId: "",
            isHistoryOpen: false,
            onToggleHistory: () => set({ isHistoryOpen: !get().isHistoryOpen }),
            setLocalModeId: (id: string) => set({ localModeId: id }),
        }),
        {
            name: "local-chat",
        }
    )
)