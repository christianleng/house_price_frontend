import { propertiesKeys } from "@/features/properties/api/properties.queries";
import { propertiesService } from "@/features/properties/api/properties.service";
import { RootLayout } from "@/app/layouts/RootLayout";
import { FEATURED_CITIES } from "@/core/config/cities.config";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { favoriteKeys } from "@/features/favorite/api/favorites.queries";
import { favoritesService } from "@/features/favorite/api/favorites.service";
import { tokenStorage } from "@/features/auth/api/token.storage";
import RootErrorBoundary from "@/core/components/RootErrorBoundary";
import { queryClient } from "../providers/query-client";
import { parsePropertySearchParams } from "@/features/properties/lib/params";
import { propertyFiltersStore } from "@/features/properties/store/property-filters-store";
import type { LoaderFunctionArgs } from "react-router";

const SALE_FILTERS = {
  transaction_type: "sale",
  page: 1,
  page_size: 10,
  sort_by: "created_at",
  sort_order: "desc",
} as const;

const RENT_FILTERS = {
  transaction_type: "rent",
  page: 1,
  page_size: 10,
  sort_by: "created_at",
  sort_order: "desc",
} as const;

const CITY_PAGE_SIZE = 10;

export const routes = [
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: null, //TODO add fallback
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/public/Home.page");
          return { Component: module.default };
        },
        loader: async () => {
          const isAuthenticated = tokenStorage.isAuthenticated();

          await Promise.all([
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(SALE_FILTERS),
              queryFn: () => propertiesService.getProperties(SALE_FILTERS),
              staleTime: 60 * 1000,
            }),
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(RENT_FILTERS),
              queryFn: () => propertiesService.getProperties(RENT_FILTERS),
              staleTime: 60 * 1000,
            }),
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.citiesList(
                FEATURED_CITIES as unknown as string[],
                "sale",
                CITY_PAGE_SIZE,
              ),
              queryFn: () =>
                propertiesService.getPropertiesByCities(
                  FEATURED_CITIES as unknown as string[],
                  "sale",
                  CITY_PAGE_SIZE,
                ),
              staleTime: 60 * 1000,
            }),

            ...(isAuthenticated
              ? [
                  queryClient.prefetchQuery({
                    queryKey: favoriteKeys.lists(),
                    queryFn: () => favoritesService.getFavoriteProperties(),
                    staleTime: 5 * 60 * 1000,
                  }),
                ]
              : []),
          ]);

          return null;
        },
      },
      {
        path: "properties",
        lazy: async () => {
          const module = await import("@/pages/public/Properties.page");
          return { Component: module.default };
        },
        loader: async ({ request }: LoaderFunctionArgs) => {
          const filters = parsePropertySearchParams(request.url);

          propertyFiltersStore.setFilters(filters);

          const isAuthenticated = tokenStorage.isAuthenticated();

          await Promise.all([
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(filters),
              queryFn: () => propertiesService.getProperties(filters),
              staleTime: 5 * 60 * 1000,
            }),
            ...(isAuthenticated
              ? [
                  queryClient.prefetchQuery({
                    queryKey: favoriteKeys.lists(),
                    queryFn: () => favoritesService.getFavoriteProperties(),
                    staleTime: 5 * 60 * 1000,
                  }),
                ]
              : []),
          ]);

          return null;
        },
      },
      {
        path: "properties/:id",
        lazy: async () => {
          const module = await import("@/pages/public/PropertyDetail.page");
          return { Component: module.default };
        },
        loader: async ({ params }: LoaderFunctionArgs) => {
          const { id } = params;

          if (!id) return null;

          await queryClient.prefetchQuery({
            queryKey: propertiesKeys.detail(id),
            queryFn: () => propertiesService.getPropertyById(id), //
            staleTime: 10 * 60 * 1000,
          });

          return null;
        },
      },
      {
        path: "profile",
        lazy: async () => {
          const module = await import("@/pages/profile/Profile.page");
          return {
            Component: () => (
              <RequireAuth>
                <module.default />
              </RequireAuth>
            ),
          };
        },
        loader: async () => {
          if (!tokenStorage.isAuthenticated()) return null;
          await queryClient.prefetchQuery({
            queryKey: favoriteKeys.lists(),
            queryFn: () => favoritesService.getFavoriteProperties(),
            staleTime: 5 * 60 * 1000,
          });
          return null;
        },
      },
      {
        path: "*",
        lazy: async () => {
          const module = await import("@/pages/errors/NotFound.page");
          return { Component: module.default };
        },
      },
    ],
  },
  {
    path: "auth/login",
    lazy: async () => {
      const module = await import("@/pages/auth/Login.page");
      return { Component: module.default };
    },
  },
];
