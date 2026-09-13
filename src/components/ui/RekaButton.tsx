"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/motion/MagneticButton";
import { useCursor } from "@/components/motion/CustomCursor";

interface RekaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  magnetic?: boolean;
  arrow?: "diagonal" | "right" | "none";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function RekaButton({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  magnetic = false,
  arrow = "none",
  icon,
  className = "",
  children,
  ...props
}: RekaButtonProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-mono tracking-wider",
    md: "px-6 py-3 text-sm font-medium tracking-wide",
    lg: "px-8 py-4 text-base font-medium tracking-tight",
  }[size];

  const variantClasses = {
    primary:
      "bg-[#0a0a0a] text-white hover:bg-[#222220] active:scale-[0.98] transition-all duration-300 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
    secondary:
      "bg-white text-[#0a0a0a] border border-[#e2e0d8] hover:border-[#0a0a0a] hover:bg-[#f0efe9] active:scale-[0.98] transition-all duration-300 font-medium",
    outline:
      "bg-transparent text-[#0a0a0a] border border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 font-medium",
    ghost:
      "bg-transparent text-[#55544e] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/[0.05] transition-all duration-200",
    link:
      "bg-transparent text-[#0a0a0a] hover:text-[#55544e] p-0 font-medium transition-colors duration-200 inline-flex items-center gap-1.5",
  }[variant];

  const content = (
    <span className="flex items-center gap-2 group">
      <span>{children}</span>
      {icon && <span>{icon}</span>}
      {arrow === "diagonal" && (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      {arrow === "right" && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </span>
  );

  const buttonElement = href ? (
    isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setCursorVariant("pointer")}
        onMouseLeave={resetCursor}
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] cursor-pointer text-center",
          variant !== "link" && sizeClasses,
          variantClasses,
          className
        )}
      >
        {content}
      </a>
    ) : (
      <Link
        href={href}
        onMouseEnter={() => setCursorVariant("pointer")}
        onMouseLeave={resetCursor}
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] cursor-pointer text-center",
          variant !== "link" && sizeClasses,
          variantClasses,
          className
        )}
      >
        {content}
      </Link>
    )
  ) : (
    <button
      onMouseEnter={() => setCursorVariant("pointer")}
      onMouseLeave={resetCursor}
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] cursor-pointer text-center",
        variant !== "link" && sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {content}
    </button>
  );

  if (magnetic) {
    return <MagneticButton>{buttonElement}</MagneticButton>;
  }

  return buttonElement;
}
