import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}
