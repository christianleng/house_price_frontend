import { observer } from "mobx-react-lite";
import { useProperty } from "../../api/properties.queries";
import PropertiesDetailsView from "@/features/properties/components/property-detail/PropertiesDetailsView";
import { useParams } from "react-router";

const PropertyDetail = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { data: property } = useProperty(id!);

  return <PropertiesDetailsView property={property} />;
});

PropertyDetail.displayName = "PropertyDetail";
export default PropertyDetail;
