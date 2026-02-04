import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { propertiesSyncStore } from "../../store/properties-sync-store";
import { observer } from "mobx-react-lite";
import { MapPriceTag } from "./MapPriceTag";

const PropertyMap = observer(() => {
  const { currentProperties, hoveredPropertyId } = propertiesSyncStore;
  const PARIS_CENTER = { lat: 48.8566, lng: 2.3522 };

  return (
    <div className="flex h-full w-full items-center justify-center border rounded-2xl overflow-hidden shadow-lg">
      <Map
        mapId="bf51a910020fa25a"
        defaultZoom={12}
        defaultCenter={PARIS_CENTER}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        {currentProperties.map((property) => (
          <AdvancedMarker
            key={property.id}
            position={{ lat: property.latitude, lng: property.longitude }}
            className={hoveredPropertyId === property.id ? "z-50" : "z-10"}
          >
            <MapPriceTag property={property} />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
});

PropertyMap.displayName = "PropertyMap";
export default PropertyMap;
