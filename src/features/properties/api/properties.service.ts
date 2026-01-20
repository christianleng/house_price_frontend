import { apiClient } from "@/core/api/api-client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import type {
  PropertyFilters,
  PaginatedProperties,
  Property,
  TransactionType,
  CitiesPropertiesResponse,
} from "../types/property.types";

class PropertiesService {
  async getProperties(filters?: PropertyFilters): Promise<PaginatedProperties> {
    return apiClient.get<PaginatedProperties>(API_ENDPOINTS.PROPERTIES.LIST, {
      params: filters,
    });
  }

  async getPropertyById(id: string): Promise<Property> {
    return apiClient.get<Property>(API_ENDPOINTS.PROPERTIES.DETAIL(id));
  }

  async getCountProperties(filters?: PropertyFilters): Promise<number> {
    return apiClient.get<number>(API_ENDPOINTS.PROPERTIES.COUNT, {
      params: filters,
    });
  }

  async getPropertiesByCities(
    cities: string[],
    transactionType: TransactionType,
    pageSize: number = 10,
  ): Promise<CitiesPropertiesResponse> {
    return apiClient.get<CitiesPropertiesResponse>(
      API_ENDPOINTS.PROPERTIES.BY_CITIES,
      {
        params: {
          transaction_type: transactionType,
          page_size: pageSize,
          sort_by: "created_at",
          sort_order: "desc",
          cities,
        },
      },
    );
  }
}

export const propertiesService = new PropertiesService();
