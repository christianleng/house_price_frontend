import { memo } from "react";
import { Link } from "react-router";
import { PropertyCardMedia } from "./PropertyCardMedia";
import { PropertyCardPrice } from "./PropertyCardPrice";
import { PropertyCardMeta } from "./PropertyCardMeta";
import type { PropertyPreview } from "../../types/property.types";
import { PropertyCardSkeleton } from "../skeletons/PropertyCardSkeleton";
import { useInView } from "@/shared/hooks/useInView";
import { propertiesSyncStore } from "../../store/properties-sync-store";

interface IPropertyCardProps {
  property: PropertyPreview;
  isPriority?: boolean;
}

const PropertyCard = memo(
  ({ property, isPriority = false }: IPropertyCardProps) => {
    const { ref, inView } = useInView({
      threshold: 0.05,
      rootMargin: "10px",
      triggerOnce: true,
    });
    const shouldShowContent = isPriority || inView;

    return (
      <div
        ref={ref}
        onMouseEnter={() =>
          propertiesSyncStore.setHoveredPropertyId(property.id)
        }
        onMouseLeave={() => propertiesSyncStore.setHoveredPropertyId(null)}
      >
        {!shouldShowContent ? (
          <PropertyCardSkeleton />
        ) : (
          <Link
            to={`/properties/${property.id}`}
            aria-label={property.title}
            className="flex flex-col h-full group"
          >
            <PropertyCardMedia
              thumbnail_url={property.thumbnail_url}
              title={property.title}
              energy_rating={property.energy_rating}
              photos_count={property.photos_count}
              isPriority={isPriority}
            />
            <div className="flex flex-col gap-1.5 py-3 flex-1">
              <PropertyCardPrice property={property} />
              <PropertyCardMeta property={property} />
            </div>
          </Link>
        )}
      </div>
    );
  },
);
PropertyCard.displayName = "PropertyCard";
export { PropertyCard };
