import { observer } from "mobx-react-lite";
import { propertiesSyncStore } from "../../store/properties-sync-store";
import type { PropertyPreview } from "../../types/property.types";

interface IMapPriceTagProps {
  property: PropertyPreview;
}

export const MapPriceTag = observer(({ property }: IMapPriceTagProps) => {
  const isHovered = propertiesSyncStore.hoveredPropertyId === property.id;

  const formatPrice = (p: number) => {
    if (p >= 1000) return `${(p / 1000).toFixed(0)}\u00A0k`;
    return p.toLocaleString();
  };

  const price =
    property.transaction_type === "sale"
      ? formatPrice(property.price)
      : property.rent_price_monthly;

  return (
    <div
      className={`
        relative flex items-center justify-center 
        px-3 py-1 rounded-full font-bold text-[14px] 
        transition-all duration-200 ease-in-out cursor-pointer shadow-md border
        ${
          isHovered
            ? "bg-black text-white scale-110 z-50 border-black"
            : "bg-white text-gray-900 z-10 border-gray-200 hover:scale-105"
        }
      `}
    >
      <span className="whitespace-nowrap">
        {price}
        <span className="ml-1">€</span>
      </span>
    </div>
  );
});
