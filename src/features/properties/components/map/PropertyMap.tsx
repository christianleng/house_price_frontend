import { Map } from "@vis.gl/react-google-maps";

const PropertyMap = () => {
  const PARIS_CENTER = { lat: 48.8566, lng: 2.3522 };
  return (
    <div className="flex h-full w-full items-center justify-center border rounded-2xl overflow-hidden shadow-lg">
      <Map
        mapId="bf51a910020fa25a"
        defaultZoom={12}
        defaultCenter={PARIS_CENTER}
        gestureHandling={"greedy"}
        disableDefaultUI
      ></Map>
    </div>
  );
};

PropertyMap.displayName = "PropertyMap";
export default PropertyMap;
