import type { NavigationSection } from "../types/navigation.types";

export const HEADER_NAVIGATION: NavigationSection[] = [
  {
    id: "buy",
    trigger: "Acheter",
    gridCols: 3,
    columns: [
      {
        title: "Achat",
        links: [
          { label: "Appartement ou Maison", href: "/properties" },
          { label: "Immobilier neuf", href: "/" },
          { label: "Bien d’exception", href: "/" },
          { label: "Terrain", href: "/" },
          { label: "Viager", href: "/" },
          { label: "Bureaux & Commerces", href: "/" },
        ],
      },
      {
        title: "Prix de l'immobilier",
        links: [
          { label: "Estimation bien immobilier", href: "/" },
          { label: "Prix au m²", href: "/" },
        ],
      },
      {
        title: "Investir",
        links: [
          { label: "Services propriétaire", href: "/" },
          { label: "Checklist de l'acheteur", href: "/" },
          { label: "Défiscalisation", href: "/" },
          { label: "Choisir un agent", href: "/" },
          { label: "Investissement locatif", href: "/" },
        ],
      },
    ],
  },
  {
    id: "rent",
    trigger: "Louer",
    gridCols: 2,
    columns: [
      {
        title: "Location",
        links: [
          { label: "Appartement", href: "/" },
          { label: "Maison", href: "/" },
          { label: "Meublé", href: "/" },
          { label: "Colocation", href: "/" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Estimer un loyer", href: "/" },
          { label: "Dossier locataire", href: "/" },
          { label: "Gestion locative", href: "/" },
        ],
      },
    ],
  },
];
