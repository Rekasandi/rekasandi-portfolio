import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  alignment?: "left" | "center" | "split";
}

export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  action,
  className = "",
  alignment = "left",
}: SectionHeadingProps) {
  const eyebrowContent = eyebrow || (number ? `[${number}]` : null);

  return (
    <div
      className={cn(
        "max-w-4xl",
        alignment === "center" && "mx-auto text-center",
        alignment === "split" && "border-b border-border pb-8 sm:pb-10",
        className
      )}
    >
      {eyebrowContent && (
        <div className="mb-3 flex items-center gap-2">
          {number && (
            <span className="font-mono text-xs font-semibold uppercase text-foreground">
              [{number}]
            </span>
          )}
          {eyebrow && (
            <span className="mono-eyebrow">
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2 className="heading-l font-semibold tracking-[-0.035em] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
