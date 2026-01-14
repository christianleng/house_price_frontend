import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RootLayout } from "@/app/layouts/RootLayout";
import { PageLoader } from "./PageLoader";

const HomePage = lazy(() => import("@/pages/public/Home.page"));
const PropertiesPage = lazy(() => import("@/pages/public/Properties.page"));
const PropertyDetailPage = lazy(
  () => import("@/pages/public/PropertyDetail.page")
);
const NotFoundPage = lazy(() => import("@/pages/errors/NotFound.page"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "properties",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PropertiesPage />
          </Suspense>
        ),
      },
      {
        path: "properties/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PropertyDetailPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
];
