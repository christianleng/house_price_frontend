import {
  propertiesKeys,
  PROPERTY_CACHE,
} from "@/features/properties/api/properties.queries";
import { propertiesService } from "@/features/properties/api/properties.service";
import { RootLayout } from "@/app/layouts/RootLayout";
import { FEATURED_CITIES } from "@/core/config/cities.config";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import {
  FAVORITE_CACHE,
  favoriteKeys,
} from "@/features/favorite/api/favorites.queries";
import { favoritesService } from "@/features/favorite/api/favorites.service";
import { tokenStorage } from "@/features/auth/api/token.storage";
import RootErrorBoundary from "@/pages/errors/RootErrorBoundary";
import { queryClient } from "../providers/query-client";
import { parsePropertySearchParams } from "@/features/properties/lib/params";
import { propertyFiltersStore } from "@/features/properties/store/property-filters-store";
import { type LoaderFunctionArgs, data as apiData } from "react-router";
import { PropertyDetailSkeleton } from "@/features/properties/components/skeletons/PropertyDetailSkeleton";
import { PropertyErrorBoundary } from "@/pages/errors/PropertyErrorBoundary.page";
import { PropertiesPageSkeleton } from "@/features/properties/components/skeletons/PropertiesPageSkeleton";
import { PropertiesErrorBoundary } from "@/pages/errors/PropertiesErrorBoundary";

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
    HydrateFallback: () => <div className="min-h-screen bg-white" />,
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

          Promise.allSettled([
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(SALE_FILTERS),
              queryFn: () => propertiesService.getProperties(SALE_FILTERS),
              ...PROPERTY_CACHE.LIST,
            }),
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(RENT_FILTERS),
              queryFn: () => propertiesService.getProperties(RENT_FILTERS),
              ...PROPERTY_CACHE.LIST,
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
              ...PROPERTY_CACHE.LIST,
            }),

            ...(isAuthenticated
              ? [
                  queryClient.prefetchQuery({
                    queryKey: favoriteKeys.lists(),
                    queryFn: () => favoritesService.getFavoriteProperties(),
                    ...PROPERTY_CACHE.LIST,
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
        HydrateFallback: PropertiesPageSkeleton,
        ErrorBoundary: PropertiesErrorBoundary,
        loader: async ({ request }: LoaderFunctionArgs) => {
          const filters = parsePropertySearchParams(request.url);

          propertyFiltersStore.setFilters(filters);

          const isAuthenticated = tokenStorage.isAuthenticated();

          await Promise.allSettled([
            queryClient.prefetchQuery({
              queryKey: propertiesKeys.list(filters),
              queryFn: () => propertiesService.getProperties(filters),
              ...PROPERTY_CACHE.LIST,
            }),
            ...(isAuthenticated
              ? [
                  queryClient.prefetchQuery({
                    queryKey: favoriteKeys.lists(),
                    queryFn: () => favoritesService.getFavoriteProperties(),
                    ...PROPERTY_CACHE.LIST,
                  }),
                ]
              : []),
          ]);

          return null;
        },
      },
      {
        path: "properties/:id",
        HydrateFallback: PropertyDetailSkeleton,
        ErrorBoundary: PropertyErrorBoundary,
        lazy: async () => {
          const module = await import("@/pages/public/PropertyDetail.page");
          return { Component: module.default };
        },
        loader: async ({ params }: LoaderFunctionArgs) => {
          const { id } = params;

          if (!id) {
            throw apiData(
              { message: "Identifiant de propriété manquant" },
              { status: 400 },
            );
          }

          await queryClient.ensureQueryData({
            queryKey: propertiesKeys.detail(id),
            queryFn: ({ signal }) =>
              propertiesService.getPropertyById(id, signal),
            ...PROPERTY_CACHE.DETAIL,
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
            ...FAVORITE_CACHE.LIST,
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
