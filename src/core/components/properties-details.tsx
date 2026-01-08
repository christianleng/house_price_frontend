import type { Property } from "../types/property.types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface IPropertiesDetails {
  property: Property;
}

const PropertiesDetails = ({ property }: IPropertiesDetails) => {
  return (
    <div className="container max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-6">
        {property.city} - {property.postal_code} - {property.neighborhood}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Images à venir</span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {property.description || "Pas de description disponible"}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Surface :</span>
                <span className="ml-2 font-semibold">
                  {property.surface_area}m²
                </span>
              </div>
              <div>
                <span className="text-gray-600">Pièces :</span>
                <span className="ml-2 font-semibold">{property.rooms}</span>
              </div>
              <div>
                <span className="text-gray-600">Chambres :</span>
                <span className="ml-2 font-semibold">{property.bedrooms}</span>
              </div>
              <div>
                <span className="text-gray-600">Type :</span>
                <span className="ml-2 font-semibold">
                  {property.property_type}
                </span>
              </div>
              {property.energy_rating && (
                <div>
                  <span className="text-gray-600">DPE :</span>
                  <span className="ml-2 font-semibold">
                    {property.energy_rating}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 sticky top-4">
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {property.price.toLocaleString()} €
            </div>
            <div className="text-gray-600 mb-6">
              {property.price_per_sqm.toLocaleString()} €/m²
            </div>
            <Button className="w-full mb-3">Contacter l'agent</Button>
            <Button variant="outline" className="w-full">
              Ajouter aux favoris
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertiesDetails;
