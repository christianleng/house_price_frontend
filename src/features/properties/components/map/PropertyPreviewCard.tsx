import { Link } from "react-router";
import { type PropertyPreview } from "../../types/property.types";
import { cn } from "@/core/lib/utils";
import { Cancel01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { propertiesSyncStore } from "../../store/properties-sync-store";
import { HugeiconsIcon } from "@hugeicons/react";

interface IPropertyPreviewCardProps {
  property: PropertyPreview;
  className?: string;
}

export const PropertyPreviewCard = ({
  property,
  className,
}: IPropertyPreviewCardProps) => {
  const formattedPrice =
    property.transaction_type === "sale"
      ? property.price.toLocaleString()
      : property.rent_price_monthly.toLocaleString();

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    propertiesSyncStore.setSelectedPropertyId(null);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "relative flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-2xl",
        className,
      )}
    >
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <button
          onClick={handleFavorite}
          className="flex items-center justify-center w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md transition-all active:scale-90"
        >
          <HugeiconsIcon icon={FavouriteIcon} />
        </button>

        <button
          onClick={handleClose}
          className="flex items-center justify-center w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md transition-all active:scale-90"
        >
          <HugeiconsIcon icon={Cancel01Icon} />
        </button>
      </div>

      <Link
        to={`/properties/${property.id}`}
        className="flex flex-col w-full group outline-none"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
          <img
            src={property.thumbnail_url || "/placeholder-property.jpg"}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-0.5 p-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-[15px] text-gray-900 truncate">
              {property.property_type} · {property.city}
            </h3>
          </div>

          <p className="text-gray-500 text-[15px] truncate">{property.title}</p>

          <p className="text-gray-500 text-[14px]">6–8 mars</p>

          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="font-bold text-[16px] text-gray-900">
              {formattedPrice}&nbsp;€
            </span>
            <span className="text-gray-900 text-[15px]">
              {property.transaction_type === "sale" ? "au total" : "par mois"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

PropertyPreviewCard.displayName = "PropertyPreviewCard";
export default PropertyPreviewCard;
