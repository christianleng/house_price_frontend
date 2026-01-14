import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { propertyFiltersStore } from "@/core/stores";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { PropertiesSkeleton } from "./PropertiesSkeleton";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import { PropertyCard } from "./property-card/PropertiesCard";

const PropertiesList = observer(() => {
  const { filters } = propertyFiltersStore;
  const { data, isLoading, error, refetch } = useProperties(filters);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Propriétés disponibles</h1>

      <div className="mb-6 text-gray-600">
        {data?.total} biens trouvés - Page {data?.page} sur {data?.total_pages}
      </div>

      <SmartLoader
        isLoading={isLoading}
        error={error}
        data={data?.items}
        skeleton={<PropertiesSkeleton />}
        emptyState={
          <p className="text-center py-10">
            Aucune propriété à vendre pour le moment.
          </p>
        }
        errorFallback={(err, retry) => (
          <ErrorDisplay error={err} onRetry={retry} />
        )}
        retryFn={refetch}
      >
        {(items) => items.map((items) => <PropertyCard property={items} />)}
      </SmartLoader>
    </div>
  );
});

export default PropertiesList;
