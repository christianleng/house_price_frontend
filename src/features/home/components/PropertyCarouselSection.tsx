import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import { Link } from "react-router-dom";
import { PropertyCard } from "@/features/properties/components/property-card/PropertyCard";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton } from "@/core/components/carousel/PrevButton";
import { NextButton } from "@/core/components/carousel/NextButton";
import { usePrevNextButtons } from "@/core/components/carousel/useCarouselNavigation";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { PropertyFilters } from "@/core/types";
import { useCallback, useEffect, useMemo, useState } from "react";

interface PropertyCarouselSectionProps {
  title: string;
  transactionType: "sale" | "rent";
  carouselOptions?: EmblaOptionsType;
}

const DEFAULT_CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: false,
  duration: 25,
};

const PropertyCarouselSection = observer(
  ({
    title,
    transactionType,
    carouselOptions = DEFAULT_CAROUSEL_OPTIONS,
  }: PropertyCarouselSectionProps) => {
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

    const filters = useMemo<PropertyFilters>(
      () => ({
        transaction_type: transactionType,
        page: 1,
        page_size: 10,
        sort_by: "created_at",
        sort_order: "desc",
      }),
      [transactionType],
    );

    const { data, isError, error, refetch } = useProperties(filters);

    if (isError) {
      return (
        <div className="flex flex-col gap-4">
          <ErrorDisplay error={error} onRetry={refetch} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link
            className="flex items-center gap-1 font-bold hover:underline"
            to={`/properties?transaction_type=${transactionType}`}
          >
            <span>{title}</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
          </Link>

          <div className="embla__buttons">
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
              {data?.items.map((property, index) => {
                const isVisible = slidesInView.includes(index);

                return (
                  <div key={property.id} className="embla__slide">
                    {isVisible ? (
                      <PropertyCard property={property} />
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

PropertyCarouselSection.displayName = "PropertyCarouselSection";
export { PropertyCarouselSection };
