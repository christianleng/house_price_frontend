import {
  SORT_BY,
  SORT_ORDER,
  type PropertySearchParams,
  type TransactionType,
  type sort_by,
  type sort_order,
} from "../types/property.types";

export const parsePropertySearchParams = (
  url: string,
): PropertySearchParams => {
  const { searchParams } = new URL(url);

  const rawSortBy = searchParams.get("sort_by");
  const sort_by = Object.values(SORT_BY).includes(rawSortBy as sort_by)
    ? (rawSortBy as sort_by)
    : SORT_BY.CREATED_AT;

  const rawSortOrder = searchParams.get("sort_order");
  const sort_order = Object.values(SORT_ORDER).includes(
    rawSortOrder as sort_order,
  )
    ? (rawSortOrder as sort_order)
    : SORT_ORDER.DESC;

  return {
    transaction_type:
      (searchParams.get("transaction_type") as TransactionType) || "sale",
    city: searchParams.get("city") || undefined,
    page: Math.max(1, parseInt(searchParams.get("page") || "1", 10)),
    page_size: Math.max(1, parseInt(searchParams.get("page_size") || "20", 10)),
    sort_by,
    sort_order,
  };
};
