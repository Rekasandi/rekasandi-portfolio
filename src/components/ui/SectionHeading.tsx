import React from "react";
import { cn, sentenceCaseDisplay } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  alignment?: "left" | "center" | "split";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = "",
  alignment = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        alignment === "center" && "mx-auto text-center",
        alignment === "split" && "border-b border-border pb-8 sm:pb-10",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-3">
          <span className="mono-eyebrow">{sentenceCaseDisplay(eyebrow)}</span>
        </div>
      )}
      <h2 className="heading-l font-semibold tracking-[-0.035em] text-foreground">
        {typeof title === "string" ? sentenceCaseDisplay(title) : title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {typeof description === "string"
            ? sentenceCaseDisplay(description)
            : description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
