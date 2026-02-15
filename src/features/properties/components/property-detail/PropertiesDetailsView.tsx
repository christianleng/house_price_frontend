import { Card } from "@/core/ui/card";
import { Button } from "@/core/ui/button";
import type { Property } from "../../types/property.types";
import { TRANSACTION_TYPES } from "../../types/property.types";
import DetailItem from "./DetailItem";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ParkingAreaCircleIcon,
  BedIcon,
  DoorIcon,
  Home01Icon,
  Calendar03Icon,
  EnergyIcon,
  LicenseIcon,
} from "@hugeicons/core-free-icons";
import { EnergyPerformanceIcon } from "../energy-performance/EnergyPerformanceIcon";

interface IPropertiesDetailsView {
  property: Property;
}

const PropertiesDetailsView = ({ property }: IPropertiesDetailsView) => {
  const isRent = property.transaction_type === TRANSACTION_TYPES.RENT;
  const displayPrice = isRent ? property.rent_price_monthly : property.price;

  const mainImage = property.photos?.[0]?.url || property.thumbnail_url;

  return (
    <div className="container max-w-6xl m-auto p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          {property.title}
        </h1>
        <p className="text-gray-500 text-lg">
          {property.city} ({property.postal_code}) — {property.neighborhood}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden border-none shadow-md rounded-2xl bg-gray-100">
            <div className="relative h-112.5 w-full">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <HugeiconsIcon
                    icon={Home01Icon}
                    className="text-gray-300 w-16 h-16"
                  />
                  <span className="text-gray-400 font-medium">
                    Images à venir
                  </span>
                </div>
              )}

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider">
                  {property.property_type}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-8 rounded-2xl shadow-sm border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Description
            </h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed text-lg">
              {property.description || "Pas de description disponible"}
            </p>
          </Card>

          <Card className="p-8 rounded-2xl shadow-sm border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Caractéristiques
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              <DetailItem
                icon={<HugeiconsIcon icon={ParkingAreaCircleIcon} size={24} />}
                label="Surface"
                value={`${property.surface_area} m²`}
              />
              <DetailItem
                icon={<HugeiconsIcon icon={DoorIcon} size={24} />}
                label="Pièces"
                value={property.rooms}
              />
              <DetailItem
                icon={<HugeiconsIcon icon={BedIcon} size={24} />}
                label="Chambres"
                value={property.bedrooms}
              />
              <DetailItem
                icon={<HugeiconsIcon icon={LicenseIcon} size={24} />}
                label="Type"
                value={
                  property.property_type.charAt(0).toUpperCase() +
                  property.property_type.slice(1)
                }
              />

              {property.available_from && (
                <DetailItem
                  icon={<HugeiconsIcon icon={Calendar03Icon} size={24} />}
                  label="Disponibilité"
                  value={new Date(property.available_from).toLocaleDateString()}
                />
              )}

              {property.energy_rating && (
                <DetailItem
                  icon={<HugeiconsIcon icon={EnergyIcon} size={24} />}
                  label="DPE"
                  value={
                    <EnergyPerformanceIcon value={property.energy_rating} />
                  }
                  highlight
                />
              )}
            </div>
          </Card>
        </div>

        <div className="relative">
          <Card className="p-8 sticky top-8 shadow-xl border-none rounded-3xl bg-white">
            <div className="mb-6">
              <div className="text-4xl font-black text-blue-600 mb-1">
                {displayPrice?.toLocaleString()} €
                {isRent && (
                  <span className="text-lg text-gray-400 font-normal">
                    /mois
                  </span>
                )}
              </div>

              {!isRent && property.price_per_sqm && (
                <div className="text-gray-400 font-medium italic">
                  {property.price_per_sqm.toLocaleString()} € / m²
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Button className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md">
                Contacter l'agent
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 font-semibold"
              >
                Ajouter aux favoris
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold">
                Réf: {property.reference}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

PropertiesDetailsView.displayName = "PropertiesDetailsView";
export default PropertiesDetailsView;
