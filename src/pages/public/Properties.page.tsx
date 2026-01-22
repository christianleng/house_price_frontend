import { PropertiesSplitLayout } from "@/features/properties/components/layout/PropertiesSplitLayout";
import { PropertyMap } from "@/features/properties/components/map/PropertyMap";
import PropertiesList from "@/features/properties/components/PropertiesList";

const PropertiesPage = () => {
  return (
    <>
      <title>Propriétés à vendre et à louer</title>
      <meta
        name="description"
        content="Découvrez notre sélection de propriétés à vendre et à louer en France."
      />

      <div className="container max-w-4/5 mx-auto px-4">
        <PropertiesSplitLayout mapComponent={<PropertyMap />}>
          <PropertiesList />
        </PropertiesSplitLayout>
      </div>
    </>
  );
};

PropertiesPage.displayName = "PropertiesPage";
export default PropertiesPage;
