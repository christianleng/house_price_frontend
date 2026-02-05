import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { propertiesSyncStore } from "../../store/properties-sync-store";
import { observer } from "mobx-react-lite";
import { MapPriceTag } from "./MapPriceTag";
import { PropertyPreviewCard } from "./PropertyPreviewCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/ui/map-marker-modal";

const PropertyMap = observer(() => {
  const { currentProperties } = propertiesSyncStore;
  const PARIS_CENTER = { lat: 48.8566, lng: 2.3522 };

  return (
    <div className="flex h-full w-full items-center justify-center border rounded-2xl overflow-hidden shadow-lg">
      <Map
        mapId="bf51a910020fa25a"
        clickableIcons={false}
        defaultZoom={12}
        defaultCenter={PARIS_CENTER}
        gestureHandling={"greedy"}
        disableDefaultUI
        mapTypeId="terrain"
      >
        {currentProperties.map((property) => {
          const isHovered =
            propertiesSyncStore.hoveredPropertyId === property.id;
          const isSelected =
            propertiesSyncStore.selectedPropertyId === property.id;
          const isPriority = isHovered || isSelected;

          return (
            <AdvancedMarker
              key={property.id}
              position={{ lat: property.latitude, lng: property.longitude }}
              zIndex={isPriority ? 1000 : 1}
            >
              <Popover
                open={propertiesSyncStore.selectedPropertyId === property.id}
                onOpenChange={(open) =>
                  propertiesSyncStore.setSelectedPropertyId(
                    open ? property.id : null,
                  )
                }
              >
                <PopoverTrigger>
                  <div className="cursor-pointer">
                    <MapPriceTag property={property} />
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  side="top"
                  align="center"
                  sideOffset={8}
                  className="w-fit p-0 border-none bg-transparent shadow-none"
                >
                  <PropertyPreviewCard property={property} />
                </PopoverContent>
              </Popover>
            </AdvancedMarker>
          );
        })}
      </Map>
    </div>
  );
});

PropertyMap.displayName = "PropertyMap";
export default PropertyMap;
