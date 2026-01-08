import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { propertiesService } from "./properties.service";
import type {
  Property,
  PropertyFilters,
  PaginatedProperties,
} from "@/core/types";

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
};

export function useProperties(
  filters?: PropertyFilters
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
  filters?: PropertyFilters
): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: propertiesKeys.count(filters),
    queryFn: () => propertiesService.getCountProperties(filters),
    staleTime: 1 * 60 * 1000,
  });
}
