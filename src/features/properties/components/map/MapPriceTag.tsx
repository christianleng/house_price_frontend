import { observer } from "mobx-react-lite";
import { propertiesSyncStore } from "../../store/properties-sync-store";
import type { PropertyPreview } from "../../types/property.types";

interface IMapPriceTagProps {
  property: PropertyPreview;
}

export const MapPriceTag = observer(({ property }: IMapPriceTagProps) => {
  const isHovered = propertiesSyncStore.hoveredPropertyId === property.id;
  const isSelected = propertiesSyncStore.selectedPropertyId === property.id;
  const isActive = isHovered || isSelected;

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
      onMouseEnter={() => propertiesSyncStore.setHoveredPropertyId(property.id)}
      onMouseLeave={() => propertiesSyncStore.setHoveredPropertyId(null)}
      className={`px-3 py-1 rounded-full font-bold text-sm cursor-pointer shadow-md border
        ${
          isActive
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

MapPriceTag.displayName = "MapPriceTag";
export default MapPriceTag;
