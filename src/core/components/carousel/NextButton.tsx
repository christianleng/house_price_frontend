import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ComponentPropsWithRef } from "react";
import { CarouselNavButton } from "./CarouselNavButton";

type ButtonProps = ComponentPropsWithRef<"button">;

export const NextButton = (props: ButtonProps) => (
  <CarouselNavButton
    aria-label="Next slide"
    icon={ArrowRight01Icon}
    className="embla__button--next"
    {...props}
  />
);
