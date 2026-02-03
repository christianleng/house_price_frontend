import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { PropertyCard } from "@/features/properties/components/property-card/PropertyCard";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton } from "@/shared/components/carousel/PrevButton";
import { NextButton } from "@/shared/components/carousel/NextButton";
import { usePrevNextButtons } from "@/shared/components/carousel/useCarouselNavigation";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useId } from "react";
import type {
  PropertyPreview,
  TransactionType,
} from "../../types/property.types";

interface ICityPropertySectionProps {
  city: string;
  transactionType: TransactionType;
  properties: PropertyPreview[];
  totalCount: number;
  carouselOptions?: EmblaOptionsType;
}

const DEFAULT_CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: false,
  duration: 25,
  align: "start",
};

const CityPropertySection = observer(
  ({
    city,
    transactionType,
    properties,
    totalCount,
    carouselOptions = DEFAULT_CAROUSEL_OPTIONS,
  }: ICityPropertySectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
    const nav = usePrevNextButtons(emblaApi);

    const uniqueId = useId();
    const sectionTitleId = `title-${uniqueId}`;
    const carouselId = `carousel-${uniqueId}`;

    const title =
      transactionType === "sale"
        ? `Dernières propriétés à vendre · ${city}`
        : `Dernières propriétés en location · ${city}`;

    const redirectUrl = `/properties?transaction_type=${transactionType}&city=${encodeURIComponent(city)}`;

    if (properties.length === 0) return null;

    return (
      <section className="flex flex-col gap-4" aria-labelledby={sectionTitleId}>
        <div className="flex justify-between items-center">
          <Link
            id={sectionTitleId}
            className="flex items-center gap-2 font-bold hover:underline group w-fit"
            to={redirectUrl}
            aria-label={`${title}. Voir les ${totalCount} biens disponibles.`}
          >
            <h2 className="text-lg font-bold">{title}</h2>
            <span
              className="text-sm font-normal text-gray-500"
              aria-hidden="true"
            >
              ({totalCount})
            </span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>

          <div
            className="flex gap-2"
            role="group"
            aria-label="Navigation du carrousel"
          >
            <PrevButton
              onClick={nav.onPrevButtonClick}
              disabled={nav.prevBtnDisabled}
              aria-controls={carouselId}
            />
            <NextButton
              onClick={nav.onNextButtonClick}
              disabled={nav.nextBtnDisabled}
              aria-controls={carouselId}
            />
          </div>
        </div>

        <div className="embla" role="region" aria-roledescription="carrousel">
          <div
            className="embla__viewport"
            ref={emblaRef}
            id={carouselId}
            aria-live="polite"
          >
            <div className="embla__container">
              {properties.map((property, index) => {
                return (
                  <div
                    key={property.id}
                    className="embla__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} sur ${properties.length}`}
                  >
                    <PropertyCard property={property} isPriority={index < 2} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

CityPropertySection.displayName = "CityPropertySection";
export { CityPropertySection };
