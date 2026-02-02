import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ComponentPropsWithRef } from "react";
import { CarouselNavButton } from "./CarouselNavButton";

type ButtonProps = ComponentPropsWithRef<"button">;

export const NextButton = (props: ButtonProps) => (
  <CarouselNavButton
    aria-label="Afficher le bien suivant"
    icon={ArrowRight01Icon}
    className="embla__button--next"
    {...props}
  />
);
