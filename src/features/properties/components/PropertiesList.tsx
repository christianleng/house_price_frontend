import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { propertyFiltersStore } from "@/core/stores";

import { Link } from "react-router-dom";
import { Card } from "@/core/ui/card";
import { Button } from "@/core/ui/button";

const PropertiesList = observer(() => {
  const { filters } = propertyFiltersStore;
  const { data, isLoading, isError, error } = useProperties(filters);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Propriétés disponibles</h1>

      <div className="mb-6 text-gray-600">
        {data?.total} biens trouvés - Page {data?.page} sur {data?.total_pages}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.items.map((property) => (
          <Link key={property.id} to={`/properties/${property.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {property.thumbnail_url ? (
                  <img
                    src={property.thumbnail_url}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Pas d'image</span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {property.city} - {property.postal_code}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {property.price?.toLocaleString()} €
                  </span>
                  <span className="text-sm text-gray-500">
                    {property.surface_area}m² • {property.rooms} pièces
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => propertyFiltersStore.prevPage()}
          disabled={!data || data.page <= 1}
          variant="outline"
        >
          Précédent
        </Button>
        <span className="text-sm text-gray-600">
          Page {data?.page} / {data?.total_pages}
        </span>
        <Button
          onClick={() => propertyFiltersStore.nextPage()}
          disabled={!data || data.page >= data.total_pages}
          variant="outline"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
});

export default PropertiesList;
