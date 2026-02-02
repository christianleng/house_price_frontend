import { memo, useState } from "react";
import { Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import EnergyPerformanceIcon from "../energy-performance/EnergyPerformanceIcon";
import type { EnergyRating } from "../../types/property.types";

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
      <figure className="relative h-48 bg-gray-200 rounded-xl overflow-hidden group">
        {showPlaceholder ? (
          <div
            className="flex h-full flex-col items-center justify-center gap-2 text-gray-400"
            role="img"
            aria-label={`Image non disponible pour : ${title}`}
          >
            <HugeiconsIcon
              icon={Camera01Icon}
              className="h-12 w-12"
              aria-hidden="true"
            />
            <span className="text-sm">Pas d'image</span>
          </div>
        ) : (
          <>
            {!imageLoaded && (
              <div
                className="absolute inset-0 animate-pulse bg-gray-300"
                aria-hidden="true"
              />
            )}
            <img
              src={thumbnail_url}
              alt={title}
              decoding={isPriority ? "sync" : "async"}
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
        <figcaption>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <EnergyPerformanceIcon value={energy_rating} />
          </div>

          {photos_count !== undefined && photos_count > 0 && (
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-semibold text-white">
              <HugeiconsIcon icon={Camera01Icon} className="h-3 w-3" />
              {photos_count}
            </div>
          )}
        </figcaption>
      </figure>
    );
  },
);

PropertyCardMedia.displayName = "PropertyCardMedia";
export { PropertyCardMedia };
