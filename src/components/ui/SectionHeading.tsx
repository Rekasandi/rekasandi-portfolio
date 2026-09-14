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
  if (alignment === "split") {
    return (
      <div
        className={cn(
          "flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#e2e0d8]",
          className
        )}
      >
        <div className="max-w-2xl">
          {(number || eyebrow) && (
            <div className="flex items-center gap-3 mb-4">
              {number && (
                <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
                  [{number}]
                </span>
              )}
              {eyebrow && (
                <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
                  {eyebrow}
                </span>
              )}
            </div>
          )}
          <h2 className="heading-l text-[#0a0a0a] font-medium tracking-tight">
            {title}
          </h2>
        </div>

        {(description || action) && (
          <div className="max-w-md flex flex-col items-start lg:items-end gap-4">
            {description && (
              <p className="text-[#55544e] text-base leading-relaxed lg:text-right">
                {description}
              </p>
            )}
            {action && <div>{action}</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", alignment === "center" && "text-center mx-auto", className)}>
      {(number || eyebrow) && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            alignment === "center" && "justify-center"
          )}
        >
          {number && (
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
              [{number}]
            </span>
          )}
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2 className="heading-l text-[#0a0a0a] font-medium tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[#55544e] text-lg leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
