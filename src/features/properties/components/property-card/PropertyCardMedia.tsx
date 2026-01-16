import { memo, useState } from "react";
import { Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import EnergyPerformanceIcon from "../energy-performance/EnergyPerformanceIcon";
import type { EnergyRating } from "@/core/types";

interface Props {
  thumbnail_url: string | null;
  title: string;
  energy_rating: EnergyRating;
  photos_count?: number;
  isPriority?: boolean;
}

const PropertyCardMedia = memo(
  ({
    thumbnail_url,
    title,
    energy_rating,
    photos_count,
    isPriority,
  }: Props) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const showPlaceholder = !thumbnail_url || imageError;

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
              src={thumbnail_url}
              alt={title}
              fetchPriority={isPriority ? "high" : "auto"}
              loading={isPriority ? "eager" : "lazy"}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <EnergyPerformanceIcon value={energy_rating} />
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          <HugeiconsIcon icon={Camera01Icon} className="h-4 w-4" />
          {photos_count || 0}
        </div>
      </div>
    );
  }
);

PropertyCardMedia.displayName = "PropertyCardMedia";
export { PropertyCardMedia };
