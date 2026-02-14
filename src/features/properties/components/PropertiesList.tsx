import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { PropertyCard } from "./property-card/PropertyCard";
import { propertyFiltersStore } from "../store/property-filters-store";
import { EmptyProperties } from "./EmptyProperties";
import { Pagination } from "@/shared/components/pagination";
import { usePriorityCount } from "@/shared/hooks/usePriorityCount";

const PropertiesList = observer(() => {
  const { filters, setPage } = propertyFiltersStore;

  const { data } = useProperties(filters);
  const priorityLimit = usePriorityCount();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col gap-6 py-8">
      {data.items.length === 0 ? (
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
            {data?.items.map((property, index) => (
              <div key={property.id} className="h-full">
                <PropertyCard
                  property={property}
                  isPriority={index < priorityLimit}
                />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={data.page}
            totalPages={data.total_pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
});

PropertiesList.displayName = "PropertiesList";
export default PropertiesList;
