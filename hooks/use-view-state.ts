import { useQueryState } from "nuqs";

const useViewState = () => {
    const [isChatView, _setIsChatView] = useQueryState("view", {
        defaultValue: false,
        parse: (value) => value === "true",
        serialize: (value) => (value ? "true" : "false"),
        shallow: false,
    });
    
    const setIsChatView = (val: boolean) => _setIsChatView(val);
    const clearChatView = () => _setIsChatView(false);
    
    return {
        isChatView: isChatView ?? false,
        setIsChatView,
        clearChatView,
    };
};

export default useViewState;