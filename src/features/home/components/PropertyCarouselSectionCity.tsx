import { observer } from "mobx-react-lite";
import { useCitiesProperties } from "@/features/properties/api/properties.queries";
import { PropertiesSkeleton } from "@/features/properties/components/PropertiesSkeleton";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import { FEATURED_CITIES } from "@/core/config/cities.config";
import { CityPropertySection } from "./CityPropertySection";
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
    const { data, isLoading, error, refetch } = useCitiesProperties(
      FEATURED_CITIES as unknown as string[],
      transactionType,
      pageSize
    );

    return (
      <div className="flex flex-col gap-10">
        <SmartLoader
          isLoading={isLoading}
          error={error}
          data={data?.data}
          skeleton={<PropertiesSkeleton count={pageSize} />}
          emptyState={
            <p className="text-center py-10">
              Aucune propriété disponible pour le moment.
            </p>
          }
          errorFallback={(err, retry) => (
            <ErrorDisplay error={err} onRetry={retry} />
          )}
          retryFn={refetch}
        >
          {(citiesData) =>
            FEATURED_CITIES.slice(0, 3).map((city) => {
              const cityData = citiesData[city];
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
            })
          }
        </SmartLoader>
      </div>
    );
  }
);

export default PropertyCarouselSectionCity;
