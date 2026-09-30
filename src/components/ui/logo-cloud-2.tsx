import type { ComponentProps } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoCloudItem = {
  name: string;
  src: string;
  invertInDark?: boolean;
};

type LogoCloudProps = ComponentProps<"div"> & {
  logos: LogoCloudItem[];
};

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-t border-border md:grid-cols-4",
        className,
      )}
      {...props}
    >
      {logos.map((logo, index) => (
        <LogoCard key={`${logo.name}-${logo.src}`} logo={logo} index={index} />
      ))}
      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-border" />
    </div>
  );
}

function LogoCard({
  logo,
  index,
}: {
  logo: LogoCloudItem;
  index: number;
}) {
  return (
    <div
      className={cn(
        "flex min-h-20 items-center justify-center border-b border-r border-border px-4 py-8 md:min-h-24 md:p-8",
        "[&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0",
        index % 2 === 0 ? "bg-secondary dark:bg-secondary/30" : "bg-background",
      )}
    >
      <Image
        alt={logo.name}
        className={cn(
          "pointer-events-none h-4 max-w-[90%] select-none object-contain md:h-5",
          logo.invertInDark && "dark:brightness-0 dark:invert",
        )}
        src={logo.src}
        width={180}
        height={32}
        sizes="180px"
        unoptimized
        loading="lazy"
      />
    </div>
  );
}
