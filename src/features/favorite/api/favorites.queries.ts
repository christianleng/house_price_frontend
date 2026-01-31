import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "./favorites.service";
import type { FavoriteList } from "../types/favorite.types";
import { tokenStorage } from "@/features/auth/api/token.storage";
import type {
  PropertyPreview,
  PropertyId,
} from "@/features/properties/types/property.types";

export const FAVORITE_CACHE = {
  LIST: {
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  },
} as const;

export const favoriteKeys = {
  all: ["favorites"] as const,
  lists: () => [...favoriteKeys.all, "list"] as const,
};

export const useGetFavorites = (options = {}) => {
  return useQuery({
    queryKey: favoriteKeys.lists(),
    queryFn: ({ signal }) => favoritesService.getFavoriteProperties(signal),
    ...FAVORITE_CACHE.LIST,
    enabled: tokenStorage.isAuthenticated(),
    ...options,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: PropertyId) =>
      favoritesService.addFavoriteProperty(propertyId),
    onMutate: async (propertyId: PropertyId) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.lists() });
      const previousFavorites = queryClient.getQueryData<FavoriteList>(
        favoriteKeys.lists(),
      );

      if (previousFavorites) {
        queryClient.setQueryData<FavoriteList>(favoriteKeys.lists(), [
          ...previousFavorites,
          { id: propertyId } as PropertyPreview,
        ]);
      }

      return { previousFavorites };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.lists() });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: PropertyId) =>
      favoritesService.deleteFavoriteProperty(propertyId),
    onMutate: async (propertyId: PropertyId) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.lists() });
      const previousFavorites = queryClient.getQueryData<FavoriteList>(
        favoriteKeys.lists(),
      );

      if (previousFavorites) {
        queryClient.setQueryData<FavoriteList>(
          favoriteKeys.lists(),
          previousFavorites.filter((p) => p.id !== propertyId),
        );
      }

      return { previousFavorites };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.lists() });
    },
  });
};
