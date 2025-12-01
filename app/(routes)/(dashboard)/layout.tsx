import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { RiLoader5Fill } from "@remixicon/react";
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";
import MainContent from "./_common/main-content";

export default async function DashboardLayout({children,}:{children: React.ReactNode;}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/auth/sign-in");
    }

    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">
            <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
            </div>}>
            <NuqsAdapter>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="relative overflow-x-hidden pt-0">
                        <MainContent>
                            {children}
                        </MainContent>
                    </SidebarInset>
                </SidebarProvider>
            </NuqsAdapter>
        </Suspense>
    )

}