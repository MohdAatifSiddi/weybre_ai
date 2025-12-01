"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiLogoutBoxLine, RiLoader4Line } from "@remixicon/react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isLoading: boolean;
  isSigningOut: boolean;
  user: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut: () => void;
};

const NavUser = ({ user, isLoading, isSigningOut, onSignOut }: Props) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "h-auto w-full justify-start gap-3 rounded-md px-2 py-2.5 transition-all",
                "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                "hover:bg-accent/70 hover:text-accent-foreground",
                isLoading && "opacity-70"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
                  <div className="grid flex-1 text-left text-sm">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="mt-1 h-3 w-32 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-md border border-border">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="rounded-md text-xs font-medium bg-accent text-accent-foreground">
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? "top" : "right"}
            align="start"
            sideOffset={8}
            onCloseAutoFocus={(e) => isSigningOut && e.preventDefault()}
          >
            <DropdownMenuLabel className="px-2 py-1.5">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8 rounded-md border">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="rounded-md text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-sm">
                  <span className="font-medium truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={onSignOut}
              disabled={isSigningOut}
              className="gap-2.5 cursor-pointer"
            >
              <RiLogoutBoxLine className="size-4" />
              <span>Log out</span>
              {isSigningOut && (
                <RiLoader4Line className="ml-auto size-4 animate-spin" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;