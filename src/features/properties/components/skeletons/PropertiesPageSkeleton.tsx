import { PropertiesSplitLayout } from "../layout/PropertiesSplitLayout";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";

export const PropertiesPageSkeleton = () => {
  return (
    <PropertiesSplitLayout
      mapComponent={
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
      }
    >
      <div className="flex flex-col gap-6 py-8 animate-pulse">
        <div>
          <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-32 bg-gray-100 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PropertiesSplitLayout>
  );
};

PropertiesPageSkeleton.displayName = "PropertiesPageSkeleton";
export default PropertiesPageSkeleton;
