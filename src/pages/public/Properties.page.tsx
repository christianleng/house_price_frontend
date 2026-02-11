import { PropertiesSplitLayout } from "@/features/properties/components/layout/PropertiesSplitLayout";
import PropertyMap from "@/features/properties/components/map/PropertyMap";
import PropertiesList from "@/features/properties/components/PropertiesList";
import PropertiesPageSkeleton from "@/features/properties/components/skeletons/PropertiesPageSkeleton";

import { Suspense } from "react";

const PropertiesPage = () => {
  return (
    <>
      <title>Propriétés à vendre et à louer</title>
      <meta
        name="description"
        content="Découvrez notre sélection de propriétés à vendre et à louer en France."
      />

      <PropertiesSplitLayout mapComponent={<PropertyMap />}>
        <Suspense fallback={<PropertiesPageSkeleton />}>
          <PropertiesList />
        </Suspense>
      </PropertiesSplitLayout>
    </>
  );
};

PropertiesPage.displayName = "PropertiesPage";
export default PropertiesPage;
