"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
    // Create QueryClient inside the component to avoid serialization issues
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
