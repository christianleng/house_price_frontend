import PropertyDetail from "@/features/properties/components/property-detail/PropertyDetail";
import PropertyDetailSkeleton from "@/features/properties/components/skeletons/PropertyDetailSkeleton";
import { Suspense } from "react";

const PropertyDetailPage = () => {
  return (
    <Suspense fallback={<PropertyDetailSkeleton />}>
      <PropertyDetail />
    </Suspense>
  );
};

PropertyDetailPage.displayName = "PropertyDetailPage";
export default PropertyDetailPage;
