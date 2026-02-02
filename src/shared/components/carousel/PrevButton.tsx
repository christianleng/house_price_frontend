import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import type { ComponentPropsWithRef } from "react";
import { CarouselNavButton } from "./CarouselNavButton";

type ButtonProps = ComponentPropsWithRef<"button">;

export const PrevButton = (props: ButtonProps) => (
  <CarouselNavButton
    aria-label="Afficher le bien précédent"
    icon={ArrowLeft01Icon}
    className="embla__button--prev"
    {...props}
  />
);
