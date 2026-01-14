import PropertiesList from "@/features/properties/components/PropertiesList";

const PropertiesPage = () => {
  return (
    <>
      <title>Propriétés à vendre et à louer</title>
      <meta
        name="description"
        content="Découvrez notre sélection de propriétés à vendre et à louer en France."
      />

      <div className="container max-w-4/5 mx-auto px-4 py-8">
        <PropertiesList />
      </div>
    </>
  );
};

export default PropertiesPage;
