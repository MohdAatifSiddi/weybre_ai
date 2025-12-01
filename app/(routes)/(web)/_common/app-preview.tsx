"use client"

import { useTheme } from "next-themes";
import React from "react";
import Image from "next/image";

const AppPreview = ({ priority = true }: { priority?: boolean }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const imageSrc = isDark ? "/images/weybre_app-dark.png" : "/images/weybre_app-light.png";
  const altText = `Legal AI app dashboard in ${isDark ? "dark" : "light"} mode, showing research and drafting tools.`;

  return (
    <section className="-mt-10 animate-fade-in">
      <figure className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-white dark:bg-background shadow-md">
        <div className="relative w-full h-[600px] sm:h-[800px] md:h-[1000px]"> {/* Adjustable height for responsiveness */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-contain object-center rounded-[var(--radius)] border border-transparent shadow-xl shadow-black/10 ring-1 ring-black/10"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            placeholder="blur" // Requires blurDataURL in next.config.js or per-image
            // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." // Add base64 for LQIP if needed
            onError={(e) => {
              // Fallback to placeholder text
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add("flex", "items-center", "justify-center", "bg-gray-100", "dark:bg-gray-800");
                parent.innerHTML = '<span class="text-gray-500 dark:text-gray-400">App Preview Loading...</span>';
              }
            }}
          />
          {/* Skeleton fallback */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 hidden" id="skeleton" />
        </div>
        <figcaption className="sr-only">App interface preview</figcaption>
      </figure>
    </section>
  );
};

export default AppPreview;