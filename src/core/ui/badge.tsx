import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-full text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        pill: "rounded-full border border-gray-200 bg-white text-gray-700 font-medium hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 hover:-translate-y-[1px] shadow-sm",
        pillActive:
          "rounded-full border border-brand-600 bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-brand hover:shadow-lg hover:-translate-y-[1px]",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm gap-2 [&>svg]:size-4",
        sm: "h-5 px-2.5 text-xs gap-1 [&>svg]:size-3",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  size,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size, className })),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge };
