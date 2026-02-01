import { Card } from "@/core/ui/card";
import { Button } from "@/core/ui/button";
import type { Property } from "../../types/property.types";
import { TRANSACTION_TYPES } from "../../types/property.types";
import DetailItem from "./DetailItem";

interface IPropertiesDetailsView {
  property: Property;
}

const PropertiesDetailsView = ({ property }: IPropertiesDetailsView) => {
  const isRent = property.transaction_type === TRANSACTION_TYPES.RENT;
  const displayPrice = isRent ? property.rent_price_monthly : property.price;

  return (
    <div className="container max-w-4/5 m-auto p-4">
      <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-6 italic">
        {property.city} ({property.postal_code}) - {property.neighborhood}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-none shadow-sm">
            <div className="h-96 bg-gray-200 flex items-center justify-center rounded-xl">
              <span className="text-gray-400">Images à venir</span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {property.description || "Pas de description disponible"}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <DetailItem
                label="Surface"
                value={`${property.surface_area} m²`}
              />
              <DetailItem label="Pièces" value={property.rooms} />
              <DetailItem label="Chambres" value={property.bedrooms} />
              <DetailItem label="Type" value={property.property_type} />

              {isRent && (
                <DetailItem
                  label="Ameublement"
                  value={property.is_furnished ? "Meublé" : "Non meublé"}
                />
              )}

              {property.available_from && (
                <DetailItem
                  label="Disponibilité"
                  value={new Date(property.available_from).toLocaleDateString()}
                />
              )}

              {property.energy_rating && (
                <DetailItem
                  label="DPE"
                  value={property.energy_rating}
                  highlight
                />
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 sticky top-4 shadow-lg border-t-4 border-t-blue-600">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {displayPrice?.toLocaleString()} €
              {isRent && (
                <span className="text-sm text-gray-500 ml-1">/ mois</span>
              )}
            </div>

            {!isRent && property.price_per_sqm && (
              <div className="text-gray-500 mb-6 text-sm">
                {property.price_per_sqm.toLocaleString()} €/m²
              </div>
            )}

            {isRent && property.deposit && (
              <div className="text-sm text-gray-500 mb-6">
                Dépôt de garantie : {property.deposit.toLocaleString()} €
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button className="w-full h-12 text-lg">Contacter l'agent</Button>
              <Button variant="outline" className="w-full">
                Ajouter aux favoris
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

PropertiesDetailsView.displayName = "PropertiesDetailsView";
export default PropertiesDetailsView;
