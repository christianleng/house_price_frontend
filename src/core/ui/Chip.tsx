import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 transition-all duration-200 ease-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        outline:
          "bg-white border border-gray-200 text-gray-700 font-medium hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 hover:-translate-y-[1px] shadow-sm",
        active:
          "bg-gradient-to-br from-brand-600 to-brand-500 border border-brand-600 text-white shadow-brand hover:shadow-lg hover:-translate-y-[1px]",
        dashed:
          "bg-white border border-dashed border-gray-300 text-gray-500 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50",
        ghost:
          "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      },
      size: {
        xs: "h-6 px-2 text-[11px] gap-1 rounded-md [&>svg]:size-3",
        sm: "h-7 px-3 text-xs gap-1.5 rounded-md [&>svg]:size-3.5",
        md: "h-9 px-4 py-2 text-sm gap-2 rounded-md [&>svg]:size-4",
        lg: "h-10 px-5 py-2.5 text-base gap-2.5 rounded-md [&>svg]:size-5",
        default: "h-9 px-4 py-2 text-sm gap-2 rounded-md [&>svg]:size-4",
        icon: "h-9 w-9 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  },
);

function Chip({
  className,
  variant = "outline",
  size,
  render,
  ...props
}: useRender.ComponentProps<"button"> & VariantProps<typeof chipVariants>) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(chipVariants({ variant, size, className })),
      },
      props,
    ),
    render,
    state: {
      slot: "chip",
      variant,
    },
  });
}

export { Chip };
