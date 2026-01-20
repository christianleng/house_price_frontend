import FavoriteButton from "@/features/favorite/components/FavoriteButton";

const PropertyCardPrice = ({
  price,
  price_per_sqm,
  propertyId,
}: {
  price: number | null;
  price_per_sqm: number | null;
  propertyId: string;
}) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        <span className="text-lg font-bold text-blue-600 truncate">
          {price?.toLocaleString()} €
        </span>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {price_per_sqm}/m²
        </span>
      </div>
      <FavoriteButton propertyId={propertyId} />
    </div>
  );
};

PropertyCardPrice.displayName = "PropertyCardPrice";
export { PropertyCardPrice };
