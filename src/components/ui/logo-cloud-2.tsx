import type { ComponentProps } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn("relative grid grid-cols-2 border-x border-border md:grid-cols-4", className)}
      {...props}
    >
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-border" />

      <LogoCard
        className="relative border-r border-b border-border bg-secondary dark:bg-secondary/30"
        logo={{ src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg", alt: "NVIDIA" }}
      >
        <PlusIcon className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6" strokeWidth={1} />
      </LogoCard>
      <LogoCard
        className="border-b border-border md:border-r"
        logo={{ src: "/images/clients/supabase.svg", alt: "Supabase" }}
      />
      <LogoCard
        className="relative border-r border-b border-border bg-secondary dark:bg-secondary/30 md:bg-secondary md:dark:bg-secondary/30"
        logo={{ src: "/images/clients/github.svg", alt: "GitHub" }}
      >
        <PlusIcon className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6" strokeWidth={1} />
        <PlusIcon className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 md:block" strokeWidth={1} />
      </LogoCard>
      <LogoCard
        className="relative border-b border-border bg-secondary dark:bg-secondary/30 md:bg-background md:dark:bg-background"
        logo={{ src: "/images/clients/openai.svg", alt: "OpenAI" }}
      />
      <LogoCard
        className="relative border-r border-b border-border bg-secondary dark:bg-secondary/30 md:border-b-0 md:bg-background md:dark:bg-background"
        logo={{ src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg", alt: "Turso" }}
      >
        <PlusIcon className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 md:hidden" strokeWidth={1} />
      </LogoCard>
      <LogoCard
        className="border-b border-border bg-background md:border-r md:border-b-0 md:bg-secondary md:dark:bg-secondary/30"
        logo={{ src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg", alt: "Clerk" }}
      />
      <LogoCard
        className="border-r border-border"
        logo={{ src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg", alt: "Claude AI" }}
      />
      <LogoCard
        className="bg-secondary dark:bg-secondary/30"
        logo={{ src: "/images/clients/vercel.svg", alt: "Vercel" }}
      />

      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-border" />
    </div>
  );
}

type LogoCardProps = ComponentProps<"div"> & { logo: Logo };

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn("flex items-center justify-center bg-background px-4 py-8 md:p-8", className)}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 max-w-[90%] select-none object-contain md:h-5 dark:brightness-0 dark:invert"
        src={logo.src}
        loading="lazy"
        decoding="async"
      />
      {children}
    </div>
  );
}
