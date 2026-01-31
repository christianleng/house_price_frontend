import PropertyDetail from "@/features/properties/components/property-detail/PropertyDetail";

const PropertyDetailPage = () => {
  return (
    <>
      <title>Détail de la propriété | RealEstate</title>
      <meta
        name="description"
        content="Découvrez tous les détails de cette propriété : photos, caractéristiques, prix et localisation."
      />

      <PropertyDetail />
    </>
  );
};

PropertyDetailPage.displayName = "PropertyDetailPage";
export default PropertyDetailPage;
