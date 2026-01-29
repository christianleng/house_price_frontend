import { PropertiesSplitLayout } from "@/features/properties/components/layout/PropertiesSplitLayout";
import PropertyMap from "@/features/properties/components/map/PropertyMap";
import PropertiesList from "@/features/properties/components/PropertiesList";

const PropertiesPage = () => {
  return (
    <>
      <title>Propriétés à vendre et à louer</title>
      <meta
        name="description"
        content="Découvrez notre sélection de propriétés à vendre et à louer en France."
      />

      <PropertiesSplitLayout mapComponent={<PropertyMap />}>
        <PropertiesList />
      </PropertiesSplitLayout>
    </>
  );
};

PropertiesPage.displayName = "PropertiesPage";
export default PropertiesPage;
