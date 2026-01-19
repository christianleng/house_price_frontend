import { observer } from "mobx-react-lite";
import { useProperty } from "../../api/properties.queries";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import PropertiesDetailsView from "@/features/properties/components/property-detail/PropertiesDetailsView";
import { useCallback } from "react";

const PropertyDetail = observer(
  ({ propertyId }: { propertyId: string | undefined }) => {
    const {
      data: property,
      isLoading,
      error,
      refetch,
    } = useProperty(propertyId!);

    const handleError = useCallback(
      (err: Error, retry: () => void) => (
        <ErrorDisplay error={err} onRetry={retry} />
      ),
      [],
    );

    return (
      <SmartLoader
        isLoading={isLoading}
        error={error}
        data={property}
        skeleton={null}
        emptyState={
          <p className="text-center py-10">
            Aucune propriété à vendre pour le moment.
          </p>
        }
        errorFallback={handleError}
        retryFn={refetch}
      >
        {(items) => <PropertiesDetailsView property={items} />}
      </SmartLoader>
    );
  },
);

export default PropertyDetail;
