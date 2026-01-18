import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { PropertyCard } from "@/features/properties/components/property-card/PropertyCard";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton } from "@/core/components/carousel/PrevButton";
import { NextButton } from "@/core/components/carousel/NextButton";
import { usePrevNextButtons } from "@/core/components/carousel/useCarouselNavigation";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { PropertySummary, TransactionType } from "@/core/types";
import { useCallback, useEffect, useState } from "react";

interface CityPropertySectionProps {
  city: string;
  transactionType: TransactionType;
  properties: PropertySummary[];
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
  }: CityPropertySectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
    const nav = usePrevNextButtons(emblaApi);

    const [slidesInView, setSlidesInView] = useState<number[]>([]);

    const updateSlidesInView = useCallback(() => {
      if (!emblaApi) return;

      const inView = emblaApi.slidesInView();
      setSlidesInView((prev) => {
        const allSeen = new Set([...prev, ...inView]);
        return Array.from(allSeen);
      });
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      updateSlidesInView();
      emblaApi.on("slidesInView", updateSlidesInView);
      emblaApi.on("reInit", updateSlidesInView);
    }, [emblaApi, updateSlidesInView]);

    const title =
      transactionType === "sale"
        ? `Dernières propriétés à vendre · ${city}`
        : `Dernières propriétés en location · ${city}`;

    const redirectUrl = `/properties?transaction_type=${transactionType}&city=${encodeURIComponent(city)}`;

    if (properties.length === 0) return null;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link
            className="flex items-center gap-2 font-bold text-lg hover:underline group"
            to={redirectUrl}
          >
            <span>{title}</span>
            <span className="text-sm font-normal text-gray-500">
              ({totalCount})
            </span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <div className="flex gap-2">
            <PrevButton
              onClick={nav.onPrevButtonClick}
              disabled={nav.prevBtnDisabled}
            />
            <NextButton
              onClick={nav.onNextButtonClick}
              disabled={nav.nextBtnDisabled}
            />
          </div>
        </div>

        <section className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {properties.map((property, index) => {
                const isVisible = slidesInView.includes(index);
                return (
                  <div key={property.id} className="embla__slide">
                    {isVisible ? (
                      <PropertyCard
                        property={property}
                        isPriority={index < 2}
                      />
                    ) : (
                      <div className="h-80 w-full bg-gray-50 animate-pulse rounded-xl" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  },
);

CityPropertySection.displayName = "CityPropertySection";
export { CityPropertySection };
