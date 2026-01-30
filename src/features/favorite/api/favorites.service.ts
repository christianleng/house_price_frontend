import { apiClient } from "@/core/api/api-client";
import type { Favorite, FavoriteList } from "../types/favorite.types";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import type { PropertyId } from "@/features/properties/types/property.types";

export const favoritesService = {
  async getFavoriteProperties(signal?: AbortSignal): Promise<FavoriteList> {
    const response = await apiClient.get<FavoriteList>(
      API_ENDPOINTS.FAVORITE.LIST,
      { signal },
    );

    return response;
  },

  async addFavoriteProperty(propertyId: PropertyId): Promise<Favorite> {
    const response = await apiClient.post<Favorite>(
      API_ENDPOINTS.FAVORITE.POST(propertyId),
    );
    return response;
  },

  async deleteFavoriteProperty(propertyId: PropertyId): Promise<void> {
    const response = await apiClient.delete<void>(
      API_ENDPOINTS.FAVORITE.DELETE(propertyId),
    );
    return response;
  },
};
