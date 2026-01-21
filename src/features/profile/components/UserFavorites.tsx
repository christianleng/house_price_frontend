import { useGetFavorites } from "@/features/favorite/api/favorites.queries";
import type { PropertyPreview } from "@/features/properties/types/property.types";
import { memo } from "react";
import { Link } from "react-router-dom";

export const UserFavorites = memo(() => {
  const { data: favorites } = useGetFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed p-10 text-center">
        <p className="text-muted-foreground">
          Vous n'avez pas encore de favoris.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold px-1">
        Mes propriétés favorites ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((property: PropertyPreview) => {
          const isSale = property.transaction_type === "sale";

          const displayPrice = isSale
            ? property.price
            : property.rent_price_monthly;

          return (
            <Link key={property.id} to={`/properties/${property.id}`}>
              <div className="border rounded-lg p-2">
                <p className="font-medium">{property.title}</p>
                <p className="text-sm text-blue-600">
                  {displayPrice?.toLocaleString()} €
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});

UserFavorites.displayName = "UserFavorites";
