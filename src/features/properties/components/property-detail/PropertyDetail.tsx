import { observer } from "mobx-react-lite";
import { useProperty } from "../../api/properties.queries";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { PropertiesSkeleton } from "../PropertiesSkeleton";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import PropertiesDetailsView from "@/features/properties/components/property-detail/PropertiesDetailsView";

const PropertyDetail = observer(
  ({ propertyId }: { propertyId: string | undefined }) => {
    const {
      data: property,
      isLoading,
      error,
      refetch,
    } = useProperty(propertyId!);

    return (
      <div className="container mx-auto px-4 py-8">
        <SmartLoader
          isLoading={isLoading}
          error={error}
          data={property}
          skeleton={<PropertiesSkeleton />}
          emptyState={
            <p className="text-center py-10">
              Aucune propriété à vendre pour le moment.
            </p>
          }
          errorFallback={(err, retry) => (
            <ErrorDisplay error={err} onRetry={retry} />
          )}
          retryFn={refetch}
        >
          {(items) => <PropertiesDetailsView property={items} />}
        </SmartLoader>
      </div>
    );
  }
);

export default PropertyDetail;
