import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import AppSidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">
            <Spinner className="w-16 h-16 text-primary" /></div>}>
            <NuqsAdapter>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset
                    className="relative overflow-x-hidden pt-0">
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </NuqsAdapter>
        </Suspense>
    );
}