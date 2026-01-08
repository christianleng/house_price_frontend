import { observer } from "mobx-react-lite";
import { useProperties } from "@/features/properties/api/properties.queries";
import type { PropertyFilters } from "@/core/types";

const HomePage = observer(() => {
  const initialFilters: PropertyFilters = {
    transaction_type: "sale",
    page: 1,
    page_size: 10,
    sort_by: "created_at",
    sort_order: "desc",
  };

  const { data, isLoading, error } = useProperties(initialFilters);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Dernières propriétés à vendre</h1>
      {data && data.items.length > 0 ? (
        <>
          {data.items.map((item) => {
            return <div key={item.id}>{item.city}</div>;
          })}
        </>
      ) : (
        <p>Aucune propriété à vendre pour le moment.</p>
      )}
    </div>
  );
});

export default HomePage;
