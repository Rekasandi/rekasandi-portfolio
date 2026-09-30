import type { ReactNode } from "react";
import { cn, sentenceCaseDisplay } from "@/lib/utils";

export default function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-4 font-mono text-xs tracking-wide text-muted-foreground", className)}>
      {typeof children === "string" ? sentenceCaseDisplay(children) : children}
    </p>
  );
}
