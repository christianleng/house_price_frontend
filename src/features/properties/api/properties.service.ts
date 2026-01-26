import { apiClient } from "@/core/api/api-client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import type {
  PropertySearchParams,
  Property,
  TransactionType,
  CitiesPropertiesResponse,
  PropertyPreview,
} from "../types/property.types";
import type { PaginatedResponse } from "@/core/types";

class PropertiesService {
  async getProperties(
    filters?: PropertySearchParams,
  ): Promise<PaginatedResponse<PropertyPreview>> {
    return apiClient.get<PaginatedResponse<PropertyPreview>>(
      API_ENDPOINTS.PROPERTIES.LIST,
      {
        params: filters,
      },
    );
  }

  async getPropertyById(id: string): Promise<Property> {
    return apiClient.get<Property>(API_ENDPOINTS.PROPERTIES.DETAIL(id));
  }

  async getCountProperties(filters?: PropertySearchParams): Promise<number> {
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
