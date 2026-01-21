import type { PropertySummary } from "../../types/property.types";

const PropertyCardMeta = ({ property }: { property: PropertySummary }) => {
  const title =
    property.transaction_type === "sale"
      ? "Appartement à vendre"
      : "Appartement à louer";

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-semibold line-clamp-1 h-5">{title}</h3>

      <p className="text-sm text-gray-700 line-clamp-1 h-5">
        {property.rooms} pièce{property.rooms > 1 && "s"} •{" "}
        {property.surface_area} m²
        {property.bedrooms > 0 && (
          <>
            {" "}
            • {property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""}
          </>
        )}
      </p>
      <p className="text-xs text-gray-600 line-clamp-1 h-4">
        {property.city} ({property.postal_code})
      </p>
    </div>
  );
};

PropertyCardMeta.displayName = "PropertyCardMeta";
export { PropertyCardMeta };
