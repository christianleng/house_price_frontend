import FavoriteButton from "@/features/favorite/components/FavoriteButton";
import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "../../types/property.types";

const PropertyCardPrice = ({
  price,
  price_per_sqm,
  propertyId,
  transaction_type,
  rent_price_monthly,
}: {
  price: number | null;
  price_per_sqm: number | null;
  propertyId: string;
  transaction_type: TransactionType;
  rent_price_monthly: number;
}) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        <span className="text-lg font-bold text-blue-600 truncate">
          {transaction_type === TRANSACTION_TYPE.SALE
            ? `${price?.toLocaleString()} €`
            : `${rent_price_monthly} €`}
        </span>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {transaction_type === TRANSACTION_TYPE.RENT
            ? `/mois`
            : `${price_per_sqm}/m²`}
        </span>
      </div>
      <FavoriteButton propertyId={propertyId} />
    </div>
  );
};

PropertyCardPrice.displayName = "PropertyCardPrice";
export { PropertyCardPrice };
