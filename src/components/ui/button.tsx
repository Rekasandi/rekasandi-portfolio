import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[6px] text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[0.5px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-whisper border border-transparent",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted hover:text-foreground shadow-whisper",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",
        ghost:
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-whisper",
        link:
          "text-foreground underline-offset-4 hover:underline hover:text-primary",
        pill:
          "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-whisper border border-transparent",
      },
      size: {
        default: "h-9 px-4 gap-2 text-sm",
        sm: "h-8 px-3 gap-1.5 text-xs rounded-[6px]",
        lg: "h-11 px-6 gap-2 text-sm rounded-[6px]",
        pill: "h-11 px-6 gap-2 text-sm rounded-full",
        icon: "size-9 rounded-[6px]",
        "icon-sm": "size-8 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
