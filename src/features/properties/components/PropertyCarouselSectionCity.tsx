import { observer } from "mobx-react-lite";
import { useCitiesProperties } from "@/features/properties/api/properties.queries";
import { ErrorDisplay } from "@/shared/components/data-loading/ErrorDisplay";
import { FEATURED_CITIES } from "@/core/config/cities.config";
import { CityPropertySection } from "./property-card/CityPropertySection";
import type { TransactionType } from "@/core/types";

interface PropertyCarouselSectionCityProps {
  transactionType?: TransactionType;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 10;

const PropertyCarouselSectionCity = observer(
  ({
    transactionType = "sale",
    pageSize = DEFAULT_PAGE_SIZE,
  }: PropertyCarouselSectionCityProps) => {
    const { data, isError, error, refetch } = useCitiesProperties(
      FEATURED_CITIES as unknown as string[],
      transactionType,
      pageSize,
    );

    if (isError) {
      return (
        <div className="flex flex-col gap-4">
          <ErrorDisplay error={error} onRetry={refetch} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-10">
        {FEATURED_CITIES.slice(0, 3).map((city) => {
          const cityData = data?.data[city];
          if (!cityData || cityData.properties.length === 0) return null;

          return (
            <CityPropertySection
              key={`city-${city}`}
              city={city}
              transactionType={transactionType}
              properties={cityData.properties}
              totalCount={cityData.total}
            />
          );
        })}
      </div>
    );
  },
);

PropertyCarouselSectionCity.displayName = "PropertyCarouselSectionCity";
export default PropertyCarouselSectionCity;
