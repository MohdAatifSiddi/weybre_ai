// components/ui/sidebar-menu-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SidebarMenuSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-9 w-full rounded-md", className)} />;
}