import { memo } from "react";
import { Link } from "react-router-dom";
import { PropertyCardMedia } from "./PropertyCardMedia";
import { PropertyCardPrice } from "./PropertyCardPrice";
import { PropertyCardMeta } from "./PropertyCardMeta";
import type { PropertyPreview } from "../../types/property.types";

interface IPropertyCardProps {
  property: PropertyPreview;
  isPriority?: boolean;
}

const PropertyCard = memo(
  ({ property, isPriority = false }: IPropertyCardProps) => {
    return (
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
    );
  },
);

PropertyCard.displayName = "PropertyCard";
export { PropertyCard };
