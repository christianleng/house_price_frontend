import type { RouteObject } from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout";

import HomePage from "@/pages/public/Home.page";
import PropertiesPage from "@/pages/public/Properties.page";
import PropertyDetailPage from "@/pages/public/PropertyDetail.page";
import NotFoundPage from "@/pages/errors/NotFound.page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
