import {
  useQuery,
  useSuspenseQuery,
  type UseQueryResult,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { propertiesService } from "./properties.service";
import type {
  PropertySearchParams,
  TransactionType,
  Property,
  CitiesPropertiesResponse,
  PropertyPreview,
} from "../types/property.types";
import type { PaginatedResponse } from "@/core/types";

export const PROPERTY_CACHE = {
  LIST: {
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  },
  DETAIL: {
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  },
  COUNT: {
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  },
  CITIES: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
} as const;

export const propertiesKeys = {
  all: ["properties"] as const,

  lists: () => [...propertiesKeys.all, "list"] as const,
  list: (filters?: PropertySearchParams) =>
    [...propertiesKeys.lists(), filters] as const,

  counts: () => [...propertiesKeys.all, "count"] as const,
  count: (filters?: PropertySearchParams) =>
    [...propertiesKeys.counts(), filters] as const,

  details: () => [...propertiesKeys.all, "detail"] as const,
  detail: (id: string) => [...propertiesKeys.details(), id] as const,

  cities: () => [...propertiesKeys.all, "cities"] as const,
  citiesList: (
    cities: string[],
    transactionType: TransactionType,
    pageSize: number,
  ) =>
    [
      ...propertiesKeys.cities(),
      { cities, transactionType, pageSize },
    ] as const,
};

export function useProperties(
  filters?: PropertySearchParams,
): UseSuspenseQueryResult<PaginatedResponse<PropertyPreview>, Error> {
  return useSuspenseQuery({
    queryKey: propertiesKeys.list(filters),
    queryFn: ({ signal }) => propertiesService.getProperties(filters, signal),
    ...PROPERTY_CACHE.LIST,
  });
}

export function useProperty(
  id: string,
): UseSuspenseQueryResult<Property, Error> {
  return useSuspenseQuery({
    queryKey: propertiesKeys.detail(id),
    queryFn: ({ signal }) => propertiesService.getPropertyById(id, signal),
    ...PROPERTY_CACHE.DETAIL,
  });
}

export function useCountProperties(
  filters?: PropertySearchParams,
  options?: { enabled?: boolean },
): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: propertiesKeys.count(filters),
    queryFn: ({ signal }) =>
      propertiesService.getCountProperties(filters, signal),
    ...PROPERTY_CACHE.COUNT,
    enabled: options?.enabled ?? true,
  });
}

export function useCitiesProperties(
  cities: string[],
  transactionType: TransactionType,
  pageSize: number = 10,
): UseSuspenseQueryResult<CitiesPropertiesResponse, Error> {
  return useSuspenseQuery({
    queryKey: propertiesKeys.citiesList(cities, transactionType, pageSize),
    queryFn: () =>
      propertiesService.getPropertiesByCities(
        cities,
        transactionType,
        pageSize,
      ),
    ...PROPERTY_CACHE.CITIES,
  });
}
