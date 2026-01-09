import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentPropsWithRef } from "react";
import clsx from "clsx";

interface CarouselNavButtonProps extends ComponentPropsWithRef<"button"> {
  icon: IconSvgElement;
}

export const CarouselNavButton = ({
  icon,
  className,
  ...props
}: CarouselNavButtonProps) => {
  return (
    <button
      type="button"
      className={clsx("embla__button", className)}
      {...props}
    >
      <HugeiconsIcon icon={icon} className="h-5 w-5" />
    </button>
  );
};
