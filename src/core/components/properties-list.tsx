import { Link } from "react-router-dom";
import type { PropertySummary } from "../types/property.types";
import { Card } from "../ui/card";

interface IPropertiesList {
  properties: PropertySummary[];
}

const PropertiesList = ({ properties }: IPropertiesList) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link key={property.id} to={`/properties/${property.id}`}>
          <Card className="overflow-hidden cursor-pointer">
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
  );
};

export default PropertiesList;
