"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { RemixiconComponentType } from "@remixicon/react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavMenuItem = {
  title: string;
  url: string;
  icon: RemixiconComponentType;
  isActive?: boolean; // optional override
};

type Props = {
  items: NavMenuItem[];
};

const NavMenu = ({ items }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.isActive ?? (pathname === item.url || pathname.startsWith(`${item.url}/`));

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "relative h-9 w-full justify-start gap-3 rounded-lg px-3 text-sm font-medium transition-all",
                "text-muted-foreground hover:text-foreground",
                "data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
                "hover:bg-accent/50",
                // Subtle gradient on hover (optional Palantir touch)
                "hover:bg-gradient-to-r hover:from-accent/5 hover:to-accent/10"
              )}
              onClick={() => router.push(item.url)}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  )}
                />
                <span>{item.title}</span>

                {/* Palantir-style active indicator (thin left bar) */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default NavMenu;