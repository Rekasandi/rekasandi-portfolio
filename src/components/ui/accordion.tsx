import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full flex flex-col items-stretch", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("w-full not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  hideIcon = false,
  ...props
}: AccordionPrimitive.Trigger.Props & { hideIcon?: boolean }) {
  return (
    <AccordionPrimitive.Header className="w-full flex items-stretch">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "w-full group/accordion-trigger relative flex flex-1 items-center justify-between text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        {!hideIcon && (
          <>
            <ChevronDownIcon
              data-slot="accordion-trigger-icon"
              className="pointer-events-none shrink-0 size-4 text-muted-foreground ml-auto group-aria-expanded/accordion-trigger:hidden"
            />
            <ChevronUpIcon
              data-slot="accordion-trigger-icon"
              className="pointer-events-none hidden shrink-0 size-4 text-muted-foreground ml-auto group-aria-expanded/accordion-trigger:inline"
            />
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="w-full overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div className={cn("w-full pt-2 pb-12", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
