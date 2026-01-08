import { apiClient } from "@/core/api/api-client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import type {
  Property,
  PropertyFilters,
  PaginatedProperties,
} from "@/core/types";

class PropertiesService {
  async getProperties(filters?: PropertyFilters): Promise<PaginatedProperties> {
    return apiClient.get<PaginatedProperties>(API_ENDPOINTS.PROPERTIES.LIST, {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  }

  async getPropertyById(id: string): Promise<Property> {
    return apiClient.get<Property>(API_ENDPOINTS.PROPERTIES.DETAIL(id));
  }

  async getCountProperties(filters?: PropertyFilters): Promise<number> {
    return apiClient.get<number>(API_ENDPOINTS.PROPERTIES.COUNT, {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  }
}

export const propertiesService = new PropertiesService();
