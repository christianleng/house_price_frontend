// FireIcon
import { Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import type { PropertySummary } from "@/core/types";
import EnergyPerformanceIcon from "@/features/properties/components/energy-performance/EnergyPerformanceIcon";

interface Props {
  property: PropertySummary;
}

export const PropertyCardMedia = ({ property }: Props) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const showPlaceholder = !property.thumbnail_url || imageError;

  return (
    <div className="relative h-48 bg-gray-200 rounded-xl overflow-hidden">
      {showPlaceholder ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
          <HugeiconsIcon icon={Camera01Icon} className="h-12 w-12" />
          <span className="text-sm">Pas d'image</span>
        </div>
      ) : (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
          )}

          <img
            src={property.thumbnail_url ?? undefined}
            alt={property.title}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.warn(`Failed to load image for property ${property.id}`);
              setImageError(true);
            }}
          />
        </>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        {/* <div className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-0.5 text-sm font-medium text-white">
          <HugeiconsIcon icon={FireIcon} className="h-4 w-4" />
          Nouveau
        </div> */}

        <EnergyPerformanceIcon value={property.energy_rating} />
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
        <HugeiconsIcon icon={Camera01Icon} className="h-4 w-4" />
        {property.photos_count || 0}
      </div>
    </div>
  );
};
