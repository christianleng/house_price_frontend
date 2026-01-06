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
}

export const propertiesService = new PropertiesService();
