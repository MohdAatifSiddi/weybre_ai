"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  RiBankCard2Fill,
  RiChatAiLine,
  RiMenuLine,
  RiArrowLeftSLine,
  RiScanLine,
  RiSettings3Line,
} from "@remixicon/react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthToken } from "@/hooks/use-auth-token";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import NavMenu from "./nav-menu";
import NavNotes from "./nav-notes";
import NavUser from "./nav-user";
import Logo from "@/components/logo";

const navItems = [
  { title: "Home", url: "/home", icon: RiScanLine },
  { title: "AI Chat", url: "/chat", icon: RiChatAiLine },
  { title: "Billing", url: "/billing", icon: RiBankCard2Fill },
  { title: "Settings", url: "/settings", icon: RiSettings3Line },
];

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const { clearBearerToken } = useAuthToken();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { useSession, signOut } = authClient;
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    signOut({
      fetchOptions: {
        onSuccess: () => {
          clearBearerToken();
          router.push("/auth/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign out");
          setIsSigningOut(false);
        },
      },
    });
  };

  const { toggleSidebar, state } = useSidebar();
  const [hovered, setHovered] = useState(false);
  const isCollapsed = state === "collapsed";
  const showTriggerInCollapsed = isCollapsed && hovered;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50 [&[data-state=collapsed]]:w-12" // ← FIXED: Compact 48px width in icon mode
      {...props}
    >
      <SidebarRail />

      {/* HEADER – Unchanged: Fits in compact mode */}
      <SidebarHeader
        className="h-16 border-b border-border/40"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isCollapsed ? (
          /* Collapsed: Centered icon or trigger on hover */
          <div className="flex h-full items-center justify-center px-1"> {/* Reduced to px-1 for extra compactness */}
            {showTriggerInCollapsed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-8 w-8 p-0 rounded-md"
              >
                <RiMenuLine className="h-4 w-4" />
              </Button>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    size="sm" 
                    asChild 
                    className="h-8 w-8 p-0"
                    tooltip="Home"
                  >
                    <div className="flex items-center justify-center">
                     <Logo url="/home" className="p-5" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </div>
        ) : (
          /* Expanded: Full Logo + trigger next to it */
          <div className="flex h-full items-center gap-2 px-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Logo url="/home" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 rounded-md ml-1"
            >
              <RiArrowLeftSLine className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="gap-1.5 overflow-x-hidden px-1 py-3"> {/* Reduced px-2 to px-1 for compactness */}
        <NavMenu
          items={navItems.map((item) => ({
            ...item,
            isActive: pathname === item.url || pathname.startsWith(`${item.url}/`),
          }))}
        />

        <div className="mt-6">
          <NavNotes />
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-2">
        <NavUser
          isLoading={isPending}
          user={{
            name: user?.name ?? "Guest",
            email: user?.email ?? "",
            image: user?.image ?? undefined,
          }}
          isSigningOut={isSigningOut}
          onSignOut={handleLogout}
        />
      </SidebarFooter>
    </Sidebar>
  );
}