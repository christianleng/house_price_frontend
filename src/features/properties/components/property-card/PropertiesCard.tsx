import { Link } from "react-router-dom";
import { PropertyCardMedia } from "./PropertyCardMedia";
import { PropertyCardPrice } from "./PropertyCardPrice";
import { PropertyCardMeta } from "./PropertyCardMeta";
import type { PropertySummary } from "@/core/types";

interface IPropertyCardProps {
  property: PropertySummary;
}

export const PropertyCard = ({ property }: IPropertyCardProps) => {
  return (
    <Link
      to={`/properties/${property.id}`}
      aria-label={property.title}
      className="flex flex-col h-full group"
    >
      <PropertyCardMedia property={property} />
      <div className="flex flex-col gap-1.5 py-3 flex-1">
        <PropertyCardPrice property={property} />
        <PropertyCardMeta property={property} />
      </div>
    </Link>
  );
};
