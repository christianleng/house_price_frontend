import type { PropertySummary } from "@/core/types";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const PropertyCardPrice = ({
  property,
}: {
  property: PropertySummary;
}) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        <span className="text-lg font-bold text-blue-600 truncate">
          {property.price?.toLocaleString()} €
        </span>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {property.price_per_sqm}/m²
        </span>
      </div>

      <button
        aria-label="Ajouter aux favoris"
        className="shrink-0 hover:scale-110 transition-transform"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <HugeiconsIcon icon={FavouriteIcon} className="w-5 h-5" />
      </button>
    </div>
  );
};
