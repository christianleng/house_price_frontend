import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { ErrorDisplay } from "@/shared/components/data-loading/ErrorDisplay";
import { PropertyCard } from "./property-card/PropertyCard";
import { propertyFiltersStore } from "../store/property-filters-store";
import { EmptyProperties } from "./EmptyProperties";
import { Pagination } from "@/shared/components/pagination";

const PropertiesList = observer(() => {
  const { filters, setFilters } = propertyFiltersStore;
  const { data, isError, error, isLoading, refetch, isPlaceholderData } =
    useProperties(filters);

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  if (isError) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }
  const hasNoProperties = !isLoading && data?.items.length === 0;

  return (
    <div className="flex flex-col gap-6 py-8">
      {hasNoProperties ? (
        <EmptyProperties message={`Nous n'avons actuellement aucun bien.`} />
      ) : (
        <>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Propriétés disponibles
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {data?.total || 0} logements trouvés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {data?.items.map((property) => (
              <div key={property.id} className="h-full">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {data && (
            <Pagination
              currentPage={data.page}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
              isLoading={isPlaceholderData}
            />
          )}
        </>
      )}
    </div>
  );
});

PropertiesList.displayName = "PropertiesList";
export default PropertiesList;
