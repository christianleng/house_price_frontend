import { useParams, Navigate } from "react-router-dom";
import PropertyDetail from "@/features/properties/components/PropertyDetail";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Navigate to="/properties" replace />;

  return (
    <>
      <title>Détail de la propriété | RealEstate</title>
      <meta
        name="description"
        content="Découvrez tous les détails de cette propriété : photos, caractéristiques, prix et localisation."
      />

      <PropertyDetail propertyId={id!} />
    </>
  );
}
