import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { propertiesService } from "./properties.service";
import type {
  PropertyFilters,
  TransactionType,
  PaginatedProperties,
  Property,
  CitiesPropertiesResponse,
} from "../types/property.types";

export const propertiesKeys = {
  all: ["properties"] as const,

  lists: () => [...propertiesKeys.all, "list"] as const,
  list: (filters?: PropertyFilters) =>
    [...propertiesKeys.lists(), filters] as const,

  counts: () => [...propertiesKeys.all, "count"] as const,
  count: (filters?: PropertyFilters) =>
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
  filters?: PropertyFilters,
): UseQueryResult<PaginatedProperties, Error> {
  return useQuery({
    queryKey: propertiesKeys.list(filters),
    queryFn: () => propertiesService.getProperties(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProperty(id: string): UseQueryResult<Property, Error> {
  return useQuery({
    queryKey: propertiesKeys.detail(id),
    queryFn: () => propertiesService.getPropertyById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

export function useCountProperties(
  filters?: PropertyFilters,
  options?: { enabled?: boolean },
): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: propertiesKeys.count(filters),
    queryFn: () => propertiesService.getCountProperties(filters),
    staleTime: 1 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

export function useCitiesProperties(
  cities: string[],
  transactionType: TransactionType,
  pageSize: number = 10,
): UseQueryResult<CitiesPropertiesResponse, Error> {
  return useQuery({
    queryKey: propertiesKeys.citiesList(cities, transactionType, pageSize),
    queryFn: () =>
      propertiesService.getPropertiesByCities(
        cities,
        transactionType,
        pageSize,
      ),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: cities.length > 0,
  });
}
