import PropertyDetail from "@/features/properties/components/property-detail/PropertyDetail";
import PropertyDetailSkeleton from "@/features/properties/components/skeletons/PropertyDetailSkeleton";
import { Suspense } from "react";

const PropertyDetailPage = () => {
  return (
    <>
      <title>Détail de la propriété | RealEstate</title>
      <meta
        name="description"
        content="Découvrez tous les détails de cette propriété : photos, caractéristiques, prix et localisation."
      />

      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetail />
      </Suspense>
    </>
  );
};

PropertyDetailPage.displayName = "PropertyDetailPage";
export default PropertyDetailPage;
