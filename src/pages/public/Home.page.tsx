import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import { PropertiesSkeleton } from "@/features/properties/components/PropertiesSkeleton";
import type { PropertyFilters } from "@/core/types";
import { SmartLoader } from "@/core/components/data-loading/SmartLoader";
import { ErrorDisplay } from "@/core/components/data-loading/ErrorDisplay";
import PropertiesList from "@/core/components/properties-list";
import { Link } from "react-router-dom";

const HomePage = observer(() => {
  const initialFiltersPropertiesSale: PropertyFilters = {
    transaction_type: "sale",
    page: 1,
    page_size: 10,
    sort_by: "created_at",
    sort_order: "desc",
  };

  const initialFiltersPropertiesRent: PropertyFilters = {
    transaction_type: "rent",
    page: 1,
    page_size: 10,
    sort_by: "created_at",
    sort_order: "desc",
  };

  const {
    data: dataSale,
    isLoading: isLoadingSale,
    error: errorSale,
    refetch: refetchSale,
  } = useProperties(initialFiltersPropertiesSale);
  const { data, isLoading, error, refetch } = useProperties(
    initialFiltersPropertiesRent
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Dernières propriétés à vendre</h1>
        <Link to="/properties">Voir plus</Link>
      </div>
      <SmartLoader
        isLoading={isLoadingSale}
        error={errorSale}
        data={dataSale?.items}
        skeleton={<PropertiesSkeleton />}
        emptyState={
          <p className="text-center py-10">
            Aucune propriété à vendre pour le moment.
          </p>
        }
        errorFallback={(err, retry) => (
          <ErrorDisplay error={err} onRetry={retry} />
        )}
        retryFn={refetchSale}
      >
        {(items) => <PropertiesList properties={items} />}
      </SmartLoader>

      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Dernières propriétés en location</h1>
        <Link to="/">Voir plus</Link>
      </div>
      <SmartLoader
        isLoading={isLoading}
        error={error}
        data={data?.items}
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
        {(items) => <PropertiesList properties={items} />}
      </SmartLoader>
    </div>
  );
});

export default HomePage;
