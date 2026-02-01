import { observer } from "mobx-react-lite";
import { useCitiesProperties } from "@/features/properties/api/properties.queries";
import { FEATURED_CITIES } from "@/core/config/cities.config";
import { CityPropertySection } from "./property-card/CityPropertySection";
import type { TransactionType } from "../types/property.types";
import { EmptyProperties } from "./EmptyProperties";

interface IPropertyCarouselSectionCityProps {
  transactionType?: TransactionType;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 10;

const PropertyCarouselSectionCity = observer(
  ({
    transactionType = "sale",
    pageSize = DEFAULT_PAGE_SIZE,
  }: IPropertyCarouselSectionCityProps) => {
    const { data } = useCitiesProperties(
      FEATURED_CITIES as unknown as string[],
      transactionType,
      pageSize,
    );

    const hasNoProperties = Object.values(data.data).every(
      (cityCollection) => cityCollection.properties.length === 0,
    );

    return (
      <div className="flex flex-col gap-10">
        {hasNoProperties ? (
          <EmptyProperties
            message={`Nous n'avons actuellement aucun bien disponible dans les villes sélectionnées en ${
              transactionType === "sale" ? "vente" : "location"
            }.`}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  },
);

PropertyCarouselSectionCity.displayName = "PropertyCarouselSectionCity";
export default PropertyCarouselSectionCity;
