import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "./favorites.service";
import type { FavoriteList } from "../types/favorite.types";
import type { PropertySummary } from "@/core/types";
import { tokenStorage } from "@/core/auth/token.storage";

export const favoriteKeys = {
  all: ["favorites"] as const,
  lists: () => [...favoriteKeys.all, "list"] as const,
};

export const useGetFavorites = (options = {}) => {
  return useQuery({
    queryKey: favoriteKeys.lists(),
    queryFn: () => favoritesService.getFavoriteProperties(),
    staleTime: 5 * 60 * 1000,
    enabled: tokenStorage.isAuthenticated(),
    ...options,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) =>
      favoritesService.addFavoriteProperty(propertyId),
    onMutate: async (propertyId) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.lists() });
      const previousFavorites = queryClient.getQueryData<FavoriteList>(
        favoriteKeys.lists(),
      );

      if (previousFavorites) {
        queryClient.setQueryData<FavoriteList>(favoriteKeys.lists(), [
          ...previousFavorites,
          { id: propertyId } as PropertySummary,
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
    mutationFn: (propertyId: string) =>
      favoritesService.deleteFavoriteProperty(propertyId),
    onMutate: async (propertyId) => {
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
