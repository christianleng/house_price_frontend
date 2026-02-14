import { PropertiesSplitLayout } from "@/features/properties/components/layout/PropertiesSplitLayout";
import PropertyMap from "@/features/properties/components/map/PropertyMap";
import PropertiesList from "@/features/properties/components/PropertiesList";
import PropertiesPageSkeleton from "@/features/properties/components/skeletons/PropertiesPageSkeleton";
import { Suspense } from "react";

const PropertiesPage = () => {
  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <PropertiesSplitLayout mapComponent={<PropertyMap />}>
        <PropertiesList />
      </PropertiesSplitLayout>
    </Suspense>
  );
};

PropertiesPage.displayName = "PropertiesPage";
export default PropertiesPage;
