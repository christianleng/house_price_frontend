import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { PropertiesSkeleton } from "@/features/properties/components/PropertiesSkeleton";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import { Link } from "react-router-dom";
import { PropertyCard } from "@/features/properties/components/property-card/PropertiesCard";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton } from "@/core/components/carousel/PrevButton";
import { NextButton } from "@/core/components/carousel/NextButton";
import { usePrevNextButtons } from "@/core/components/carousel/useCarouselNavigation";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { PropertyFilters } from "@/core/types";

interface PropertyCarouselSectionProps {
  title: string;
  transactionType: "sale" | "rent";
  carouselOptions?: EmblaOptionsType;
}

const DEFAULT_CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: false,
  duration: 25,
};

export const PropertyCarouselSection = observer(
  ({
    title,
    transactionType,
    carouselOptions = DEFAULT_CAROUSEL_OPTIONS,
  }: PropertyCarouselSectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
    const nav = usePrevNextButtons(emblaApi);

    const filters: PropertyFilters = {
      transaction_type: transactionType,
      page: 1,
      page_size: 10,
      sort_by: "created_at",
      sort_order: "desc",
    };

    const { data, isLoading, error, refetch } = useProperties(filters);

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

        <SmartLoader
          isLoading={isLoading}
          error={error}
          data={data?.items}
          skeleton={<PropertiesSkeleton count={filters.page_size} />}
          emptyState={
            <p className="text-center py-10">
              Aucune propriété{" "}
              {transactionType === "sale" ? "à vendre" : "à louer"} pour le
              moment.
            </p>
          }
          errorFallback={(err, retry) => (
            <ErrorDisplay error={err} onRetry={retry} />
          )}
          retryFn={refetch}
        >
          {(items) => (
            <section className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {items.map((item) => (
                    <div key={item.id} className="embla__slide">
                      <PropertyCard property={item} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </SmartLoader>
      </div>
    );
  }
);
