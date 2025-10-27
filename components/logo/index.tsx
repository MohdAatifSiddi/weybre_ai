import Link from "next/link";
import Image from "next/image";
import React from "react";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;

  return (
    <Link href={url} className="w-fit flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-primary text-primary-foreground">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
      </div>
      <div className="flex-1 text-left text-base leading-tight">
        <span className="font-medium">Weybre AI</span>
      </div>
    </Link>
  );
};

export default Logo;
