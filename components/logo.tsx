import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url?: string;
}

const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ url = "/", className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={url}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {/* Icon Container: Fixed size */}
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Weybre AI"
            className="size-5" // Adjust icon size inside the box
          />
        </div>

        {/* Text Container: 
            The class 'group-data-[collapsible=icon]:hidden' 
            tells this div to hide when the parent Sidebar is collapsed.
        */}
        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold">Weybre AI</span>
        </div>
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;