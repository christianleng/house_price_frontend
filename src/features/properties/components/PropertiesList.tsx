import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { ErrorDisplay } from "@/shared/components/data-loading/ErrorDisplay";
import { PropertyCard } from "./property-card/PropertyCard";
import { propertyFiltersStore } from "../store/property-filters-store";

const PropertiesList = observer(() => {
  const { filters } = propertyFiltersStore;
  const { data, isError, error, refetch } = useProperties(filters);

  if (isError) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }

  if (data?.items && data.items.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p className="text-xl font-semibold">Aucun résultat trouvé</p>
        <p>Essayez de modifier vos filtres.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-8">
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
    </div>
  );
});

PropertiesList.displayName = "PropertiesList";
export default PropertiesList;
