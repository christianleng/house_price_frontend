import FavoriteButton from "@/features/favorite/components/FavoriteButton";
import { type PropertyPreview } from "../../types/property.types";
import { memo } from "react";

interface PropertyCardPriceProps {
  property: PropertyPreview;
}

const PropertyCardPrice = memo(({ property }: PropertyCardPriceProps) => {
  const isSale = property.transaction_type === "sale";

  const displayPrice = isSale ? property.price : property.rent_price_monthly;

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        <span className="text-lg font-bold text-blue-600 truncate">
          {displayPrice?.toLocaleString()} €
        </span>
        {isSale && property.price_per_sqm && (
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {property.price_per_sqm} €/m²
          </span>
        )}
        {!isSale && <span className="text-xs text-gray-500">/ mois</span>}
      </div>
      <FavoriteButton propertyId={property.id} />
    </div>
  );
});

PropertyCardPrice.displayName = "PropertyCardPrice";
export { PropertyCardPrice };
