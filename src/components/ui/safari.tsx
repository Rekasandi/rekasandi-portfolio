"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SafariMode = "default" | "simple";

export interface SafariProps extends HTMLAttributes<HTMLDivElement> {
  url?: string;
  imageSrc?: string;
  videoSrc?: string;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  mode?: SafariMode;
}

export function Safari({
  imageSrc,
  videoSrc,
  url = "rekasandi.com",
  children,
  width,
  height,
  mode = "default",
  className,
  style,
  ...props
}: SafariProps) {
  const frameStyle = {
    aspectRatio: `${width || 1203} / ${height || 753}`,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  return (
    <div
      aria-label="Safari browser window"
      className={cn(
        "relative isolate w-full overflow-hidden rounded-xl border border-border bg-white shadow-2xl dark:bg-[#19191d]",
        className,
      )}
      role="group"
      style={frameStyle}
      {...props}
    >
      <div className="relative z-10 flex h-[7%] min-h-9 max-h-[52px] items-center border-b border-black/10 bg-[#f5f5f7] px-4 dark:border-white/10 dark:bg-[#29292d]">
        <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
          <span className={cn("size-3 rounded-full", mode === "simple" ? "bg-[#d5d5d7] dark:bg-[#55555a]" : "bg-[#ff5f56]")} />
          <span className={cn("size-3 rounded-full", mode === "simple" ? "bg-[#d5d5d7] dark:bg-[#55555a]" : "bg-[#ffbd2e]")} />
          <span className={cn("size-3 rounded-full", mode === "simple" ? "bg-[#d5d5d7] dark:bg-[#55555a]" : "bg-[#27c93f]")} />
        </div>
        <div className="absolute left-1/2 flex h-[58%] w-[min(56%,42rem)] -translate-x-1/2 items-center justify-center truncate rounded-md bg-black/[0.06] px-4 text-xs text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
          {url}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[7%] overflow-hidden bg-neutral-950">
        {children ? (
          <div className="relative size-full overflow-hidden">{children}</div>
        ) : videoSrc ? (
          <video autoPlay className="size-full object-cover" loop muted playsInline src={videoSrc} />
        ) : imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt="" className="size-full object-cover" />
        ) : null}
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-muted/50 p-4">
      <Safari className="w-[95vw] max-w-[1203px]" url="shadcn.io" imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=1000&fit=crop" />
    </div>
  );
}

export default Safari;
