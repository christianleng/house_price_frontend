import { queryClient } from "@/app/providers/QueryProvider";
import { propertiesKeys } from "@/features/properties/api/properties.queries";
import { propertiesService } from "@/features/properties/api/properties.service";
import HomePage from "@/pages/public/Home.page";
import { RootLayout } from "@/app/layouts/RootLayout";

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

export const routes = [
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: null, //TODO add fallback
    children: [
      {
        index: true,
        Component: HomePage,
        loader: async () => {
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
      },
      {
        path: "properties/:id",
        lazy: async () => {
          const module = await import("@/pages/public/PropertyDetail.page");
          return { Component: module.default };
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
];
