import React, { ReactNode} from "react";
import QueryProvider from "./query-provider";
import { Toaster } from "sonner";

interface Props {
    children: ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <QueryProvider>
           {children}
           <Toaster position="top-center" duration={3000} richColors/>
        </QueryProvider>
    );
};

export default Providers;