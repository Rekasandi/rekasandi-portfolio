"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

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
  arrow = "none",
  icon,
  className,
  children,
  ...props
}: RekaButtonProps) {
  const buttonVariant = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
    link: "link",
  } as const;

  const sizeClass = {
    sm: "h-8 px-3.5 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-11 px-6 text-sm",
  }[size];

  const content = (
    <span className="flex items-center gap-2 whitespace-nowrap font-medium">
      <span>{children}</span>
      {icon}
      {arrow === "diagonal" && (
        <ArrowUpRight data-icon="inline-end" className="size-3.5" aria-hidden="true" />
      )}
      {arrow === "right" && (
        <ArrowRight data-icon="inline-end" className="size-3.5" aria-hidden="true" />
      )}
    </span>
  );

  const classes = cn(
    buttonVariants({ variant: buttonVariant[variant] }),
    "rounded-full transition-all duration-200",
    sizeClass,
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <Button
      variant={buttonVariant[variant]}
      className={cn("rounded-full transition-all duration-200", sizeClass, className)}
      {...props}
    >
      {content}
    </Button>
  );
}
